import { Router } from 'express';

import {
	AUTH_ROUTE,
	CITIES_ROUTE,
	PROVIDERS_ROUTE,
	PROVINCES_ROUTE,
	REGIONS_ROUTE,
	ROUTES_ROUTE,
	SCHEDULES_ROUTE
} from './core';
import { CitiesRoutes } from './features/cities';
import { ProvidersRoutes } from './features/providers';
import { RoutesRoutes } from './features/routes';
import { SchedulesRoutes } from './features/schedules';
import { AuthRoutes } from './features/auth';
import { RegionsRoutes } from './features/regions';
import { ProvincesRoutes } from './features/provinces';

export class AppRoutes {
	static get routes(): Router {
		const router = Router();

		router.use(`/${AUTH_ROUTE}`, AuthRoutes.routes);
		router.use(`/${REGIONS_ROUTE}`, RegionsRoutes.routes);
		router.use(`/${PROVINCES_ROUTE}`, ProvincesRoutes.routes);
		router.use(`/${CITIES_ROUTE}`, CitiesRoutes.routes);
		router.use(`/${PROVIDERS_ROUTE}`, ProvidersRoutes.routes);
		router.use(`/${ROUTES_ROUTE}`, RoutesRoutes.routes);
		router.use(`/${SCHEDULES_ROUTE}`, SchedulesRoutes.routes);

		return router;
	}
}
