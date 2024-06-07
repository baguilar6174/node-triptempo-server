import { type GetProviderByIdDTO } from '../dtos';
import { type ProviderEntity } from '../entities';
import { type ProvidersRepository } from '../repositories/repository';

export interface GetProviderByIdUseCase {
	execute: (dto: GetProviderByIdDTO) => Promise<ProviderEntity>;
}

export class GetProviderById implements GetProviderByIdUseCase {
	constructor(private readonly repository: ProvidersRepository) {}

	async execute(dto: GetProviderByIdDTO): Promise<ProviderEntity> {
		return await this.repository.getById(dto);
	}
}
