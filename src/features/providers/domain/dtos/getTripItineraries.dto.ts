import { AppError, ZERO } from '../../../../core';
import { type ValidationType } from '../../../../core/types';
import { type CoreDTO } from '../../../shared';

export class GetTripItineraryDTO implements CoreDTO<GetTripItineraryDTO> {
	private constructor(
		public readonly startCityId: string,
		public readonly endCityId: string
	) {
		this.validate(this);
	}

	public validate(dto: GetTripItineraryDTO): void {
		const errors: ValidationType[] = [];

		const { startCityId, endCityId } = dto;

		if (!startCityId) {
			errors.push({ fields: ['startCityId'], constraint: 'startCityId is required' });
		}

		if (!endCityId) {
			errors.push({ fields: ['endCityId'], constraint: 'endCityId is required' });
		}

		if (errors.length > ZERO) throw AppError.badRequest('Error validating get trip itineraries', errors);
	}

	public static create(object: Record<string, unknown>): GetTripItineraryDTO {
		const { startCityId, endCityId } = object;
		return new GetTripItineraryDTO(startCityId as string, endCityId as string);
	}
}
