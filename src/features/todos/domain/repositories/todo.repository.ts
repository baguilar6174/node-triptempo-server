import { type PaginationDto } from '../../../shared';
import { type UpdateTodoDto, type CreateTodoDto } from '../dtos';
import { type TodoEntity } from '../entities/todo.entity';

export abstract class TodoRepository {
	abstract create(createDto: CreateTodoDto): Promise<TodoEntity>;
	abstract getAll(pagination: PaginationDto): Promise<TodoEntity[]>;
	abstract getById(id: number): Promise<TodoEntity>;
	abstract update(updateDto: UpdateTodoDto): Promise<TodoEntity>;
	abstract delete(id: number): Promise<TodoEntity>;
}
