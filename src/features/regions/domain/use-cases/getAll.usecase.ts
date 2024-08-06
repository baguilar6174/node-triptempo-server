import { type PaginationResponseEntity, type PaginationDTO } from '../../../shared';
import { type RegionEntity } from '../entities/region.entity';
import { type RegionsRepository } from '../repositories/repository';

export interface GetRegionsUseCase {
	execute: (pagination: PaginationDTO) => Promise<PaginationResponseEntity<RegionEntity[]>>;
}

export class GetRegions implements GetRegionsUseCase {
	constructor(private readonly repository: RegionsRepository) {}

	async execute(pagination: PaginationDTO): Promise<PaginationResponseEntity<RegionEntity[]>> {
		return await this.repository.getAll(pagination);
	}
}
