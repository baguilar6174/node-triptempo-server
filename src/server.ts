import express, { type NextFunction, type Request, type Response, type Router } from 'express';
import path from 'path';
import compression from 'compression';
import rateLimit from 'express-rate-limit';

import { AppError, HttpCode, ONE_HUNDRED, ONE_THOUSAND, SIXTY } from './core';
import { CustomMiddlewares, ErrorMiddleware } from './features/shared';

interface ServerOptions {
	port: number;
	publicPath: string;
	apiPrefix: string;
	routes: Router;
	isPublicContentEnabled: boolean;
}

export class Server {
	private readonly app = express();
	private readonly port: number;
	private readonly publicPath: string;
	private readonly apiPrefix: string;
	private readonly routes: Router;
	private readonly isPublicContentEnabled: boolean;

	constructor(options: ServerOptions) {
		const { port, publicPath, routes, apiPrefix, isPublicContentEnabled } = options;
		this.port = port;
		this.publicPath = publicPath;
		this.apiPrefix = apiPrefix;
		this.routes = routes;
		this.isPublicContentEnabled = isPublicContentEnabled;
	}

	async start(): Promise<void> {
		//* Middlewares
		this.app.use(express.json()); // parse json in request body (allow raw)
		this.app.use(express.urlencoded({ extended: true })); // allow x-www-form-urlencoded
		this.app.use(compression());
		//  limit repeated requests to public APIs
		this.app.use(
			rateLimit({
				max: ONE_HUNDRED,
				windowMs: SIXTY * SIXTY * ONE_THOUSAND,
				message: 'Too many requests from this IP, please try again in one hour'
			})
		);
		// Shared Middlewares
		this.app.use(CustomMiddlewares.writeInConsole);

		//* Routes
		this.app.use(this.apiPrefix, this.routes);

		if (this.isPublicContentEnabled) {
			//* Public content folder
			this.app.use(express.static(this.publicPath));
			//* Helps SPA router
			this.app.get('*', (_req, res) => {
				const indexPath = path.join(__dirname + `../../${this.publicPath}/index.html`);
				res.sendFile(indexPath);
			});
		} else {
			// Test rest api
			this.app.get('/', (_req: Request, res: Response) => {
				return res.status(HttpCode.OK).send({
					message: `Welcome to Initial API! \n Endpoints available at http://localhost:${this.port}/api/v1`
				});
			});
			//* Handle not found routes in /api/v1/* (only if 'Public content folder' is not available)
			this.routes.all('*', (req: Request, _: Response, next: NextFunction): void => {
				next(AppError.notFound(`Cant find ${req.originalUrl} on this server!`));
			});
		}

		// Handle errors middleware
		this.routes.use(ErrorMiddleware.handleError);

		this.app.listen(this.port, () => {
			console.log(`Server running on port ${this.port}...`);
		});
	}
}
