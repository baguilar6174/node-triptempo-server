import { type ValidationType, AppError, ZERO } from '../../../../core';
import { type CoreDTO } from '../../../shared';

export class CreateProviderDTO implements CoreDTO<CreateProviderDTO> {
	private constructor(
		public readonly id: string,
		public readonly name: string,
		public readonly logo: string | null,
		public readonly details: string | null
	) {
		this.validate(this);
	}

	public validate(dto: CreateProviderDTO): void {
		const errors: ValidationType[] = [];
		const { id, name } = dto;

		if (!id || id.length < ZERO) {
			errors.push({ fields: ['id'], constraint: 'Id is required, should be a unique' });
		}

		if (!name || name.length < ZERO) {
			errors.push({ fields: ['name'], constraint: 'Name is required' });
		}

		if (errors.length > ZERO) throw AppError.badRequest('Error validating create provider', errors);
	}

	/**
	 * This method creates a new instance of this DTO class with the given
	 * properties from body or query parameters.
	 * @param object
	 * @returns A new instance of this DTO
	 */
	public static create(object: Record<string, unknown>): CreateProviderDTO {
		const { id, name, logo, details } = object;
		return new CreateProviderDTO(id as string, name as string, logo as string | null, details as string | null);
	}
}
