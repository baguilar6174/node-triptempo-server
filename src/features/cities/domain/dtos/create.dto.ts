import { type ValidationType, AppError, ZERO } from '../../../../core';
import { type CoreDTO } from '../../../shared';

export class CreateCityDTO implements CoreDTO<CreateCityDTO> {
	private constructor(
		public readonly id: string,
		public readonly name: string,
		public readonly provinceId: string
	) {
		this.validate(this);
	}

	public validate(dto: CreateCityDTO): void {
		const errors: ValidationType[] = [];
		const { id, name, provinceId } = dto;

		if (!id || id.length < ZERO) {
			errors.push({ fields: ['id'], constraint: 'Id is required, should be a unique' });
		}

		if (!name || name.length < ZERO) {
			errors.push({ fields: ['name'], constraint: 'Name is required' });
		}

		if (!provinceId || provinceId.length === ZERO) {
			errors.push({ fields: ['provinceId'], constraint: 'ProvinceId is required' });
		}

		if (errors.length > ZERO) throw AppError.badRequest('Error validating create provider', errors);
	}

	/**
	 * This method creates a new instance of this DTO class with the given
	 * properties from body or query parameters.
	 * @param object
	 * @returns A new instance of this DTO
	 */
	public static create(object: Record<string, unknown>): CreateCityDTO {
		const { id, name, provinceId } = object;
		return new CreateCityDTO(id as string, name as string, provinceId as string);
	}
}
