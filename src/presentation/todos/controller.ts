import { type Request, type Response } from 'express';

import { CreateTodoDto, PaginationDto, UpdateTodoDto } from '../../domain/dtos';
import {
	CreateTodo,
	GetTodoById,
	GetTodos,
	UpdateTodo,
	type TodoRepository,
	DeleteTodo,
	CustomError
} from '../../domain';

export class TodoController {
	//* Dependency injection
	constructor(private readonly repository: TodoRepository) {}

	private readonly handleError = (res: Response, error: unknown): void => {
		if (error instanceof CustomError) {
			res.status(error.statusCode).json({ error: error.message });
			return;
		}
		// Posibly logs
		res.status(500).json({ error: 'Internal server error' });
	};

	// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
	public getAll = (req: Request, res: Response) => {
		const { page = 1, limit = 10 } = req.query;
		const [error, paginationDto] = PaginationDto.create(+page, +limit);
		if (error) return res.status(400).json({ error });
		new GetTodos(this.repository)
			// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
			.execute(paginationDto!)
			.then((result) => res.json(result))
			.catch((error) => {
				this.handleError(res, error);
			});
	};

	// TODO: update types in response
	public getById = (req: Request<{ id: string }>, res: Response): void => {
		const id = +req.params.id;
		new GetTodoById(this.repository)
			.execute(id)
			.then((result) => res.json(result))
			.catch((error) => {
				this.handleError(res, error);
			});
	};

	// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
	public create = (req: Request<unknown, unknown, { text: string }>, res: Response) => {
		const { body } = req;
		const [error, createDto] = CreateTodoDto.create(body);
		if (error) return res.status(400).json({ error });
		new CreateTodo(this.repository)
			// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
			.execute(createDto!)
			.then((result) => res.json(result))
			.catch((error) => {
				this.handleError(res, error);
			});
	};

	// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
	public update = (req: Request<{ id: string }, unknown, { text: string; completedAt: string }>, res: Response) => {
		const id = +req.params.id;
		const [error, updateDto] = UpdateTodoDto.update({ ...req.body, id });
		if (error) return res.status(400).json({ error });
		new UpdateTodo(this.repository)
			// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
			.execute(updateDto!)
			.then((result) => res.json(result))
			.catch((error) => {
				this.handleError(res, error);
			});
	};

	public delete = (req: Request, res: Response): void => {
		const id = +req.params.id;
		new DeleteTodo(this.repository)
			.execute(id)
			.then((result) => res.json(result))
			.catch((error) => {
				this.handleError(res, error);
			});
	};
}
