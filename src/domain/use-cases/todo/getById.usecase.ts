import { type TodoRepository, type TodoEntity } from '../..';

export interface GetTodoByIdUseCase {
	execute: (id: number) => Promise<TodoEntity>;
}

export class GetTodoById implements GetTodoByIdUseCase {
	constructor(private readonly repository: TodoRepository) {}

	async execute(id: number): Promise<TodoEntity> {
		return await this.repository.getById(id);
	}
}
