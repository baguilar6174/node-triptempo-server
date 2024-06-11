import { AppError } from '../../../core';
import { prisma, type GetByIdDTO } from '../../shared';
import { type CreateScheduleDTO, type SchedulesDatasource, type UpdateScheduleDTO, ScheduleEntity } from '../domain';

export class DatasourceImpl implements SchedulesDatasource {
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
