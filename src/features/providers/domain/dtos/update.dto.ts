import { type ValidationType, AppError, ZERO } from '../../../../core';
import { type CoreDTO } from '../../../shared';

export class UpdateProviderDTO implements CoreDTO<UpdateProviderDTO> {
	private constructor(
		public readonly id: string,
		public readonly name?: string,
		public readonly logo?: string,
		public readonly details?: string
	) {
		this.validate(this);
	}

	public validate(dto: UpdateProviderDTO): void {
		const errors: ValidationType[] = [];

		const { id } = dto;

		if (!id || id.length < ZERO) {
			errors.push({ fields: ['id'], constraint: 'Id is required to update' });
		}

		if (errors.length > ZERO) throw AppError.badRequest('Error validating update provider', errors);
	}

	public static create(object: Record<string, unknown>): UpdateProviderDTO {
		const { id, name, logo, details } = object;
		return new UpdateProviderDTO(id as string, name as string, logo as string, details as string);
	}
}
