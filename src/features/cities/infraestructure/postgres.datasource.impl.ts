import { ONE, ValidationError, ZERO } from '../../../core';
import { type PaginationResponseEntity, PaginationDto, prisma } from '../../shared';
import { CityEntity, type CitiesDatasource } from '../domain';

export class DatasourceImpl implements CitiesDatasource {
	public async getAll(pagination: PaginationDto): Promise<PaginationResponseEntity<CityEntity[]>> {
		const errors = PaginationDto.validate(pagination);
		if (errors.length > ZERO) throw new ValidationError(errors);
		const { page, limit } = pagination;
		const [total, cities] = await Promise.all([
			prisma.city.count(),
			prisma.city.findMany({
				skip: (page - ONE) * limit,
				take: limit
			})
		]);

		const totalPages = Math.ceil(total / limit);
		const nextPage = page < totalPages ? page + ONE : null;
		const prevPage = page > ONE ? page - ONE : null;

		return {
			results: cities.map((city) => CityEntity.fromJson(city)),
			currentPage: page,
			nextPage,
			prevPage,
			total,
			totalPages
		};
	}
}
