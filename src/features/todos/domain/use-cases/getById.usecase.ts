import { type TodoEntity } from '../entities';
import { type TodoRepository } from '../repositories';

export interface GetTodoByIdUseCase {
	execute: (id: number) => Promise<TodoEntity>;
}

export class GetTodoById implements GetTodoByIdUseCase {
	constructor(private readonly repository: TodoRepository) {}

	async execute(id: number): Promise<TodoEntity> {
		return await this.repository.getById(id);
	}
}
