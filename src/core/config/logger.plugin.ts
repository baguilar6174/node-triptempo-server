import winston, { format } from 'winston';

import { PROD_ENVIRONMENT } from '../constants';
import { envs } from './envs.config';

export class Logger {
	private readonly environment: string;
	private readonly logger = winston.createLogger({
		level: 'info',
		format: format.combine(format.timestamp(), format.json()),
		transports: [new winston.transports.File({ filename: 'application.log' })]
	});

	constructor() {
		this.environment = envs.NODE_ENV;
		this.init();
		// Posible singleton pattern?
	}

	private init(): void {
		if (this.environment === PROD_ENVIRONMENT) return;
		this.logger.add(new winston.transports.Console({ format: winston.format.simple() }));
	}

	// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
	public buildLogger(service?: string) {
		return {
			log: (message: string) => {
				this.logger.log('info', { message, service });
			},
			error: (message: string) => {
				this.logger.error('error', { message, service });
			}
		};
	}
}
