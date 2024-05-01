import { type PaginationResponseEntity, type PaginationDto } from '../../../shared';
import { type GetProvidersDto } from '../dtos';
import { type ProviderEntity } from '../entities/provider.entity';

export abstract class ProvidersRepository {
	abstract getProviders(
		getProvidersDto: GetProvidersDto,
		pagination: PaginationDto
	): Promise<PaginationResponseEntity<ProviderEntity[]>>;
}
