import { type CreateProviderDTO } from '../dtos';
import { type ProviderEntity } from '../entities';
import { type ProvidersRepository } from '../repositories/repository';

export interface CreateProviderUseCase {
	execute: (dto: CreateProviderDTO) => Promise<ProviderEntity>;
}

export class CreateProvider implements CreateProviderUseCase {
	constructor(private readonly repository: ProvidersRepository) {}

	async execute(dto: CreateProviderDTO): Promise<ProviderEntity> {
		return await this.repository.create(dto);
	}
}
