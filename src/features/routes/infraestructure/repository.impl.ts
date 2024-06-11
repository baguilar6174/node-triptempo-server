import { type PaginationResponseEntity, type PaginationDTO, type GetByIdDTO } from '../../shared';
import {
	type CreateRouteDTO,
	type RouteEntity,
	type RoutesDatasource,
	type RoutesRepository,
	type UpdateRouteDTO
} from '../domain';

export class RepositoryImpl implements RoutesRepository {
	constructor(private readonly datasource: RoutesDatasource) {}

	async getAll(dto: PaginationDTO): Promise<PaginationResponseEntity<RouteEntity[]>> {
		return await this.datasource.getAll(dto);
	}

	async getById(dto: GetByIdDTO<string>): Promise<RouteEntity> {
		return await this.datasource.getById(dto);
	}

	async create(dto: CreateRouteDTO): Promise<RouteEntity> {
		return await this.datasource.create(dto);
	}

	async update(dto: UpdateRouteDTO): Promise<RouteEntity> {
		return await this.datasource.update(dto);
	}

	async delete(dto: GetByIdDTO<string>): Promise<RouteEntity> {
		return await this.datasource.delete(dto);
	}
}
