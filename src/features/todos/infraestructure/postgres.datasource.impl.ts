import { AppError, ONE, ValidationError, ZERO } from '../../../core';
import { prisma } from '../../../data/postgres';
import { type PaginationResponseEntity, PaginationDto } from '../../shared';
import { TodoEntity, CreateTodoDto, type TodoDatasource, UpdateTodoDto, GetTodoByIdDto } from '../domain';

export class TodoDatasourceImpl implements TodoDatasource {
	public async getAll(pagination: PaginationDto): Promise<PaginationResponseEntity<TodoEntity[]>> {
		const errors = PaginationDto.validate(pagination);
		if (errors.length > ZERO) throw new ValidationError(errors);
		const { page, limit } = pagination;
		/* const total = await prisma.todo.count();
			const todos = await prisma.todo.findMany({
				skip: (page - 1) * limit,
				take: limit
			}); */
		const [total, todos] = await Promise.all([
			prisma.todo.count(),
			prisma.todo.findMany({
				skip: (page - ONE) * limit,
				take: limit
			})
		]);
		const totalPages = Math.ceil(total / limit);
		const nextPage = page < totalPages ? page + ONE : null;
		const prevPage = page > ONE ? page - ONE : null;

		return {
			results: todos.map((todo) => TodoEntity.fromJson(todo)),
			currentPage: page,
			nextPage,
			prevPage,
			total,
			totalPages
		};
	}

	public async getById(getByIdDto: GetTodoByIdDto): Promise<TodoEntity> {
		const errors = GetTodoByIdDto.validate(getByIdDto);
		if (errors.length > ZERO) throw new ValidationError(errors);
		const todo = await prisma.todo.findFirst({ where: { id: getByIdDto.id } });
		if (!todo) throw AppError.notFound(`Todo with id ${getByIdDto.id} not found`);
		return TodoEntity.fromJson(todo);
	}

	public async create(createDto: CreateTodoDto): Promise<TodoEntity> {
		const errors = CreateTodoDto.validate(createDto);
		if (errors.length > ZERO) throw new ValidationError(errors);
		const createdTodo = await prisma.todo.create({ data: createDto });
		return TodoEntity.fromJson(createdTodo);
	}

	public async update(updateDto: UpdateTodoDto): Promise<TodoEntity> {
		const errors = UpdateTodoDto.validate(updateDto);
		if (errors.length > ZERO) throw new ValidationError(errors);
		await this.getById(updateDto);
		const updatedTodo = await prisma.todo.update({
			where: { id: updateDto.id },
			data: updateDto.values
		});
		return TodoEntity.fromJson(updatedTodo);
	}

	public async delete(getByIdDto: GetTodoByIdDto): Promise<TodoEntity> {
		const errors = GetTodoByIdDto.validate(getByIdDto);
		if (errors.length > ZERO) throw new ValidationError(errors);
		await this.getById(getByIdDto);
		const deletedTodo = await prisma.todo.delete({ where: { id: getByIdDto.id } });
		return TodoEntity.fromJson(deletedTodo);
	}
}
