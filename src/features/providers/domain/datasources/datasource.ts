import { type PaginationDTO, type PaginationResponseEntity } from '../../../shared';
import {
	type UpdateProviderDTO,
	type CreateProviderDTO,
	type GetTripItineraryDTO,
	type GetProviderByIdDTO
} from '../dtos';
import { type ProviderEntity, type TripItinerary } from '../entities';

export abstract class ProvidersDatasource {
	abstract getTripItineraries(
		dto: GetTripItineraryDTO,
		paginationDTO: PaginationDTO
	): Promise<PaginationResponseEntity<TripItinerary[]>>;
	abstract getAll(dto: PaginationDTO): Promise<PaginationResponseEntity<ProviderEntity[]>>;
	abstract getById(dto: GetProviderByIdDTO): Promise<ProviderEntity>;
	abstract create(dto: CreateProviderDTO): Promise<ProviderEntity>;
	abstract update(dto: UpdateProviderDTO): Promise<ProviderEntity>;
	abstract delete(dto: GetProviderByIdDTO): Promise<ProviderEntity>;
}
