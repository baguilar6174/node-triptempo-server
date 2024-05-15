import { ONE } from '../../../core';
import { type PaginationResponseEntity, type PaginationDto, prisma } from '../../shared';
import { CityEntity, type CitiesDatasource } from '../domain';

export class DatasourceImpl implements CitiesDatasource {
	public async getAll(pagination: PaginationDto): Promise<PaginationResponseEntity<CityEntity[]>> {
		const { page, limit } = pagination;

		const [total, data] = await Promise.all([
			prisma.city.count(),
			prisma.city.findMany({
				skip: (page - ONE) * limit,
				take: limit,
				include: {
					province: {
						include: {
							region: true
						}
					}
				}
			})
		]);

		const totalPages = Math.ceil(total / limit);
		const nextPage = page < totalPages ? page + ONE : null;
		const prevPage = page > ONE ? page - ONE : null;

		return {
			data: CityEntity.fromDataBase(data),
			currentPage: page,
			nextPage,
			prevPage,
			total,
			totalPages
		};
	}
}
