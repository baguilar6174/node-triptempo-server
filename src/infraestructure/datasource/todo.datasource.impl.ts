/* eslint-disable @typescript-eslint/no-throw-literal */
import { prisma } from '../../data/postgres';
import { type CreateTodoDto, TodoEntity, type UpdateTodoDto, type TodoDatasource } from '../../domain';

export class TodoDatasourceImpl implements TodoDatasource {
	async create(createDto: CreateTodoDto): Promise<TodoEntity> {
		const createdTodo = await prisma.todo.create({
			data: createDto
		});
		return TodoEntity.fromJson(createdTodo);
	}

	async getAll(): Promise<TodoEntity[]> {
		const todos = await prisma.todo.findMany();
		return todos.map((todo) => TodoEntity.fromJson(todo));
	}

	async getById(id: number): Promise<TodoEntity> {
		const todo = await prisma.todo.findFirst({
			where: { id }
		});
		if (!todo) throw `Todo with id ${id} not found`;
		return TodoEntity.fromJson(todo);
	}

	async update(updateDto: UpdateTodoDto): Promise<TodoEntity> {
		await this.getById(updateDto.id);
		const updatedTodo = await prisma.todo.update({
			where: { id: updateDto.id },
			data: updateDto.values
		});
		return TodoEntity.fromJson(updatedTodo);
	}

	async delete(id: number): Promise<TodoEntity> {
		await this.getById(id);
		const deletedTodo = await prisma.todo.delete({
			where: { id }
		});
		return TodoEntity.fromJson(deletedTodo);
	}
}
