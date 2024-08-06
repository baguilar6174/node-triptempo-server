import { ONE } from '../../../core';
import { type PaginationResponseEntity, type PaginationDTO, prisma } from '../../shared';
import { RegionEntity, type RegionsDatasource } from '../domain';

export class DatasourceImpl implements RegionsDatasource {
	public async getAll(pagination: PaginationDTO): Promise<PaginationResponseEntity<RegionEntity[]>> {
		const { page, limit } = pagination;

		const [total, data] = await Promise.all([
			prisma.region.count(),
			prisma.region.findMany({ skip: (page - ONE) * limit, take: limit })
		]);

		const totalPages = Math.ceil(total / limit);
		const nextPage = page < totalPages ? page + ONE : null;
		const prevPage = page > ONE ? page - ONE : null;

		return {
			data: RegionEntity.fromDataBase(data),
			currentPage: page,
			nextPage,
			prevPage,
			total,
			totalPages
		};
	}
}
