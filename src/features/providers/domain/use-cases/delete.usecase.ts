import { type GetProviderByIdDTO } from '../dtos';
import { type ProviderEntity } from '../entities';
import { type ProvidersRepository } from '../repositories/repository';

export interface DeleteProviderByIdUseCase {
	execute: (dto: GetProviderByIdDTO) => Promise<ProviderEntity>;
}

export class DeleteProvider implements DeleteProviderByIdUseCase {
	constructor(private readonly repository: ProvidersRepository) {}

	async execute(dto: GetProviderByIdDTO): Promise<ProviderEntity> {
		return await this.repository.delete(dto);
	}
}
