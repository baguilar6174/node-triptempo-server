import { Router } from 'express';
import { TodoController } from './controller';

// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class TodoRoutes {
	static get routes(): Router {
		const router = Router();

		const todoController = new TodoController();

		router.get('/', todoController.getAll);
		router.get('/:id', todoController.getById);
		router.post('/', todoController.create);
		router.put('/:id', todoController.update);
		router.put('/:id', todoController.delete);

		return router;
	}
}
