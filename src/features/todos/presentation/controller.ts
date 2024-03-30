import { type NextFunction, type Request, type Response } from 'express';

import {
	CreateTodoDto,
	UpdateTodoDto,
	CreateTodo,
	GetTodoById,
	GetTodos,
	UpdateTodo,
	type TodoRepository,
	DeleteTodo,
	type TodoEntity
} from '../domain';
import { PaginationDto } from '../../shared';
import { type ServerResponse, ZERO } from '../../../core';

interface Params {
	id: string;
}

interface RequestBody {
	text: string;
	completedAt: string;
}

interface RequestQuery {
	page: number;
	limit: number;
}

export class TodoController {
	//* Dependency injection
	constructor(private readonly repository: TodoRepository) {}

	public getAll = (
		req: Request<unknown, unknown, unknown, RequestQuery>,
		res: Response<ServerResponse<TodoEntity[]>>,
		next: NextFunction
	): void => {
		const { page = 1, limit = 10 } = req.query;
		const paginationDto = new PaginationDto(+page, +limit);
		const errors = PaginationDto.validate(paginationDto);
		if (errors.length > ZERO) res.status(400).json({ errors });
		new GetTodos(this.repository)
			.execute(paginationDto)
			.then((result) => res.json({ data: result }))
			.catch((error) => {
				next(error);
			});
	};

	public getById = (req: Request<Params>, res: Response<ServerResponse<TodoEntity>>, next: NextFunction): void => {
		const id = +req.params.id;
		new GetTodoById(this.repository)
			.execute(id)
			.then((result) => res.json({ data: result }))
			.catch(next);
	};

	public create = (
		req: Request<unknown, unknown, RequestBody>,
		res: Response<ServerResponse<TodoEntity>>,
		next: NextFunction
	): void => {
		const { text } = req.body;
		const createDto = new CreateTodoDto(text);
		const errors = CreateTodoDto.validate(createDto);
		if (errors.length > ZERO) res.status(400).json({ errors });
		new CreateTodo(this.repository)
			.execute(createDto)
			.then((result) => res.json({ data: result }))
			.catch(next);
	};

	public update = (
		req: Request<Params, unknown, RequestBody>,
		res: Response<ServerResponse<TodoEntity>>,
		next: NextFunction
	): void => {
		const id = +req.params.id;
		const updateDto = UpdateTodoDto.create({ ...req.body, id });
		const errors = UpdateTodoDto.validate(updateDto);
		if (errors.length > ZERO) res.status(400).json({ errors });
		new UpdateTodo(this.repository)
			.execute(updateDto)
			.then((result) => res.json({ data: result }))
			.catch(next);
	};

	public delete = (req: Request<Params>, res: Response<ServerResponse<TodoEntity>>, next: NextFunction): void => {
		const id = +req.params.id;
		new DeleteTodo(this.repository)
			.execute(id)
			.then((result) => res.json({ data: result }))
			.catch(next);
	};
}
