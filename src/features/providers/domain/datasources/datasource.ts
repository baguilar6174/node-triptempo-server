import { type GetByIdDTO, type PaginationDTO, type PaginationResponseEntity } from '../../../shared';
import { type UpdateProviderDTO, type CreateProviderDTO, type GetTripItineraryDTO } from '../dtos';
import { type ProviderEntity, type TripItineraryEntity } from '../entities';

export abstract class ProvidersDatasource {
	abstract getTripItineraries(
		dto: GetTripItineraryDTO,
		paginationDTO: PaginationDTO
	): Promise<PaginationResponseEntity<TripItineraryEntity[]>>;
	abstract getAll(): Promise<ProviderEntity[]>;
	abstract getById(dto: GetByIdDTO<string>): Promise<ProviderEntity>;
	abstract create(dto: CreateProviderDTO): Promise<ProviderEntity>;
	abstract update(dto: UpdateProviderDTO): Promise<ProviderEntity>;
	abstract delete(dto: GetByIdDTO<string>): Promise<ProviderEntity>;
}
