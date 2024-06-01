import { ZERO } from '../../../../core';

type ProviderFromDB = Array<{
	details: string | null;
	id: number;
	name: string;
	logo: string | null;
	routes: Array<{
		schedules: string[];
		distance: number;
		price: number;
		estimatedTravelTime: number;
	}>;
}>;

export class ProviderEntity {
	constructor(
		public id: number,
		public name: string,
		public logo: string | null,
		public details: string | null,
		public estimatedTravelTime: number,
		public distance: number,
		public price: number,
		public schedules: string[]
	) {}

	public static fromDataBase(dataBaseObjList: ProviderFromDB): ProviderEntity[] {
		// TODO: add validations
		return dataBaseObjList.map(({ id, name, logo, routes, details }) => {
			const { distance, estimatedTravelTime, price, schedules } = routes[ZERO];
			return new ProviderEntity(id, name, logo, details, estimatedTravelTime, distance, price, schedules);
		});
	}
}
