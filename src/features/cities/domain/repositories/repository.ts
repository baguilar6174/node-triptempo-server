import { type PaginationResponseEntity, type PaginationDTO, type GetByIdDTO } from '../../../shared';
import { type CreateCityDTO } from '../dtos';
import { type CityEntity } from '../entities/city.entity';

export abstract class CitiesRepository {
	abstract getAll(pagination: PaginationDTO): Promise<PaginationResponseEntity<CityEntity[]>>;
	abstract getById(dto: GetByIdDTO): Promise<CityEntity>;
	abstract create(dto: CreateCityDTO): Promise<CityEntity>;
	abstract delete(dto: GetByIdDTO): Promise<CityEntity>;
}
