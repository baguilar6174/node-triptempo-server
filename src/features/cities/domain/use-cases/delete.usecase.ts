import { type GetByIdDTO } from '../../../shared';
import { type CityEntity } from '../entities/city.entity';
import { type CitiesRepository } from '../repositories/repository';

export interface DeleteCityByIdUseCase {
	execute: (dto: GetByIdDTO<string>) => Promise<CityEntity>;
}

export class DeleteCity implements DeleteCityByIdUseCase {
	constructor(private readonly repository: CitiesRepository) {}

	async execute(dto: GetByIdDTO<string>): Promise<CityEntity> {
		return await this.repository.delete(dto);
	}
}
