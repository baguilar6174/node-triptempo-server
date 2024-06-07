import { type CreateRouteDTO } from '../dtos';
import { type RouteEntity } from '../entities';
import { type RoutesRepository } from '../repositories/repository';

export interface CreateRouteUseCase {
	execute: (dto: CreateRouteDTO) => Promise<RouteEntity>;
}

export class CreateRoute implements CreateRouteUseCase {
	constructor(private readonly repository: RoutesRepository) {}

	async execute(dto: CreateRouteDTO): Promise<RouteEntity> {
		return await this.repository.create(dto);
	}
}
