/* eslint-disable @typescript-eslint/no-throw-literal */
export class TodoEntity {
	constructor(
		public id: number,
		public text: string,
		public completedAt?: Date | null
	) {}

	get isCompleted(): boolean {
		return !!this.completedAt;
	}

	public static fromJson(obj: Record<string, unknown>): TodoEntity {
		const { id, text, completedAt } = obj;
		if (!id) throw 'id is required';
		if (!text) throw 'text is required';
		if (completedAt) {
			const newDate = new Date(completedAt as string);
			if (isNaN(newDate.getTime())) {
				throw 'completedAt is not a valid date';
			}
		}
		return new TodoEntity(id as number, text as string, new Date(completedAt as string));
	}
}
