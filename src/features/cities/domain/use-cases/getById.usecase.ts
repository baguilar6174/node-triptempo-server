import { type GetByIdDTO } from '../../../shared';
import { type CityEntity } from '../entities/city.entity';
import { type CitiesRepository } from '../repositories/repository';

export interface GetCityByIdUseCase {
	execute: (dto: GetByIdDTO<string>) => Promise<CityEntity>;
}

export class GetCityById implements GetCityByIdUseCase {
	constructor(private readonly repository: CitiesRepository) {}

	async execute(dto: GetByIdDTO<string>): Promise<CityEntity> {
		return await this.repository.getById(dto);
	}
}
