import { AppError, ZERO } from '../../../../core';

interface ProviderFromDB {
	id: string;
	name: string;
	logo: string | null;
	details: string | null;
}

export class ProviderEntity {
	constructor(
		public id: string,
		public name: string,
		public logo: string | null,
		public details: string | null
	) {}

	public static fromJson(obj: ProviderFromDB): ProviderEntity {
		const { id, name, logo, details } = obj;
		if (!id || id.length === ZERO) {
			throw AppError.badRequest('This entity requires an id', [{ constraint: 'id is required', fields: ['id'] }]);
		}
		if (!name || name.length === ZERO) {
			throw AppError.badRequest('This entity requires a name', [{ constraint: 'name is required', fields: ['name'] }]);
		}
		return new ProviderEntity(id, name, logo, details);
	}
}
