import { type PaginationDTO, type PaginationResponseEntity } from '../../../shared';
import { type CityEntity } from '../entities/city.entity';

export abstract class CitiesDatasource {
	abstract getAll(pagination: PaginationDTO): Promise<PaginationResponseEntity<CityEntity[]>>;
}
