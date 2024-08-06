import { AppError, ZERO } from '../../../../core';

interface ProvinceFromDB {
	id: string;
	name: string;
}

export class ProvincesEntity {
	constructor(
		public id: string,
		public name: string
	) {}

	public static fromDataBase(dataBaseObjList: ProvinceFromDB[]): ProvincesEntity[] {
		return dataBaseObjList.map((obj) => ProvincesEntity.fromJson(obj));
	}

	public static fromJson(obj: ProvinceFromDB): ProvincesEntity {
		const { id, name } = obj;
		if (!id) {
			throw AppError.badRequest('This entity requires an id', [{ constraint: 'id is required', fields: ['id'] }]);
		}
		if (!name || name.length === ZERO) {
			throw AppError.badRequest('This entity requires a name', [{ constraint: 'name is required', fields: ['name'] }]);
		}
		return new ProvincesEntity(id, name);
	}
}
