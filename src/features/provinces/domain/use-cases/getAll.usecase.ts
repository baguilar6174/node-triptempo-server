import { type ProvincesEntity } from '../entities/province.entity';
import { type ProvincesRepository } from '../repositories/repository';

export interface GetProvincesUseCase {
	execute: () => Promise<ProvincesEntity[]>;
}

export class GetProvinces implements GetProvincesUseCase {
	constructor(private readonly repository: ProvincesRepository) {}

	async execute(): Promise<ProvincesEntity[]> {
		return await this.repository.getAll();
	}
}
