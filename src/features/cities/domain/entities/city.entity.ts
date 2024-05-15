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
		return dataBaseObjList.map(
			({ id, name, province }) => new CityEntity(id, name, province.name, province.region.name)
		);
	}
}
