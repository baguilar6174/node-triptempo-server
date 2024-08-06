import { type RegionsDatasource, type RegionsRepository, type RegionEntity } from '../domain';

export class RepositoryImpl implements RegionsRepository {
	constructor(private readonly datasource: RegionsDatasource) {}

	async getAll(): Promise<RegionEntity[]> {
		return await this.datasource.getAll();
	}
}
