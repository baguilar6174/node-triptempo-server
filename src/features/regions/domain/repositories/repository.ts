import { type PaginationResponseEntity, type PaginationDTO } from '../../../shared';
import { type RegionEntity } from '../entities/region.entity';

export abstract class RegionsRepository {
	abstract getAll(pagination: PaginationDTO): Promise<PaginationResponseEntity<RegionEntity[]>>;
}
