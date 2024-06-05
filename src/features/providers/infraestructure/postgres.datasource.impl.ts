import { ONE } from '../../../core';
import { type PaginationResponseEntity, type PaginationDTO, prisma } from '../../shared';
import {
	type CreateProviderDTO,
	type GetTripItineraryDTO,
	ProviderEntity,
	TripItinerary,
	type ProvidersDatasource
} from '../domain';

export class DatasourceImpl implements ProvidersDatasource {
	public async getTripItineraries(
		dto: GetTripItineraryDTO,
		paginationDTO: PaginationDTO
	): Promise<PaginationResponseEntity<TripItinerary[]>> {
		const { page, limit } = paginationDTO;
		const { startCityId, endCityId } = dto;

		const data = await prisma.transportationProvider.findMany({
			skip: (page - ONE) * limit,
			take: limit,
			where: {
				routes: {
					some: {
						startCityId,
						endCityId
					}
				}
			},
			select: {
				id: true,
				name: true,
				logo: true,
				details: true,
				routes: {
					where: {
						startCityId,
						endCityId
					},
					select: {
						schedules: {
							where: {
								isAvailable: true
							},
							select: {
								id: true,
								departureTime: true
							}
						},
						estimatedTravelTime: true,
						distance: true,
						price: true
					}
				}
			}
		});

		const total = data.length;

		const totalPages = Math.ceil(total / limit);
		const nextPage = page < totalPages ? page + ONE : null;
		const prevPage = page > ONE ? page - ONE : null;

		return {
			data: TripItinerary.fromDataBase(data),
			currentPage: page,
			nextPage,
			prevPage,
			total,
			totalPages
		};
	}

	public async create(dto: CreateProviderDTO): Promise<ProviderEntity> {
		const { id, name, logo, details } = dto;
		const provider = await prisma.transportationProvider.create({
			data: {
				id,
				name,
				logo,
				details
			}
		});
		return ProviderEntity.fromJson(provider);
	}
}
