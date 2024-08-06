import { type GetByIdDTO } from '../../shared';
import { type CitiesDatasource, type CitiesRepository, type CityEntity, type CreateCityDTO } from '../domain';

export class RepositoryImpl implements CitiesRepository {
	constructor(private readonly datasource: CitiesDatasource) {}

	async getAll(): Promise<CityEntity[]> {
		return await this.datasource.getAll();
	}

	async getById(dto: GetByIdDTO<string>): Promise<CityEntity> {
		return await this.datasource.getById(dto);
	}

	async create(dto: CreateCityDTO): Promise<CityEntity> {
		return await this.datasource.create(dto);
	}

	async delete(dto: GetByIdDTO<string>): Promise<CityEntity> {
		return await this.datasource.delete(dto);
	}
}
