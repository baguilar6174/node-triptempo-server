import { ONE } from '../../../core';
import { type PaginationResponseEntity, type PaginationDto, prisma } from '../../shared';
import {
	type CreateProviderDto,
	type GetResultssDto,
	ProviderEntity,
	ResultEntity,
	type ProvidersDatasource
} from '../domain';

export class DatasourceImpl implements ProvidersDatasource {
	public async getResults(
		getResultsDto: GetResultssDto,
		pagination: PaginationDto
	): Promise<PaginationResponseEntity<ResultEntity[]>> {
		const { page, limit } = pagination;
		const { startCityId, endCityId } = getResultsDto;

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
			data: ResultEntity.fromDataBase(data),
			currentPage: page,
			nextPage,
			prevPage,
			total,
			totalPages
		};
	}

	public async create(dto: CreateProviderDto): Promise<ProviderEntity> {
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
