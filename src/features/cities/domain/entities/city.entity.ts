import { ValidationError } from '../../../../core';

export class CityEntity {
	constructor(
		public id: string,
		public name: string,
		public regionId: string
	) {}

	public static fromJson(obj: Record<string, unknown>): CityEntity {
		const { id, name, regionId } = obj;
		if (!id) throw new ValidationError([{ fields: ['id'], constraint: 'id is required' }]);
		if (!name) throw new ValidationError([{ fields: ['name'], constraint: 'name is required' }]);
		if (!regionId) throw new ValidationError([{ fields: ['regionId'], constraint: 'regionId is required' }]);
		return new CityEntity(id as string, name as string, regionId as string);
	}
}
