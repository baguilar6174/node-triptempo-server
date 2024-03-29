import { prisma } from '../../data/postgres';
import {
	type CreateTodoDto,
	TodoEntity,
	type UpdateTodoDto,
	type TodoDatasource,
	CustomError,
	type PaginationDto
} from '../../domain';

export class TodoDatasourceImpl implements TodoDatasource {
	public async create(createDto: CreateTodoDto): Promise<TodoEntity> {
		try {
			const createdTodo = await prisma.todo.create({
				data: createDto
			});
			return TodoEntity.fromJson(createdTodo);
		} catch (error) {
			throw CustomError.internalServer(error as string);
		}
	}

	public async getAll(pagination: PaginationDto): Promise<TodoEntity[]> {
		const { page, limit } = pagination;
		try {
			/* const total = await prisma.todo.count();
			const todos = await prisma.todo.findMany({
				skip: (page - 1) * limit,
				take: limit
			}); */
			const [total, todos] = await Promise.all([
				prisma.todo.count(),
				prisma.todo.findMany({
					skip: (page - 1) * limit,
					take: limit
				})
			]);
			const totalPages = Math.ceil(total / limit);
			const nextPage = page < totalPages ? page + 1 : null;
			const prevPage = page > 1 ? page - 1 : null;

			// * You can send this information
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
			const pagination = {
				total,
				totalPages,
				currentPage: page,
				nextPage,
				prevPage
			};

			return todos.map((todo) => TodoEntity.fromJson(todo));
		} catch (error) {
			throw CustomError.internalServer(error as string);
		}
	}

	public async getById(id: number): Promise<TodoEntity> {
		try {
			const todo = await prisma.todo.findFirst({
				where: { id }
			});
			if (!todo) throw CustomError.notFound(`Todo with id ${id} not found`);
			return TodoEntity.fromJson(todo);
		} catch (error) {
			throw CustomError.internalServer(error as string);
		}
	}

	public async update(updateDto: UpdateTodoDto): Promise<TodoEntity> {
		try {
			await this.getById(updateDto.id);
			const updatedTodo = await prisma.todo.update({
				where: { id: updateDto.id },
				data: updateDto.values
			});
			return TodoEntity.fromJson(updatedTodo);
		} catch (error) {
			throw CustomError.internalServer(error as string);
		}
	}

	public async delete(id: number): Promise<TodoEntity> {
		try {
			await this.getById(id);
			const deletedTodo = await prisma.todo.delete({
				where: { id }
			});
			return TodoEntity.fromJson(deletedTodo);
		} catch (error) {
			throw CustomError.internalServer(error as string);
		}
	}
}
