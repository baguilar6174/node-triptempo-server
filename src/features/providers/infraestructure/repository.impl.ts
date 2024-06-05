import { type PaginationResponseEntity, type PaginationDTO } from '../../shared';
import {
	type CreateProviderDTO,
	type ProviderEntity,
	type GetTripItineraryDTO,
	type ProvidersDatasource,
	type ProvidersRepository,
	type TripItinerary
} from '../domain';

export class RepositoryImpl implements ProvidersRepository {
	constructor(private readonly datasource: ProvidersDatasource) {}

	async getTripItineraries(
		dto: GetTripItineraryDTO,
		paginationDTO: PaginationDTO
	): Promise<PaginationResponseEntity<TripItinerary[]>> {
		return await this.datasource.getTripItineraries(dto, paginationDTO);
	}

	async create(dto: CreateProviderDTO): Promise<ProviderEntity> {
		return await this.datasource.create(dto);
	}
}
