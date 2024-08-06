import { type ProvincesDatasource, type ProvincesRepository, type ProvincesEntity } from '../domain';

export class RepositoryImpl implements ProvincesRepository {
	constructor(private readonly datasource: ProvincesDatasource) {}

	async getAll(): Promise<ProvincesEntity[]> {
		return await this.datasource.getAll();
	}
}
