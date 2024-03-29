import express, { type Router } from 'express';
import path from 'path';
import compression from 'compression';

interface ServerOptions {
	port: number;
	publicPath: string;
	routes: Router;
}

export class Server {
	private readonly app = express();
	private readonly port: number;
	private readonly publicPath: string;
	private readonly routes: Router;

	constructor(options: ServerOptions) {
		const { port, publicPath, routes } = options;
		this.port = port;
		this.publicPath = publicPath;
		this.routes = routes;
	}

	async start(): Promise<void> {
		//* Middlewares
		this.app.use(express.json()); // parse json in request body (allow raw)
		this.app.use(express.urlencoded({ extended: true })); // allow x-www-form-urlencoded
		this.app.use(compression());

		//* Public folder
		this.app.use(express.static(this.publicPath));

		//* Routes
		this.app.use(this.routes);

		//* Helps SPA router
		this.app.get('*', (_req, res) => {
			const indexPath = path.join(__dirname + `../../../${this.publicPath}/index.html`);
			res.sendFile(indexPath);
		});

		this.app.listen(this.port, () => {
			console.log(`Server running on port ${this.port}...`);
		});
	}
}
