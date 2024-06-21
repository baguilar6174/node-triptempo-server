import 'dotenv/config';
import { get } from 'env-var';

export const envsAdapter = {
	PORT: get('PORT').required().asPortNumber(),
	PUBLIC_PATH: get('PUBLIC_PATH').default('public').asString(),
	API_PREFIX: get('API_PREFIX').default('/api/v1').asString(),
	NODE_ENV: get('NODE_ENV').default('development').asString(),
	ALLOWED_ORIGINS: get('ALLOWED_ORIGINS').required().asString(),
	JWT_SEED: get('JWT_SEED').required().asString()
};
