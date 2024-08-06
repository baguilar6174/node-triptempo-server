import { type PaginationResponseEntity, type PaginationDTO } from '../../shared';
import { type RegionsDatasource, type RegionsRepository, type RegionEntity } from '../domain';

export class RepositoryImpl implements RegionsRepository {
	constructor(private readonly datasource: RegionsDatasource) {}

	async getAll(pagination: PaginationDTO): Promise<PaginationResponseEntity<RegionEntity[]>> {
		return await this.datasource.getAll(pagination);
	}
}
