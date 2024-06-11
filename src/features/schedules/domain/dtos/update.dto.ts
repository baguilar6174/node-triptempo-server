import { type ValidationType, AppError, ZERO } from '../../../../core';
import { type CoreDTO } from '../../../shared';

export class UpdateScheduleDTO implements CoreDTO<UpdateScheduleDTO> {
	private constructor(
		public readonly id: number,
		public readonly routeId?: string,
		public readonly departureTime?: string,
		public readonly isAvailable?: boolean
	) {
		this.validate(this);
	}

	public validate(dto: UpdateScheduleDTO): void {
		const errors: ValidationType[] = [];

		const { id } = dto;

		if (!id || isNaN(Number(id))) {
			errors.push({ fields: ['id'], constraint: 'Id is required and valid value to update' });
		}

		// TODO: add validations

		if (errors.length > ZERO) throw AppError.badRequest('Error validating update provider', errors);
	}

	public static create(object: Record<string, unknown>): UpdateScheduleDTO {
		const { id, routeId, departureTime, isAvailable } = object;
		return new UpdateScheduleDTO(id as number, routeId as string, departureTime as string, isAvailable as boolean);
	}
}
