import { type RouteEntity } from '../entities';
import { type RoutesRepository } from '../repositories/repository';

export interface GetRoutesUseCase {
	execute: () => Promise<RouteEntity[]>;
}

export class GetRoutes implements GetRoutesUseCase {
	constructor(private readonly repository: RoutesRepository) {}

	async execute(): Promise<RouteEntity[]> {
		return await this.repository.getAll();
	}
}
