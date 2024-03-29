import { type Request, type Response } from 'express';
import { prisma } from '../../data/postgresdb';

export class TodoController {
	//* Dependency injection
	// constructor() {}

	public getAll = async (_req: Request, res: Response): Promise<void> => {
		const todos = await prisma.todo.findMany();
		res.json(todos);
	};

	// TODO: update types
	public getById = async (req: Request, res: Response): Promise<Response<unknown, Record<string, unknown>>> => {
		const id = +req.params.id;
		if (isNaN(id)) return res.status(400).json({ error: 'Id is not a number' });
		const todo = await prisma.todo.findFirst({
			where: { id }
		});
		if (todo) {
			return res.json(todo);
		} else {
			return res.status(404).json({ error: `Todo with id ${id} not found` });
		}
	};

	public create = async (req: Request, res: Response): Promise<Response<unknown, Record<string, unknown>>> => {
		const { text } = req.body;
		if (!text) return res.status(400).json({ error: 'Text proerty is required' });
		const todo = await prisma.todo.create({
			data: {
				text
			}
		});
		return res.json(todo);
	};

	public update = async (req: Request, res: Response): Promise<Response<unknown, Record<string, unknown>>> => {
		const id = +req.params.id;
		if (isNaN(id)) return res.status(400).json({ error: 'Id is not a number' });
		const todo = await prisma.todo.findFirst({
			where: { id }
		});
		if (!todo) return res.status(404).json({ error: `Todo with id ${id} not found` });
		const { text } = req.body;
		const updatedTodo = await prisma.todo.update({
			where: { id },
			data: { text }
		});
		return res.json(updatedTodo);
	};

	public delete = async (req: Request, res: Response): Promise<Response<unknown, Record<string, unknown>>> => {
		const id = +req.params.id;
		if (isNaN(id)) return res.status(400).json({ error: 'Id is not a number' });
		const todo = await prisma.todo.findFirst({
			where: { id }
		});
		if (!todo) return res.status(404).json({ error: `Todo with id ${id} not found` });
		const deleted = await prisma.todo.delete({
			where: { id }
		});
		if (deleted) {
			return res.json({ deleted });
		} else {
			return res.status(400).json({ error: `Todo with id ${id} not found` });
		}
	};
}
