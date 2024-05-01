import { type PaginationResponseEntity, type PaginationDto } from '../../shared';
import { type ProvidersDatasource, type ProvidersRepository, type ProviderEntity } from '../domain';
import { type GetProvidersDto } from '../domain/dtos';

export class RepositoryImpl implements ProvidersRepository {
	constructor(private readonly datasource: ProvidersDatasource) {}

	async getProviders(
		getProvidersDto: GetProvidersDto,
		pagination: PaginationDto
	): Promise<PaginationResponseEntity<ProviderEntity[]>> {
		return await this.datasource.getProviders(getProvidersDto, pagination);
	}
}
