import { AppError, ZERO } from '../../../../core';
import { type ValidationType } from '../../../../core/types';
import { type CoreDto } from '../../../shared';

export class GetProvidersDto implements CoreDto<GetProvidersDto> {
	private constructor(
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

		if (errors.length > ZERO) throw AppError.badRequest('Error validating create todo', errors);
	}

	public static create(object: Record<string, unknown>): GetProvidersDto {
		const { startCityId, endCityId } = object;
		return new GetProvidersDto(startCityId as string, endCityId as string);
	}
}
