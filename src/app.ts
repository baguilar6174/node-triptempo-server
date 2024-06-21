import { envsAdapter } from './core';
import { AppRoutes } from './routes';
import { Server } from './server';

(() => {
	main();
})();

function main(): void {
	// * At this point you can connect to your database for example MongoDB

	const server = new Server({
		port: envsAdapter.PORT,
		publicPath: envsAdapter.PUBLIC_PATH,
		apiPrefix: envsAdapter.API_PREFIX,
		routes: AppRoutes.routes,
		isPublicContentEnabled: false,
		allowedOrigins: envsAdapter.ALLOWED_ORIGINS
	});
	void server.start();
}
