import { type PaginationDTO, type PaginationResponseEntity } from '../../../shared';
import { type CreateProviderDTO, type GetTripItineraryDTO } from '../dtos';
import { type ProviderEntity, type TripItinerary } from '../entities';

export abstract class ProvidersDatasource {
	abstract getTripItineraries(
		dto: GetTripItineraryDTO,
		paginationDTO: PaginationDTO
	): Promise<PaginationResponseEntity<TripItinerary[]>>;

	abstract create(dto: CreateProviderDTO): Promise<ProviderEntity>;
}
