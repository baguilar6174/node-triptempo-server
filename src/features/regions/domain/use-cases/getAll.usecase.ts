import { type RegionEntity } from '../entities/region.entity';
import { type RegionsRepository } from '../repositories/repository';

export interface GetRegionsUseCase {
	execute: () => Promise<RegionEntity[]>;
}

export class GetRegions implements GetRegionsUseCase {
	constructor(private readonly repository: RegionsRepository) {}

	async execute(): Promise<RegionEntity[]> {
		return await this.repository.getAll();
	}
}
