interface SuccessResponse<T> {
	data?: T;
}

interface ErrorResponse {
	errors: string[];
}

export type ServerResponse<T> = SuccessResponse<T> | ErrorResponse;
