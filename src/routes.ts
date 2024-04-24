import { Router } from 'express';
import { CitiesRoutes } from './features/cities';
import { CITIES_ROUTE } from './core';

export class AppRoutes {
	static get routes(): Router {
		const router = Router();

		router.use(`/${CITIES_ROUTE}`, CitiesRoutes.routes);

		return router;
	}
}
