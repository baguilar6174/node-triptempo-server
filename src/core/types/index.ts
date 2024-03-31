export interface ValidationType {
	fields: string | string[];
	constraint: string;
}

interface SuccessResponse<T> {
	data?: T;
}

interface ErrorResponse {
	errors: ValidationType[];
}

export type ServerResponse<T> = SuccessResponse<T> | ErrorResponse;
