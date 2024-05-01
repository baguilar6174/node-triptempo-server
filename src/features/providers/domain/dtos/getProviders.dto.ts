import { type ValidationType } from '../../../../core/types';

export class GetProvidersDto {
	constructor(
		public readonly startCityId: string,
		public readonly endCityId: string
	) {}

	public static validate(dto: GetProvidersDto): ValidationType[] {
		const errors: ValidationType[] = [];

		const { startCityId, endCityId } = dto;

		if (!startCityId) {
			errors.push({ fields: ['startCityId'], constraint: 'startCityId is required' });
		}

		if (!endCityId) {
			errors.push({ fields: ['endCityId'], constraint: 'endCityId is required' });
		}

		return errors;
	}
}
