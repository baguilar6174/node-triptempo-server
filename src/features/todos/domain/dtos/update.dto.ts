export class UpdateTodoDto {
	private constructor(
		public readonly id: number,
		public readonly text?: string,
		public readonly completedAt?: Date
	) {}

	get values(): Record<string, unknown> {
		const obj: Record<string, unknown> = {};
		if (this.text) obj.text = this.text;
		if (this.completedAt) obj.completedAt = this.completedAt;
		return obj;
	}

	public static validate(dto: UpdateTodoDto): string[] {
		const errors: string[] = [];

		const { id, completedAt } = dto;

		if (!id || isNaN(Number(id))) {
			errors.push('Id is not a valid number');
		}

		if (completedAt) {
			const newDate = new Date(completedAt);
			if (newDate.toString() === 'Invalid Date') {
				errors.push('CompletedAt must be a valid date');
			}
		}

		return errors;
	}

	public static create(props: Record<string, unknown>): UpdateTodoDto {
		const { id, text, completedAt } = props;
		return new UpdateTodoDto(id as number, text as string, new Date(completedAt as string));
	}
}