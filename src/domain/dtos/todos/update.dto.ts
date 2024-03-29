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

	static update(props: Record<string, unknown>): [string?, UpdateTodoDto?] {
		const { id, text, completedAt } = props;

		if (!id || isNaN(Number(id))) return ['Id is not a valid number'];

		if (completedAt) {
			const newDate = new Date(completedAt as string);
			if (newDate.toString() === 'Invalid Date') {
				return ['CompletedAt must be a valid date'];
			}
		}
		return [undefined, new UpdateTodoDto(id as number, text as string, new Date(completedAt as string))];
	}
}
