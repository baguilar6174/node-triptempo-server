import { Router } from 'express';

import { CitiesRoutes } from './features/cities';
import { CITIES_ROUTE, PROVIDERS_ROUTE } from './core';
import { ProvidersRoutes } from './features/providers';

export class AppRoutes {
	static get routes(): Router {
		const router = Router();

		router.use(`/${CITIES_ROUTE}`, CitiesRoutes.routes);
		router.use(`/${PROVIDERS_ROUTE}`, ProvidersRoutes.routes);

		return router;
	}
}
