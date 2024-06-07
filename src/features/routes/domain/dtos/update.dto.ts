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

		const { id } = dto;

		if (!id || id.length < ZERO) {
			errors.push({ fields: ['id'], constraint: 'Id is required to update' });
		}

		if (errors.length > ZERO) throw AppError.badRequest('Error validating update provider', errors);
	}

	public static create(object: Record<string, unknown>): UpdateRouteDTO {
		const { id, distance, price, estimatedTravelTime } = object;
		return new UpdateRouteDTO(id as string, distance as number, price as number, estimatedTravelTime as number);
	}
}
