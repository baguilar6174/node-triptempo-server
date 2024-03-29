import { type Request, type Response } from 'express';

const todos = [{ id: 1, text: 'Buy something', createdAt: new Date() }];

export class TodoController {
	//* Dependency injection
	// constructor() {}

	public getAll = (_req: Request, res: Response): void => {
		res.json(todos);
	};

	// TODO: update types
	public getById = (req: Request, res: Response): Response<unknown, Record<string, unknown>> => {
		const id = +req.params.id;
		if (isNaN(id)) return res.status(400).json({ error: 'Id is not a number' });
		const todo = todos.find((todo) => todo.id === id);
		if (todo) {
			return res.json(todo);
		} else {
			return res.status(404).json({ error: `Todo with id ${id} not found` });
		}
	};

	public create = (req: Request, res: Response): Response<unknown, Record<string, unknown>> => {
		const { text } = req.body;
		if (!text) return res.status(400).json({ error: 'Text proerty is required' });
		const newTodo = {
			id: todos.length + 1,
			text,
			createdAt: new Date()
		};
		todos.push(newTodo);
		return res.json(newTodo);
	};

	public update = (req: Request, res: Response): Response<unknown, Record<string, unknown>> => {
		const id = +req.params.id;
		if (isNaN(id)) return res.status(400).json({ error: 'Id is not a number' });
		const todo = todos.find((todo) => todo.id === id);
		if (!todo) return res.status(404).json({ error: `Todo with id ${id} not found` });
		const { text } = req.body;
		todo.text = text || todo.text;
		return res.json(todo);
	};

	public delete = (req: Request, res: Response): Response<unknown, Record<string, unknown>> => {
		const id = +req.params.id;
		if (isNaN(id)) return res.status(400).json({ error: 'Id is not a number' });
		const todo = todos.find((todo) => todo.id === id);
		if (!todo) return res.status(404).json({ error: `Todo with id ${id} not found` });
		todos.splice(todos.indexOf(todo, 1));
		return res.json(todo);
	};
}
