import { type PaginationResponseEntity, type PaginationDTO } from '../../../shared';
import { type ProviderEntity } from '../entities';
import { type ProvidersRepository } from '../repositories/repository';

export interface GetProvidersUseCase {
	execute: (dto: PaginationDTO) => Promise<PaginationResponseEntity<ProviderEntity[]>>;
}

export class GetProviders implements GetProvidersUseCase {
	constructor(private readonly repository: ProvidersRepository) {}

	async execute(dto: PaginationDTO): Promise<PaginationResponseEntity<ProviderEntity[]>> {
		return await this.repository.getAll(dto);
	}
}
