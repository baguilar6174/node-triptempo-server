import { type ValidationType, AppError, ZERO } from '../../../../core';
import { type CoreDTO } from '../../../shared';

export class CreateRouteDTO implements CoreDTO<CreateRouteDTO> {
	private constructor(
		public readonly startCityId: string,
		public readonly endCityId: string,
		public readonly distance: number,
		public readonly price: number,
		public readonly estimatedTravelTime: number,
		public readonly transportationProviderId: string
	) {
		this.validate(this);
	}

	public validate(dto: CreateRouteDTO): void {
		const errors: ValidationType[] = [];
		const { startCityId, endCityId, distance, price, estimatedTravelTime, transportationProviderId } = dto;

		if (!startCityId || startCityId.length === ZERO) {
			errors.push({ fields: ['startCityId'], constraint: 'StartCityId is required' });
		}

		if (!endCityId || endCityId.length === ZERO) {
			errors.push({ fields: ['endCityId'], constraint: 'EndCityId is required' });
		}

		if (!distance || isNaN(Number(distance)) || distance <= ZERO) {
			errors.push({ fields: ['distance'], constraint: 'Distance is required, should be a positive number' });
		}

		if (!price || isNaN(Number(price)) || price <= ZERO) {
			errors.push({ fields: ['price'], constraint: 'Price is required, should be a positive number' });
		}

		if (!estimatedTravelTime || isNaN(Number(estimatedTravelTime)) || estimatedTravelTime <= ZERO) {
			errors.push({
				fields: ['estimatedTravelTime'],
				constraint: 'EstimatedTravelTime is required, should be a positive number'
			});
		}

		if (!transportationProviderId || transportationProviderId.length === ZERO) {
			errors.push({ fields: ['transportationProviderId'], constraint: 'TransportationProviderId is required' });
		}

		if (errors.length > ZERO) throw AppError.badRequest('Error validating create provider', errors);
	}

	/**
	 * This method creates a new instance of this DTO class with the given
	 * properties from body or query parameters.
	 * @param object
	 * @returns A new instance of this DTO
	 */
	public static create(object: Record<string, unknown>): CreateRouteDTO {
		const { startCityId, endCityId, distance, price, estimatedTravelTime, transportationProviderId } = object;
		return new CreateRouteDTO(
			startCityId as string,
			endCityId as string,
			Number(distance),
			Number(price),
			Number(estimatedTravelTime),
			transportationProviderId as string
		);
	}
}
