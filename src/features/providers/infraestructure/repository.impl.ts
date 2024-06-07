import { type PaginationResponseEntity, type PaginationDTO } from '../../shared';
import {
	type CreateProviderDTO,
	type ProviderEntity,
	type GetTripItineraryDTO,
	type ProvidersDatasource,
	type ProvidersRepository,
	type TripItinerary,
	type UpdateProviderDTO,
	type GetProviderByIdDTO
} from '../domain';

export class RepositoryImpl implements ProvidersRepository {
	constructor(private readonly datasource: ProvidersDatasource) {}

	async getTripItineraries(
		dto: GetTripItineraryDTO,
		paginationDTO: PaginationDTO
	): Promise<PaginationResponseEntity<TripItinerary[]>> {
		return await this.datasource.getTripItineraries(dto, paginationDTO);
	}

	async getAll(dto: PaginationDTO): Promise<PaginationResponseEntity<ProviderEntity[]>> {
		return await this.datasource.getAll(dto);
	}

	async getById(dto: GetProviderByIdDTO): Promise<ProviderEntity> {
		return await this.datasource.getById(dto);
	}

	async create(dto: CreateProviderDTO): Promise<ProviderEntity> {
		return await this.datasource.create(dto);
	}

	async update(dto: UpdateProviderDTO): Promise<ProviderEntity> {
		return await this.datasource.update(dto);
	}

	async delete(dto: GetProviderByIdDTO): Promise<ProviderEntity> {
		return await this.datasource.delete(dto);
	}
}
