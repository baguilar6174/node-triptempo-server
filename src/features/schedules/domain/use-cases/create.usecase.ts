import { type CreateScheduleDTO } from '../dtos';
import { type ScheduleEntity } from '../entities';
import { type SchedulesRepository } from '../repositories/repository';

export interface CreateScheduleUseCase {
	execute: (dto: CreateScheduleDTO) => Promise<ScheduleEntity>;
}

export class CreateSchedule implements CreateScheduleUseCase {
	constructor(private readonly repository: SchedulesRepository) {}

	async execute(dto: CreateScheduleDTO): Promise<ScheduleEntity> {
		return await this.repository.create(dto);
	}
}
