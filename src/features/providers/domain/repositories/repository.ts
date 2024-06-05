import { type PaginationResponseEntity, type PaginationDTO } from '../../../shared';
import { type CreateProviderDTO, type GetTripItineraryDTO } from '../dtos';
import { type ProviderEntity, type TripItinerary } from '../entities';

export abstract class ProvidersRepository {
	abstract getTripItineraries(
		dto: GetTripItineraryDTO,
		paginationDTO: PaginationDTO
	): Promise<PaginationResponseEntity<TripItinerary[]>>;
	abstract create(dto: CreateProviderDTO): Promise<ProviderEntity>;
}
