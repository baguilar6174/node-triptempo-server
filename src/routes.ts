import { Router } from 'express';
import { TodoRoutes } from './features/todos';
import { TODOS_ROUTE } from './core';

export class AppRoutes {
	static get routes(): Router {
		const router = Router();

		router.use(`/${TODOS_ROUTE}`, TodoRoutes.routes);

		return router;
	}
}
