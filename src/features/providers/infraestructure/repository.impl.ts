import { type PaginationResponseEntity, type PaginationDTO, type GetByIdDTO } from '../../shared';
import {
	type CreateProviderDTO,
	type ProviderEntity,
	type GetTripItineraryDTO,
	type ProvidersDatasource,
	type ProvidersRepository,
	type TripItineraryEntity,
	type UpdateProviderDTO
} from '../domain';

export class RepositoryImpl implements ProvidersRepository {
	constructor(private readonly datasource: ProvidersDatasource) {}

	async getTripItineraries(
		dto: GetTripItineraryDTO,
		paginationDTO: PaginationDTO
	): Promise<PaginationResponseEntity<TripItineraryEntity[]>> {
		return await this.datasource.getTripItineraries(dto, paginationDTO);
	}

	async getAll(): Promise<ProviderEntity[]> {
		return await this.datasource.getAll();
	}

	async getById(dto: GetByIdDTO<string>): Promise<ProviderEntity> {
		return await this.datasource.getById(dto);
	}

	async create(dto: CreateProviderDTO): Promise<ProviderEntity> {
		return await this.datasource.create(dto);
	}

	async update(dto: UpdateProviderDTO): Promise<ProviderEntity> {
		return await this.datasource.update(dto);
	}

	async delete(dto: GetByIdDTO<string>): Promise<ProviderEntity> {
		return await this.datasource.delete(dto);
	}
}
