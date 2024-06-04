import { ZERO } from '../../../../core';

// ? Posibly this will be an Entity
interface ScheduleFromDB {
	id: number;
	departureTime: string;
}

type ProviderFromDB = Array<{
	id: string;
	name: string;
	logo: string | null;
	details: string | null;
	routes: Array<{
		schedules: ScheduleFromDB[];
		distance: number;
		price: number;
		estimatedTravelTime: number;
	}>;
}>;

export class ProviderEntity {
	constructor(
		public id: string,
		public name: string,
		public logo: string | null,
		public details: string | null,
		public estimatedTravelTime: number,
		public distance: number,
		public price: number,
		public schedules: ScheduleFromDB[]
	) {}

	public static fromDataBase(dataBaseObjList: ProviderFromDB): ProviderEntity[] {
		// TODO: add validations
		return dataBaseObjList.map(({ id, name, logo, routes, details }) => {
			const { distance, estimatedTravelTime, price, schedules } = routes[ZERO];
			return new ProviderEntity(id, name, logo, details, estimatedTravelTime, distance, price, schedules);
		});
	}
}
