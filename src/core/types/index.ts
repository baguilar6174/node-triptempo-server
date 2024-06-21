import { type ParamsDictionary } from 'express-serve-static-core';
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

export type Params = ParamsDictionary & {
	id: string;
};

export interface RequestQuery {
	page: string;
	limit: string;
}
