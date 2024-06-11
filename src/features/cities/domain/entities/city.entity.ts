import { AppError, ZERO } from '../../../../core';

type CityFromDB = {
	province: {
		region: {
			id: number;
			name: string;
		};
	} & {
		id: string;
		name: string;
		regionId: number;
	};
} & {
	id: string;
	name: string;
	provinceId: string;
};

export class CityEntity {
	constructor(
		public id: string,
		public name: string,
		public province: string,
		public region: string
	) {}

	public static fromDataBase(dataBaseObjList: CityFromDB[]): CityEntity[] {
		return dataBaseObjList.map((obj) => CityEntity.fromJson(obj));
	}

	public static fromJson(obj: CityFromDB): CityEntity {
		const { id, name, province } = obj;
		if (!id || id.length === ZERO) {
			throw AppError.badRequest('This entity requires an id', [{ constraint: 'id is required', fields: ['id'] }]);
		}
		if (!name || name.length === ZERO) {
			throw AppError.badRequest('This entity requires a name', [{ constraint: 'name is required', fields: ['name'] }]);
		}
		if (!province) {
			throw AppError.badRequest('This entity requires a province', [
				{ constraint: 'province is required', fields: ['province'] }
			]);
		}
		return new CityEntity(id, name, province.name, province.region.name);
	}
}
