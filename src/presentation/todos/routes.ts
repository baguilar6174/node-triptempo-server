import { Router } from 'express';
import { TodoController } from './controller';
import { TodoDatasourceImpl } from '../../infraestructure/datasource/todo.datasource.impl';
import { TodoRepositoryImpl } from '../../infraestructure/repositories/todo.repository.impl';

// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class TodoRoutes {
	static get routes(): Router {
		const router = Router();

		//* This datasource can be change
		const datasource = new TodoDatasourceImpl();
		const repository = new TodoRepositoryImpl(datasource);
		const todoController = new TodoController(repository);

		router.get('/', todoController.getAll);
		router.get('/:id', todoController.getById);
		router.post('/', todoController.create);
		router.put('/:id', todoController.update);
		router.delete('/:id', todoController.delete);

		return router;
	}
}
