import { envs } from './config/env';
import { Server } from './presentation/server';

(() => {
	main();
})();

function main(): void {
	const server = new Server({
		port: envs.PORT,
		publicPath: envs.PUBLIC_PATH
	});
	void server.start();
}
