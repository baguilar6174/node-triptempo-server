import { type TodoRepository, type UpdateTodoDto, type TodoEntity } from '../..';

export interface UpdateTodoUseCase {
	execute: (data: UpdateTodoDto) => Promise<TodoEntity>;
}

export class UpdateTodo implements UpdateTodoUseCase {
	constructor(private readonly repository: TodoRepository) {}

	async execute(data: UpdateTodoDto): Promise<TodoEntity> {
		return await this.repository.update(data);
	}
}
