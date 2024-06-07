import { type UpdateRouteDTO } from '../dtos';
import { type RouteEntity } from '../entities';
import { type RoutesRepository } from '../repositories/repository';

export interface UpdateRouteUseCase {
	execute: (dto: UpdateRouteDTO) => Promise<RouteEntity>;
}

export class UpdateRoute implements UpdateRouteUseCase {
	constructor(private readonly repository: RoutesRepository) {}

	async execute(dto: UpdateRouteDTO): Promise<RouteEntity> {
		return await this.repository.update(dto);
	}
}
