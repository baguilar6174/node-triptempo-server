import { type GetByIdDTO } from '../../../shared';
import { type RouteEntity } from '../entities';
import { type RoutesRepository } from '../repositories/repository';

export interface GetRouteByIdUseCase {
	execute: (dto: GetByIdDTO) => Promise<RouteEntity>;
}

export class GetRouteById implements GetRouteByIdUseCase {
	constructor(private readonly repository: RoutesRepository) {}

	async execute(dto: GetByIdDTO): Promise<RouteEntity> {
		return await this.repository.getById(dto);
	}
}
