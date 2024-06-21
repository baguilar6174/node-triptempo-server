// src/testServer.ts

import { envsAdapter } from './core';
import { AppRoutes } from './routes';
import { Server } from './server';

// This is a test server for testing purposes
export const testServer = new Server({
	port: envsAdapter.PORT,
	publicPath: envsAdapter.PUBLIC_PATH,
	apiPrefix: envsAdapter.API_PREFIX,
	routes: AppRoutes.routes,
	isPublicContentEnabled: false
});
