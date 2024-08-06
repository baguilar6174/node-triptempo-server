import { type PaginationDTO, type PaginationResponseEntity } from '../../../shared';
import { type RegionEntity } from '../entities/region.entity';

export abstract class RegionsDatasource {
	abstract getAll(pagination: PaginationDTO): Promise<PaginationResponseEntity<RegionEntity[]>>;
}
