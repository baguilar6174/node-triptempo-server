export class PaginationDto {
	constructor(
		public readonly page: number,
		public readonly limit: number
	) {}

	public static validate(dto: PaginationDto): string[] {
		const errors: string[] = [];

		if (isNaN(dto.page) || isNaN(dto.limit)) {
			errors.push('Page and limit must be numbers');
		}

		if (dto.page <= 0) {
			errors.push('Page must be greater than zero');
		}

		if (dto.limit <= 0) {
			errors.push('Limit must be greater than zero');
		}

		return errors;
	}
}
