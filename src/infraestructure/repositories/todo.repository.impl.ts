import {
	type TodoDatasource,
	type CreateTodoDto,
	type TodoEntity,
	type TodoRepository,
	type UpdateTodoDto,
	type PaginationDto
} from '../../domain';

export class TodoRepositoryImpl implements TodoRepository {
	constructor(private readonly datasource: TodoDatasource) {}

	async create(createDto: CreateTodoDto): Promise<TodoEntity> {
		return await this.datasource.create(createDto);
	}

	async getAll(pagination: PaginationDto): Promise<TodoEntity[]> {
		return await this.datasource.getAll(pagination);
	}

	async getById(id: number): Promise<TodoEntity> {
		return await this.datasource.getById(id);
	}

	async update(updateDto: UpdateTodoDto): Promise<TodoEntity> {
		return await this.datasource.update(updateDto);
	}

	async delete(id: number): Promise<TodoEntity> {
		return await this.datasource.delete(id);
	}
}
