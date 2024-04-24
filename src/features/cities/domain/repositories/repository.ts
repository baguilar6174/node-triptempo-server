import { type PaginationResponseEntity, type PaginationDto } from '../../../shared';
import { type CityEntity } from '../entities/city.entity';

export abstract class CitiesRepository {
	abstract getAll(pagination: PaginationDto): Promise<PaginationResponseEntity<CityEntity[]>>;
}
