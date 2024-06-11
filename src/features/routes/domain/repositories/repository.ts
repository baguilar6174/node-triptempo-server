import { type PaginationResponseEntity, type PaginationDTO, type GetByIdDTO } from '../../../shared';
import { type UpdateRouteDTO, type CreateRouteDTO } from '../dtos';
import { type RouteEntity } from '../entities';

export abstract class RoutesRepository {
	abstract getAll(dto: PaginationDTO): Promise<PaginationResponseEntity<RouteEntity[]>>;
	abstract getById(dto: GetByIdDTO<string>): Promise<RouteEntity>;
	abstract create(dto: CreateRouteDTO): Promise<RouteEntity>;
	abstract update(dto: UpdateRouteDTO): Promise<RouteEntity>;
	abstract delete(dto: GetByIdDTO<string>): Promise<RouteEntity>;
}
