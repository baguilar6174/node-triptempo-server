import { AppError, ONE } from '../../../core';
import { type PaginationResponseEntity, type PaginationDTO, prisma, type GetByIdDTO } from '../../shared';
import {
	type CreateProviderDTO,
	type GetTripItineraryDTO,
	type ProvidersDatasource,
	type UpdateProviderDTO,
	ProviderEntity,
	TripItinerary
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

	public async getAll(dto: PaginationDTO): Promise<PaginationResponseEntity<ProviderEntity[]>> {
		const { page, limit } = dto;
		const data = await prisma.transportationProvider.findMany({ skip: (page - ONE) * limit, take: limit });

		const total = data.length;

		const totalPages = Math.ceil(total / limit);
		const nextPage = page < totalPages ? page + ONE : null;
		const prevPage = page > ONE ? page - ONE : null;

		return {
			data: data.map((todo) => ProviderEntity.fromJson(todo)),
			currentPage: page,
			nextPage,
			prevPage,
			total,
			totalPages
		};
	}

	public async getById(dto: GetByIdDTO): Promise<ProviderEntity> {
		const { id } = dto;
		const provider = await prisma.transportationProvider.findUnique({ where: { id } });
		if (!provider) throw AppError.notFound(`Provider with id ${id} not found`);
		return ProviderEntity.fromJson(provider);
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

	public async update(dto: UpdateProviderDTO): Promise<ProviderEntity> {
		const { id } = await this.getById(dto);
		const { name, logo, details } = dto;
		const provider = await prisma.transportationProvider.update({
			where: { id },
			data: { name, logo, details }
		});
		return ProviderEntity.fromJson(provider);
	}

	public async delete(dto: GetByIdDTO): Promise<ProviderEntity> {
		const { id } = await this.getById(dto);
		const provider = await prisma.transportationProvider.delete({ where: { id } });
		return ProviderEntity.fromJson(provider);
	}
}
