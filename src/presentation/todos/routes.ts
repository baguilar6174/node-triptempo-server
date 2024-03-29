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
		const controller = new TodoController(repository);

		router.get('/', controller.getAll);
		router.get('/:id', controller.getById);
		router.post('/', controller.create);
		router.put('/:id', controller.update);
		router.delete('/:id', controller.delete);

		return router;
	}
}
