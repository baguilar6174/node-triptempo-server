import { type GetByIdDTO } from '../../../shared';
import { type RouteEntity } from '../entities';
import { type RoutesRepository } from '../repositories/repository';

export interface DeleteRouteByIdUseCase {
	execute: (dto: GetByIdDTO<string>) => Promise<RouteEntity>;
}

export class DeleteRoute implements DeleteRouteByIdUseCase {
	constructor(private readonly repository: RoutesRepository) {}

	async execute(dto: GetByIdDTO<string>): Promise<RouteEntity> {
		return await this.repository.delete(dto);
	}
}
