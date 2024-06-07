import { type ValidationType, ZERO, AppError } from '../../../../core';
import { type CoreDTO } from '../../../shared';

export class GetProviderByIdDTO implements CoreDTO<GetProviderByIdDTO> {
	private constructor(public readonly id: string) {
		this.validate(this);
	}

	public validate(dto: GetProviderByIdDTO): void {
		const errors: ValidationType[] = [];

		const { id } = dto;

		if (!id || id.length < ZERO) {
			errors.push({ fields: ['id'], constraint: 'Id is not a valid value' });
		}

		if (errors.length > ZERO) throw AppError.badRequest('Error validating get provider by id', errors);
	}

	public static create(object: Record<string, unknown>): GetProviderByIdDTO {
		const { id } = object;
		return new GetProviderByIdDTO(id as string);
	}
}
