import { type PaginationResponseEntity, type PaginationDTO } from '../../shared';
import { type CitiesDatasource, type CitiesRepository, type CityEntity } from '../domain';

export class RepositoryImpl implements CitiesRepository {
	constructor(private readonly datasource: CitiesDatasource) {}

	async getAll(pagination: PaginationDTO): Promise<PaginationResponseEntity<CityEntity[]>> {
		return await this.datasource.getAll(pagination);
	}
}
