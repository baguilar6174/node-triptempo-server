import { type PaginationResponseEntity, type PaginationDto } from '../../../shared';
import { type GetProvidersDto } from '../dtos';
import { type ProviderEntity } from '../entities/provider.entity';
import { type ProvidersRepository } from '../repositories/repository';

export interface GetProvidersUseCase {
	execute: (
		getProvidersDto: GetProvidersDto,
		pagination: PaginationDto
	) => Promise<PaginationResponseEntity<ProviderEntity[]>>;
}

export class GetProviders implements GetProvidersUseCase {
	constructor(private readonly repository: ProvidersRepository) {}

	async execute(
		getProvidersDto: GetProvidersDto,
		pagination: PaginationDto
	): Promise<PaginationResponseEntity<ProviderEntity[]>> {
		return await this.repository.getProviders(getProvidersDto, pagination);
	}
}
