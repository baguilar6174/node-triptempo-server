export interface ValidationType {
	fields: string[];
	constraint: string;
}

export interface SuccessResponse<T> {
	result: T;
}

export interface ErrorResponse {
	name: string;
	message: string;
	validationErrors?: ValidationType[];
	stack?: string;
}
