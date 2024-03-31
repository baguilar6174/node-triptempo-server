import { type PaginationResponseEntity, type PaginationDto } from '../../../shared';
import { type UpdateTodoDto, type CreateTodoDto, type GetTodoByIdDto } from '../dtos';
import { type TodoEntity } from '../entities/todo.entity';

export abstract class TodoDatasource {
	abstract create(createDto: CreateTodoDto): Promise<TodoEntity>;
	abstract getAll(pagination: PaginationDto): Promise<PaginationResponseEntity<TodoEntity[]>>;
	abstract getById(getByIdDto: GetTodoByIdDto): Promise<TodoEntity>;
	abstract update(updateDto: UpdateTodoDto): Promise<TodoEntity>;
	abstract delete(getByIdDto: GetTodoByIdDto): Promise<TodoEntity>;
}
