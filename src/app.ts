import { envs } from './core';
import { AppRoutes } from './routes';
import { Server } from './server';

(() => {
	main();
})();

function main(): void {
	// * At this point you can connect to your database for example MongoDB

	const server = new Server({
		port: envs.PORT,
		publicPath: envs.PUBLIC_PATH,
		apiPrefix: envs.API_PREFIX,
		routes: AppRoutes.routes,
		isPublicContentEnabled: false
	});
	void server.start();
}
