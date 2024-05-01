import { type PaginationDto, type PaginationResponseEntity } from '../../../shared';
import { type GetProvidersDto } from '../dtos';
import { type ProviderEntity } from '../entities/provider.entity';

export abstract class ProvidersDatasource {
	abstract getProviders(
		getProvidersDto: GetProvidersDto,
		pagination: PaginationDto
	): Promise<PaginationResponseEntity<ProviderEntity[]>>;
}
