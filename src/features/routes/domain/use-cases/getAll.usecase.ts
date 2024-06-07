import { type PaginationResponseEntity, type PaginationDTO } from '../../../shared';
import { type RouteEntity } from '../entities';
import { type RoutesRepository } from '../repositories/repository';

export interface GetRoutesUseCase {
	execute: (dto: PaginationDTO) => Promise<PaginationResponseEntity<RouteEntity[]>>;
}

export class GetRoutes implements GetRoutesUseCase {
	constructor(private readonly repository: RoutesRepository) {}

	async execute(dto: PaginationDTO): Promise<PaginationResponseEntity<RouteEntity[]>> {
		return await this.repository.getAll(dto);
	}
}
