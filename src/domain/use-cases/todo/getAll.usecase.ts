import { type TodoRepository, type TodoEntity, type PaginationDto } from '../..';

export interface GetTodosUseCase {
	execute: (pagination: PaginationDto) => Promise<TodoEntity[]>;
}

export class GetTodos implements GetTodosUseCase {
	constructor(private readonly repository: TodoRepository) {}

	async execute(pagination: PaginationDto): Promise<TodoEntity[]> {
		return await this.repository.getAll(pagination);
	}
}
