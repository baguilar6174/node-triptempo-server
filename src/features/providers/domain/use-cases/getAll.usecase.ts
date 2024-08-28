import { type ProviderEntity } from '../entities';
import { type ProvidersRepository } from '../repositories/repository';

export interface GetProvidersUseCase {
	execute: () => Promise<ProviderEntity[]>;
}

export class GetProviders implements GetProvidersUseCase {
	constructor(private readonly repository: ProvidersRepository) {}

	async execute(): Promise<ProviderEntity[]> {
		return await this.repository.getAll();
	}
}
