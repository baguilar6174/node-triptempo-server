import { AppError, ONE } from '../../../core';
import { type PaginationDTO, type PaginationResponseEntity, prisma, type GetByIdDTO } from '../../shared';
import { type CreateScheduleDTO, type SchedulesDatasource, type UpdateScheduleDTO, ScheduleEntity } from '../domain';

export class DatasourceImpl implements SchedulesDatasource {
	public async getAllByRouteId(
		dto: GetByIdDTO<string>,
		paginationDTO: PaginationDTO
	): Promise<PaginationResponseEntity<ScheduleEntity[]>> {
		const { id } = dto;
		const { page, limit } = paginationDTO;
		const [total, data] = await Promise.all([
			prisma.schedule.count(),
			prisma.schedule.findMany({
				skip: (page - ONE) * limit,
				take: limit,
				where: {
					routeId: id
				}
			})
		]);

		const totalPages = Math.ceil(total / limit);
		const nextPage = page < totalPages ? page + ONE : null;
		const prevPage = page > ONE ? page - ONE : null;

		return {
			data: ScheduleEntity.fromDataBase(data),
			currentPage: page,
			nextPage,
			prevPage,
			total,
			totalPages
		};
	}

	public async getById(dto: GetByIdDTO<number>): Promise<ScheduleEntity> {
		const { id } = dto;
		const data = await prisma.schedule.findUnique({ where: { id } });
		if (!data) throw AppError.notFound(`Schedule with id ${id} not found`);
		return ScheduleEntity.fromJson(data);
	}

	public async create(dto: CreateScheduleDTO): Promise<ScheduleEntity> {
		const { isAvailable = true, ...rest } = dto;
		const data = await prisma.schedule.create({ data: { ...rest, isAvailable } });
		return ScheduleEntity.fromJson(data);
	}

	// TODO: fix update method, allow update only some fields
	public async update(dto: UpdateScheduleDTO): Promise<ScheduleEntity> {
		const { id } = await this.getById(dto);
		const { routeId, departureTime, isAvailable } = dto;
		const data = await prisma.schedule.update({
			where: { id },
			data: { routeId, departureTime, isAvailable }
		});
		return ScheduleEntity.fromJson(data);
	}

	public async delete(dto: GetByIdDTO<number>): Promise<ScheduleEntity> {
		const { id } = await this.getById(dto);
		const data = await prisma.schedule.delete({ where: { id } });
		return ScheduleEntity.fromJson(data);
	}
}
