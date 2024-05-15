import { ValidationError, ZERO } from '../../../../core';
import { type ValidationType } from '../../../../core/types';
import { type CoreDto } from '../../../shared';

export class GetProvidersDto implements CoreDto<GetProvidersDto> {
	constructor(
		public readonly startCityId: string,
		public readonly endCityId: string
	) {
		this.validate(this);
	}

	public validate(dto: GetProvidersDto): void {
		const errors: ValidationType[] = [];

		const { startCityId, endCityId } = dto;

		if (!startCityId) {
			errors.push({ fields: ['startCityId'], constraint: 'startCityId is required' });
		}

		if (!endCityId) {
			errors.push({ fields: ['endCityId'], constraint: 'endCityId is required' });
		}

		if (errors.length > ZERO) throw new ValidationError(errors);
	}
}
