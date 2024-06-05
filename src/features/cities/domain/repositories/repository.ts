import { type PaginationResponseEntity, type PaginationDTO } from '../../../shared';
import { type CityEntity } from '../entities/city.entity';

export abstract class CitiesRepository {
	abstract getAll(pagination: PaginationDTO): Promise<PaginationResponseEntity<CityEntity[]>>;
}
