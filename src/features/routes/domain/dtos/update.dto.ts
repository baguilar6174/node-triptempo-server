import { type ValidationType, AppError, ZERO } from '../../../../core';
import { type CoreDTO } from '../../../shared';

export class UpdateRouteDTO implements CoreDTO<UpdateRouteDTO> {
	private constructor(
		public readonly id: string,
		public readonly distance?: number,
		public readonly price?: number,
		public readonly estimatedTravelTime?: number
	) {
		this.validate(this);
	}

	public validate(dto: UpdateRouteDTO): void {
		const errors: ValidationType[] = [];

		const { id, distance, price, estimatedTravelTime } = dto;

		if (!id || id.length < ZERO) {
			errors.push({ fields: ['id'], constraint: 'Id is required to update' });
		}

		if (distance && !isNaN(Number(distance)) && distance <= ZERO) {
			errors.push({ fields: ['distance'], constraint: 'Distance is required, should be a positive number' });
		}

		if (price && !isNaN(Number(price)) && price <= ZERO) {
			errors.push({ fields: ['price'], constraint: 'Price is required, should be a positive number' });
		}

		if (estimatedTravelTime && !isNaN(Number(estimatedTravelTime)) && estimatedTravelTime <= ZERO) {
			errors.push({
				fields: ['estimatedTravelTime'],
				constraint: 'EstimatedTravelTime is required, should be a positive number'
			});
		}

		if (errors.length > ZERO) throw AppError.badRequest('Error validating update provider', errors);
	}

	public static create(object: Record<string, unknown>): UpdateRouteDTO {
		const { id, distance, price, estimatedTravelTime } = object;
		return new UpdateRouteDTO(id as string, Number(distance), Number(price), Number(estimatedTravelTime));
	}
}
