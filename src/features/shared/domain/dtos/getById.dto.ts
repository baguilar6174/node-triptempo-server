import { type ValidationType, ZERO, AppError } from '../../../../core';
import { type CoreDTO } from '../..';

export class GetByIdDTO implements CoreDTO<GetByIdDTO> {
	private constructor(public readonly id: string) {
		this.validate(this);
	}

	public validate(dto: GetByIdDTO): void {
		const errors: ValidationType[] = [];

		const { id } = dto;

		if (!id || id.length < ZERO) {
			errors.push({ fields: ['id'], constraint: 'Id is not a valid value' });
		}

		if (errors.length > ZERO) throw AppError.badRequest('Error validating get by id', errors);
	}

	public static create(object: Record<string, unknown>): GetByIdDTO {
		const { id } = object;
		return new GetByIdDTO(id as string);
	}
}
