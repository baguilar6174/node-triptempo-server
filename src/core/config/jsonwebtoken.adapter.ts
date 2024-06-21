import { sign, verify } from 'jsonwebtoken';

import { envsAdapter } from './envs.adapter';

const JWT_SEED = envsAdapter.JWT_SEED;

/**
 * JWT adapter for basic authentication.
 */
export const jsonwebtokenAdapter = {
	/**
	 * Creates a JWT token.
	 * @param {Record<string, any>} payload - The payload of the token.
	 * @param {string} duration - The token expiration time in seconds.
	 * @returns {string} The generated JWT token.
	 */
	generateToken: async (payload: Record<string, unknown>, duration: string = '2h'): Promise<string | undefined> => {
		return await new Promise((resolve) => {
			sign(payload, JWT_SEED, { expiresIn: duration }, (err, token) => {
				if (!err) resolve(token);
				resolve(undefined);
			});
		});
	},

	/**
	 * Verifies a JWT token.
	 * @param {string} token - The JWT token to verify.
	 * @returns {Record<string, any> | null} The decoded payload if the token is valid, otherwise null.
	 */
	validateToken: async <T>(token: string): Promise<T | undefined> => {
		return await new Promise((resolve) => {
			verify(token, JWT_SEED, (err, decoded) => {
				if (!err) resolve(decoded as T);
				resolve(undefined);
			});
		});
	}
};
