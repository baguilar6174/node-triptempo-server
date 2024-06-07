import { type UpdateProviderDTO } from '../dtos';
import { type ProviderEntity } from '../entities';
import { type ProvidersRepository } from '../repositories/repository';

export interface UpdateProviderUseCase {
	execute: (dto: UpdateProviderDTO) => Promise<ProviderEntity>;
}

export class UpdateProvider implements UpdateProviderUseCase {
	constructor(private readonly repository: ProvidersRepository) {}

	async execute(dto: UpdateProviderDTO): Promise<ProviderEntity> {
		return await this.repository.update(dto);
	}
}
