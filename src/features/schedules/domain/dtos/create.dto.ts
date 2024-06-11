import { type ValidationType, AppError, ZERO } from '../../../../core';
import { type CoreDTO } from '../../../shared';

export class CreateScheduleDTO implements CoreDTO<CreateScheduleDTO> {
	private constructor(
		public readonly routeId: string,
		public readonly departureTime: string,
		public readonly isAvailable?: boolean
	) {
		this.validate(this);
	}

	public validate(dto: CreateScheduleDTO): void {
		const errors: ValidationType[] = [];
		const { routeId, departureTime } = dto;

		if (!routeId || routeId.length < ZERO) {
			errors.push({ fields: ['routeId'], constraint: 'RouteId is required' });
		}

		if (!departureTime || departureTime.length < ZERO) {
			errors.push({ fields: ['departureTime'], constraint: 'DepartureTime is required' });
		}

		if (errors.length > ZERO) throw AppError.badRequest('Error validating create provider', errors);
	}

	/**
	 * This method creates a new instance of this DTO class with the given
	 * properties from body or query parameters.
	 * @param object
	 * @returns A new instance of this DTO
	 */
	public static create(object: Record<string, unknown>): CreateScheduleDTO {
		const { routeId, departureTime, isAvailable = true } = object;
		return new CreateScheduleDTO(routeId as string, departureTime as string, isAvailable as boolean);
	}
}
