export * from './routes';

export const ZERO = 0 as const;
export const ONE = 1 as const;
export const FIVE = 5 as const;
export const SEVEN = 7 as const;
export const TEN = 10 as const;
export const FORTY = 40 as const;
export const SIXTY = 60 as const;
export const ONE_HUNDRED = 100 as const;
export const ONE_THOUSAND = 1000 as const;

export const DEV_ENVIRONMENT = 'development' as const;
export const PROD_ENVIRONMENT = 'production' as const;

export enum HttpCode {
	OK = 200,
	CREATED = 201,
	NO_CONTENT = 204,
	BAD_REQUEST = 400,
	UNAUTHORIZED = 401,
	FORBIDDEN = 403,
	NOT_FOUND = 404,
	INTERNAL_SERVER_ERROR = 500
}
