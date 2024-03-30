export class CreateTodoDto {
	constructor(public readonly text: string) {}

	public static validate(dto: CreateTodoDto): string[] {
		const errors: string[] = [];

		if (!dto.text) {
			errors.push('Text is required');
		}

		return errors;
	}
}
