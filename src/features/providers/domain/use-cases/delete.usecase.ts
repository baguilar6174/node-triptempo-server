import { type GetByIdDTO } from '../../../shared';
import { type ProviderEntity } from '../entities';
import { type ProvidersRepository } from '../repositories/repository';

export interface DeleteProviderByIdUseCase {
	execute: (dto: GetByIdDTO<string>) => Promise<ProviderEntity>;
}

export class DeleteProvider implements DeleteProviderByIdUseCase {
	constructor(private readonly repository: ProvidersRepository) {}

	async execute(dto: GetByIdDTO<string>): Promise<ProviderEntity> {
		return await this.repository.delete(dto);
	}
}
