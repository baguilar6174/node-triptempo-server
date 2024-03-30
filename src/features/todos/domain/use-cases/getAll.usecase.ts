import { type PaginationDto } from '../../../shared';
import { type TodoEntity } from '../entities';
import { type TodoRepository } from '../repositories';

export interface GetTodosUseCase {
	execute: (pagination: PaginationDto) => Promise<TodoEntity[]>;
}

export class GetTodos implements GetTodosUseCase {
	constructor(private readonly repository: TodoRepository) {}

	async execute(pagination: PaginationDto): Promise<TodoEntity[]> {
		return await this.repository.getAll(pagination);
	}
}
