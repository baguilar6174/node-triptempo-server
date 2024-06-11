import { AppError, ZERO } from '../../../../core';

interface RouteFromDB {
	id: string;
	startCityId: string;
	endCityId: string;
	distance: number;
	price: number;
	estimatedTravelTime: number;
	transportationProviderId: string;
	startCity: {
		id: string;
		name: string;
		provinceId: string;
	};
	endCity: {
		id: string;
		name: string;
		provinceId: string;
	};
	transportationProvider: {
		id: string;
		name: string;
		logo: string | null;
		details: string | null;
	};
}

export class RouteEntity {
	constructor(
		public readonly id: string,
		public readonly endCity: string,
		public readonly distance: number,
		public readonly price: number,
		public readonly estimatedTravelTime: number,
		public readonly transportationProvider: string,
		public readonly startCity: string
	) {}

	public static fromDataBase(dataBaseObjList: RouteFromDB[]): RouteEntity[] {
		return dataBaseObjList.map((obj) => RouteEntity.fromJson(obj));
	}

	public static fromJson(obj: RouteFromDB): RouteEntity {
		const { id, endCity, distance, price, estimatedTravelTime, transportationProvider, startCity } = obj;

		if (!id || id.length === ZERO) {
			throw AppError.badRequest('This entity requires an id', [{ constraint: 'id is required', fields: ['id'] }]);
		}

		if (!startCity) {
			throw AppError.badRequest('This entity requires a startCity', [
				{ constraint: 'startCity is required', fields: ['startCity'] }
			]);
		}

		if (!endCity) {
			throw AppError.badRequest('This entity requires an endCity', [
				{ constraint: 'endCity is required', fields: ['endCity'] }
			]);
		}

		if (!distance || distance <= ZERO) {
			throw AppError.badRequest('This entity requires a distance', [
				{ constraint: 'distance is required', fields: ['distance'] }
			]);
		}

		if (!price || price <= ZERO) {
			throw AppError.badRequest('This entity requires a price', [
				{ constraint: 'price is required', fields: ['price'] }
			]);
		}

		if (!estimatedTravelTime || estimatedTravelTime <= ZERO) {
			throw AppError.badRequest('This entity requires an estimatedTravelTime', [
				{ constraint: 'estimatedTravelTime is required', fields: ['estimatedTravelTime'] }
			]);
		}

		if (!transportationProvider) {
			throw AppError.badRequest('This entity requires a transportationProvider', [
				{ constraint: 'transportationProvider is required', fields: ['transportationProvider'] }
			]);
		}

		return new RouteEntity(
			id,
			endCity.name,
			distance,
			price,
			estimatedTravelTime,
			transportationProvider.name,
			startCity.name
		);
	}
}
