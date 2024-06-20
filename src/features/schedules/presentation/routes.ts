import { Router } from 'express';
import { Controller } from './controller';
import { DatasourceImpl, RepositoryImpl } from '../infraestructure';
import { authMiddleware } from '../../auth';

export class SchedulesRoutes {
	static get routes(): Router {
		const router = Router();

		//* This datasource can be change
		const datasource = new DatasourceImpl();
		const repository = new RepositoryImpl(datasource);
		const controller = new Controller(repository);

		router.get('/byRouteId/:id', controller.getAllByRouteId);
		router.get('/:id', controller.getById);
		router.post('/', [authMiddleware], controller.create);
		router.put('/:id', [authMiddleware], controller.update);
		router.delete('/:id', [authMiddleware], controller.delete);

		return router;
	}
}
