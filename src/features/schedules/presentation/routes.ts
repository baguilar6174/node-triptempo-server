import { Router } from 'express';
import { Controller } from './controller';
import { DatasourceImpl, RepositoryImpl } from '../infraestructure';

export class SchedulesRoutes {
	static get routes(): Router {
		const router = Router();

		//* This datasource can be change
		const datasource = new DatasourceImpl();
		const repository = new RepositoryImpl(datasource);
		const controller = new Controller(repository);

		router.get('/:id', controller.getById);
		router.post('/', controller.create);
		router.put('/:id', controller.update);
		router.delete('/:id', controller.delete);

		return router;
	}
}
