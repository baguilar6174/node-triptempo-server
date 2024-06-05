import { type PaginationResponseEntity, type PaginationDTO } from '../../../shared';
import { type GetTripItineraryDTO } from '../dtos';
import { type TripItinerary } from '../entities';
import { type ProvidersRepository } from '../repositories/repository';

export interface GetTripItinerariesUseCase {
	execute: (
		dto: GetTripItineraryDTO,
		paginationDTO: PaginationDTO
	) => Promise<PaginationResponseEntity<TripItinerary[]>>;
}

export class GetTripItineraries implements GetTripItinerariesUseCase {
	constructor(private readonly repository: ProvidersRepository) {}

	async execute(
		dto: GetTripItineraryDTO,
		paginationDTO: PaginationDTO
	): Promise<PaginationResponseEntity<TripItinerary[]>> {
		return await this.repository.getTripItineraries(dto, paginationDTO);
	}
}
