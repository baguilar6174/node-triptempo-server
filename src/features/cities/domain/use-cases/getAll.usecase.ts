import { type PaginationResponseEntity, type PaginationDTO } from '../../../shared';
import { type CityEntity } from '../entities/city.entity';
import { type CitiesRepository } from '../repositories/repository';

export interface GetCitiesUseCase {
	execute: (pagination: PaginationDTO) => Promise<PaginationResponseEntity<CityEntity[]>>;
}

export class GetCities implements GetCitiesUseCase {
	constructor(private readonly repository: CitiesRepository) {}

	async execute(pagination: PaginationDTO): Promise<PaginationResponseEntity<CityEntity[]>> {
		return await this.repository.getAll(pagination);
	}
}
