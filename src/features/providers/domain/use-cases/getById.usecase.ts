import { type GetByIdDTO } from '../../../shared';
import { type ProviderEntity } from '../entities';
import { type ProvidersRepository } from '../repositories/repository';

export interface GetProviderByIdUseCase {
	execute: (dto: GetByIdDTO) => Promise<ProviderEntity>;
}

export class GetProviderById implements GetProviderByIdUseCase {
	constructor(private readonly repository: ProvidersRepository) {}

	async execute(dto: GetByIdDTO): Promise<ProviderEntity> {
		return await this.repository.getById(dto);
	}
}
