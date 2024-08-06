import { AppError, ZERO } from '../../../../core';

interface RegionFromDB {
	id: number;
	name: string;
}

export class RegionEntity {
	constructor(
		public id: number,
		public name: string
	) {}

	public static fromDataBase(dataBaseObjList: RegionFromDB[]): RegionEntity[] {
		return dataBaseObjList.map((obj) => RegionEntity.fromJson(obj));
	}

	public static fromJson(obj: RegionFromDB): RegionEntity {
		const { id, name } = obj;
		if (!id) {
			throw AppError.badRequest('This entity requires an id', [{ constraint: 'id is required', fields: ['id'] }]);
		}
		if (!name || name.length === ZERO) {
			throw AppError.badRequest('This entity requires a name', [{ constraint: 'name is required', fields: ['name'] }]);
		}
		return new RegionEntity(id, name);
	}
}
