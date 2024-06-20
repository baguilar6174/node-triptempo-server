import { AppError } from '../../../../core';
import { type CoreDTO } from '../../../shared';

export class GetUserDTO implements CoreDTO<GetUserDTO> {
	private constructor(
		public readonly email: string,
		public readonly id: string
	) {
		this.validate(this);
	}

	public validate(dto: GetUserDTO): void {
		const { email, id } = dto;
		if (!email && !id) throw AppError.badRequest('Either id or email must be provided');
	}

	public static create(object: Record<string, unknown>): GetUserDTO {
		const { email, id } = object;
		return new GetUserDTO(email as string, id as string);
	}
}
