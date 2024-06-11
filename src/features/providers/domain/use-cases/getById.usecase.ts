import { type GetByIdDTO } from '../../../shared';
import { type ProviderEntity } from '../entities';
import { type ProvidersRepository } from '../repositories/repository';

export interface GetProviderByIdUseCase {
	execute: (dto: GetByIdDTO<string>) => Promise<ProviderEntity>;
}

export class GetProviderById implements GetProviderByIdUseCase {
	constructor(private readonly repository: ProvidersRepository) {}

	async execute(dto: GetByIdDTO<string>): Promise<ProviderEntity> {
		return await this.repository.getById(dto);
	}
}
