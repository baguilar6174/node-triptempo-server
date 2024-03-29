export class CreateTodoDto {
	private constructor(public readonly text: string) {}

	static create(props: Record<string, unknown>): [string?, CreateTodoDto?] {
		const { text } = props;
		if (!text) return ['Text is required'];
		return [undefined, new CreateTodoDto(text as string)];
	}
}
