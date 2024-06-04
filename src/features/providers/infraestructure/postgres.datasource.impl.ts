import { ONE } from '../../../core';
import { type PaginationResponseEntity, type PaginationDto, prisma } from '../../shared';
import { ProviderEntity, type ProvidersDatasource } from '../domain';
import { type GetProvidersDto } from '../domain/dtos';

export class DatasourceImpl implements ProvidersDatasource {
	public async getProviders(
		getProvidersDto: GetProvidersDto,
		pagination: PaginationDto
	): Promise<PaginationResponseEntity<ProviderEntity[]>> {
		const { page, limit } = pagination;
		const { startCityId, endCityId } = getProvidersDto;

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
			data: ProviderEntity.fromDataBase(data),
			currentPage: page,
			nextPage,
			prevPage,
			total,
			totalPages
		};
	}
}
