import { type CityEntity } from '../entities/city.entity';
import { type CitiesRepository } from '../repositories/repository';

export interface GetCitiesUseCase {
	execute: () => Promise<CityEntity[]>;
}

export class GetCities implements GetCitiesUseCase {
	constructor(private readonly repository: CitiesRepository) {}

	async execute(): Promise<CityEntity[]> {
		return await this.repository.getAll();
	}
}
