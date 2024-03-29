import { type Request, type Response } from 'express';
import { type Send } from 'express-serve-static-core';

import { CreateTodoDto, UpdateTodoDto } from '../../domain/dtos';
import { CreateTodo, GetTodoById, GetTodos, UpdateTodo, type TodoRepository, DeleteTodo } from '../../domain';

export interface TypedResponse<ResBody> extends Express.Response {
	json: Send<ResBody, this>;
}

export class TodoController {
	//* Dependency injection
	constructor(private readonly repository: TodoRepository) {}

	public getAll = (_req: Request, res: Response): void => {
		new GetTodos(this.repository)
			.execute()
			.then((result) => res.json(result))
			.catch((error) => res.status(400).json({ error }));
	};

	// TODO: update types in response
	public getById = (req: Request<{ id: string }>, res: Response): void => {
		const id = +req.params.id;
		new GetTodoById(this.repository)
			.execute(id)
			.then((result) => res.json(result))
			.catch((error) => res.status(400).json({ error }));
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
			.catch((error) => res.status(400).json({ error }));
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
			.catch((error) => res.status(400).json({ error }));
	};

	public delete = (req: Request, res: Response): void => {
		const id = +req.params.id;
		new DeleteTodo(this.repository)
			.execute(id)
			.then((result) => res.json(result))
			.catch((error) => res.status(400).json({ error }));
	};
}
