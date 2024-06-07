import { Router } from 'express';

import { CITIES_ROUTE, PROVIDERS_ROUTE, ROUTES_ROUTE } from './core';
import { CitiesRoutes } from './features/cities';
import { ProvidersRoutes } from './features/providers';
import { RoutesRoutes } from './features/routes';

export class AppRoutes {
	static get routes(): Router {
		const router = Router();

		router.use(`/${CITIES_ROUTE}`, CitiesRoutes.routes);
		router.use(`/${PROVIDERS_ROUTE}`, ProvidersRoutes.routes);
		router.use(`/${ROUTES_ROUTE}`, RoutesRoutes.routes);

		return router;
	}
}
