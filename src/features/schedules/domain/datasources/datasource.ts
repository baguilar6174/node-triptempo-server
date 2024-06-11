import { type GetByIdDTO } from '../../../shared';
import { type UpdateScheduleDTO, type CreateScheduleDTO } from '../dtos';
import { type ScheduleEntity } from '../entities';

export abstract class SchedulesDatasource {
	abstract getById(dto: GetByIdDTO<number>): Promise<ScheduleEntity>;
	abstract create(dto: CreateScheduleDTO): Promise<ScheduleEntity>;
	abstract update(dto: UpdateScheduleDTO): Promise<ScheduleEntity>;
	abstract delete(dto: GetByIdDTO<number>): Promise<ScheduleEntity>;
}
