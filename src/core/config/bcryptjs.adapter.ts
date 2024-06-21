import { compareSync, genSaltSync, hashSync } from 'bcryptjs';

export const bcryptAdapter = {
	/**
	 * Generates a hash for a password with a salt.
	 * @param password - The password to hash.
	 * @returns - The hashed password.
	 */
	hash: (password: string): string => hashSync(password, genSaltSync()),

	/**
	 * Compares a password with a given hash and salt.
	 * @param password - The password to verify.
	 * @param hash - The original hash to compare with.
	 * @returns - True if the password matches, false otherwise.
	 */
	comparePassword: (password: string, hash: string): boolean => compareSync(password, hash)
};
