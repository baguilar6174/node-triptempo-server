import { Router } from 'express';
import { Controller } from './controller';
import { DatasourceImpl, RepositoryImpl } from '../infraestructure';

export class ProvidersRoutes {
	static get routes(): Router {
		const router = Router();

		//* This datasource can be change
		const datasource = new DatasourceImpl();
		const repository = new RepositoryImpl(datasource);
		const controller = new Controller(repository);

		router.get('/tripItineraries', controller.getTripItineraries);
		router.post('/', controller.create);

		return router;
	}
}
