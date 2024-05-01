import { ONE, ValidationError, ZERO } from '../../../core';
import { type PaginationResponseEntity, PaginationDto, prisma } from '../../shared';
import { ProviderEntity, type ProvidersDatasource } from '../domain';
import { GetProvidersDto } from '../domain/dtos';

export class DatasourceImpl implements ProvidersDatasource {
	public async getProviders(
		getProvidersDto: GetProvidersDto,
		pagination: PaginationDto
	): Promise<PaginationResponseEntity<ProviderEntity[]>> {
		const errorsPagination = PaginationDto.validate(pagination);
		const errors = GetProvidersDto.validate(getProvidersDto);
		// TODO: improve this way to show errors
		if (errorsPagination.length > ZERO) throw new ValidationError(errorsPagination);
		if (errors.length > ZERO) throw new ValidationError(errors);
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
						schedules: true,
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
			result: ProviderEntity.fromDataBaseList(data),
			currentPage: page,
			nextPage,
			prevPage,
			total,
			totalPages
		};
	}
}
