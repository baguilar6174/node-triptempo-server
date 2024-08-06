import { type RegionEntity } from '../entities/region.entity';

export abstract class RegionsRepository {
	abstract getAll(): Promise<RegionEntity[]>;
}
