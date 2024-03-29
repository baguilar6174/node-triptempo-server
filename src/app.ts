import { envs } from './config/env';
import { AppRoutes } from './presentation/routes';
import { Server } from './presentation/server';

(() => {
	main();
})();

function main(): void {
	const server = new Server({
		port: envs.PORT,
		publicPath: envs.PUBLIC_PATH,
		routes: AppRoutes.routes
	});
	void server.start();
}
