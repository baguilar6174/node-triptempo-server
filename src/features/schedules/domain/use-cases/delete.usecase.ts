import { type GetByIdDTO } from '../../../shared';
import { type ScheduleEntity } from '../entities';
import { type SchedulesRepository } from '../repositories/repository';

export interface DeleteScheduleByIdUseCase {
	execute: (dto: GetByIdDTO<number>) => Promise<ScheduleEntity>;
}

export class DeleteSchedule implements DeleteScheduleByIdUseCase {
	constructor(private readonly repository: SchedulesRepository) {}

	async execute(dto: GetByIdDTO<number>): Promise<ScheduleEntity> {
		return await this.repository.delete(dto);
	}
}
