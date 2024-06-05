export abstract class CoreDTO<T> {
	abstract validate(dto: T): void;
}
