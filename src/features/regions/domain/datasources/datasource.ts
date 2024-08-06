import { type RegionEntity } from '../entities/region.entity';

export abstract class RegionsDatasource {
	abstract getAll(): Promise<RegionEntity[]>;
}
