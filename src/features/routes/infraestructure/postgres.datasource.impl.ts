import { AppError, ONE } from '../../../core';
import { type PaginationResponseEntity, type PaginationDTO, prisma, type GetByIdDTO } from '../../shared';
import { type CreateRouteDTO, type RoutesDatasource, type UpdateRouteDTO, RouteEntity } from '../domain';

const includeOptions = { include: { startCity: true, endCity: true, transportationProvider: true } };

export class DatasourceImpl implements RoutesDatasource {
	public async getAll(dto: PaginationDTO): Promise<PaginationResponseEntity<RouteEntity[]>> {
		const { page, limit } = dto;

		const [total, data] = await Promise.all([
			prisma.route.count(),
			prisma.route.findMany({
				skip: (page - ONE) * limit,
				take: limit,
				...includeOptions
			})
		]);

		const totalPages = Math.ceil(total / limit);
		const nextPage = page < totalPages ? page + ONE : null;
		const prevPage = page > ONE ? page - ONE : null;

		return {
			data: RouteEntity.fromDataBase(data),
			currentPage: page,
			nextPage,
			prevPage,
			total,
			totalPages
		};
	}

	public async getById(dto: GetByIdDTO<string>): Promise<RouteEntity> {
		const { id } = dto;
		const data = await prisma.route.findUnique({ where: { id }, ...includeOptions });
		if (!data) throw AppError.notFound(`Route with id ${id} not found`);
		return RouteEntity.fromJson(data);
	}

	public async create(dto: CreateRouteDTO): Promise<RouteEntity> {
		const id = `${dto.startCityId}${dto.endCityId}${dto.transportationProviderId}`;
		const data = await prisma.route.create({ data: { id, ...dto }, ...includeOptions });
		return RouteEntity.fromJson(data);
	}

	// TODO: fix update method, allow update only some fields
	public async update(dto: UpdateRouteDTO): Promise<RouteEntity> {
		const { id } = await this.getById(dto);
		const { distance, price, estimatedTravelTime } = dto;
		const data = await prisma.route.update({
			where: { id },
			data: { distance, price, estimatedTravelTime },
			...includeOptions
		});
		return RouteEntity.fromJson(data);
	}

	public async delete(dto: GetByIdDTO<string>): Promise<RouteEntity> {
		const { id } = await this.getById(dto);
		const data = await prisma.route.delete({ where: { id }, ...includeOptions });
		return RouteEntity.fromJson(data);
	}
}
