export class CustomError extends Error {
	private constructor(
		public readonly message: string,
		public readonly statusCode: number = 400
	) {
		super(message);
	}

	static badRequest(message: string): CustomError {
		return new CustomError(message, 400);
	}

	static unauthorized(message: string): CustomError {
		return new CustomError(message, 401);
	}

	static forbidden(message: string): CustomError {
		return new CustomError(message, 403);
	}

	static notFound(message: string): CustomError {
		return new CustomError(message, 404);
	}

	static internalServer(message: string): CustomError {
		return new CustomError(message, 500);
	}
}
