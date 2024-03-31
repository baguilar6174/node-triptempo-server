import { type ValidationType } from '../../../../core';

export class GetTodoByIdDto {
	constructor(public readonly id: number) {}

	public static validate(dto: GetTodoByIdDto): ValidationType[] {
		const errors: ValidationType[] = [];

		const { id } = dto;

		if (!id || isNaN(Number(id))) {
			errors.push({ fields: 'id', constraint: 'Id is not a valid number' });
		}

		return errors;
	}
}
