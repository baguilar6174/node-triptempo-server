import { type GetByIdDTO } from '../../../shared';
import { type CreateCityDTO } from '../dtos';
import { type CityEntity } from '../entities/city.entity';

export abstract class CitiesRepository {
	abstract getAll(): Promise<CityEntity[]>;
	abstract getById(dto: GetByIdDTO<string>): Promise<CityEntity>;
	abstract create(dto: CreateCityDTO): Promise<CityEntity>;
	abstract delete(dto: GetByIdDTO<string>): Promise<CityEntity>;
}
