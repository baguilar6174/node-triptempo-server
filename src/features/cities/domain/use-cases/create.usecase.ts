import { type CreateCityDTO } from '../dtos';
import { type CityEntity } from '../entities/city.entity';
import { type CitiesRepository } from '../repositories/repository';

export interface CreateCityUseCase {
	execute: (dto: CreateCityDTO) => Promise<CityEntity>;
}

export class CreateCity implements CreateCityUseCase {
	constructor(private readonly repository: CitiesRepository) {}

	async execute(dto: CreateCityDTO): Promise<CityEntity> {
		return await this.repository.create(dto);
	}
}
