import { type TodoRepository, type TodoEntity } from '../..';

export interface GetTodosUseCase {
	execute: (id: number) => Promise<TodoEntity[]>;
}

export class GetTodos implements GetTodosUseCase {
	constructor(private readonly repository: TodoRepository) {}

	async execute(): Promise<TodoEntity[]> {
		return await this.repository.getAll();
	}
}
