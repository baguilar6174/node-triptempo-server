import { envs } from './core/config/env';
import { AppRoutes } from './routes';
import { Server } from './server';

(() => {
	main();
})();

function main(): void {
	const server = new Server({
		port: envs.PORT,
		publicPath: envs.PUBLIC_PATH,
		apiPrefix: envs.API_PREFIX,
		routes: AppRoutes.routes,
		isPublicContentEnabled: false
	});
	void server.start();
}
