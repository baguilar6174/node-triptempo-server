import { ValidationError } from '../../../../core';

type CompleteCityFromDB = {
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

	public static fromDataBaseObj(dataBaseObj: CompleteCityFromDB): CityEntity {
		const { id, name, province } = dataBaseObj;
		if (!id) throw new ValidationError([{ fields: ['id'], constraint: 'id is required' }]);
		if (!name) throw new ValidationError([{ fields: ['name'], constraint: 'name is required' }]);
		if (!province.name) throw new ValidationError([{ fields: ['province'], constraint: 'province is required' }]);
		if (!province.region.name) throw new ValidationError([{ fields: ['region'], constraint: 'region is required' }]);
		return new CityEntity(id, name, province.name, province.region.name);
	}

	public static fromDataBaseList(dataBaseObjList: CompleteCityFromDB[]): CityEntity[] {
		return dataBaseObjList.map((dataBaseObj) => CityEntity.fromDataBaseObj(dataBaseObj));
	}
}
