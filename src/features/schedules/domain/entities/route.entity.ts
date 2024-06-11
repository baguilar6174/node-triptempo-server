import { AppError, ZERO } from '../../../../core';

interface ScheduleFromDB {
	id: number;
	routeId: string;
	departureTime: string;
	isAvailable: boolean;
}

export class ScheduleEntity {
	constructor(
		public readonly id: number,
		public readonly routeId: string,
		public readonly departureTime: string,
		public readonly isAvailable: boolean
	) {}

	public static fromDataBase(dataBaseObjList: ScheduleFromDB[]): ScheduleEntity[] {
		return dataBaseObjList.map((obj) => ScheduleEntity.fromJson(obj));
	}

	public static fromJson(obj: ScheduleFromDB): ScheduleEntity {
		const { id, routeId, departureTime, isAvailable } = obj;

		if (!id || isNaN(Number(id))) {
			throw AppError.badRequest('This entity requires a valid id', [
				{ constraint: 'Valid id is required', fields: ['id'] }
			]);
		}

		if (!routeId || routeId.length === ZERO) {
			throw AppError.badRequest('This entity requires a routeId', [
				{ constraint: 'routeId is required', fields: ['routeId'] }
			]);
		}

		if (!departureTime || departureTime.length === ZERO) {
			throw AppError.badRequest('This entity requires a departureTime', [
				{ constraint: 'departureTime is required', fields: ['departureTime'] }
			]);
		}

		return new ScheduleEntity(id, routeId, departureTime, isAvailable);
	}
}
