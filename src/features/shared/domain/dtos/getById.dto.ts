import { type ValidationType, ZERO, AppError } from '../../../../core';
import { type CoreDTO } from '../..';

export class GetByIdDTO<T> implements CoreDTO<GetByIdDTO<T>> {
	private constructor(public readonly id: T) {
		this.validate(this);
	}

	public validate(dto: GetByIdDTO<T>): void {
		const errors: ValidationType[] = [];

		const { id } = dto;

		if (!id) {
			throw AppError.badRequest('This entity requires an id', [{ constraint: 'id is required', fields: ['id'] }]);
		}

		if (typeof id === 'string' && id.length < ZERO) {
			throw AppError.badRequest('This entity requires an id', [{ constraint: 'id must be a string', fields: ['id'] }]);
		}

		if (typeof id === 'number' && isNaN(Number(id))) {
			throw AppError.badRequest('This entity requires an id', [{ constraint: 'id must be a number', fields: ['id'] }]);
		}

		if (errors.length > ZERO) throw AppError.badRequest('Error validating get by id', errors);
	}

	public static create<T>(object: Record<string, unknown>): GetByIdDTO<T> {
		const { id } = object;
		return new GetByIdDTO(id as T);
	}
}
