import { ValidationError, ZERO } from '../../../../core';

type CompleteProviderFromDB = Array<{
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

	public static fromDataBaseList(dataBaseObjList: CompleteProviderFromDB): ProviderEntity[] {
		return dataBaseObjList.map(({ id, name, logo, routes, details }) => {
			const { distance, estimatedTravelTime, price, schedules } = routes[ZERO];
			if (!id) throw new ValidationError([{ fields: ['id'], constraint: 'id is required' }]);
			if (!name) throw new ValidationError([{ fields: ['name'], constraint: 'name is required' }]);
			if (!logo) throw new ValidationError([{ fields: ['logo'], constraint: 'logo is required' }]);
			if (!routes) throw new ValidationError([{ fields: ['routes'], constraint: 'routes are required' }]);
			if (!estimatedTravelTime) {
				throw new ValidationError([{ fields: ['estimatedTravelTime'], constraint: 'estimatedTravelTime is required' }]);
			}
			if (!distance) throw new ValidationError([{ fields: ['distance'], constraint: 'distance is required' }]);
			if (!price) throw new ValidationError([{ fields: ['price'], constraint: 'price is required' }]);
			if (!schedules) throw new ValidationError([{ fields: ['schedules'], constraint: 'schedules are required' }]);
			return new ProviderEntity(id, name, logo, details, estimatedTravelTime, distance, price, schedules);
		});
	}
}
