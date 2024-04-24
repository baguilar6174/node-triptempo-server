import { type PaginationDto, type PaginationResponseEntity } from '../../../shared';
import { type CityEntity } from '../entities/city.entity';

export abstract class CitiesDatasource {
	abstract getAll(pagination: PaginationDto): Promise<PaginationResponseEntity<CityEntity[]>>;
}
