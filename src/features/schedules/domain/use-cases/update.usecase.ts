import { type UpdateScheduleDTO } from '../dtos';
import { type ScheduleEntity } from '../entities';
import { type SchedulesRepository } from '../repositories/repository';

export interface UpdateScheduleUseCase {
	execute: (dto: UpdateScheduleDTO) => Promise<ScheduleEntity>;
}

export class UpdateSchedule implements UpdateScheduleUseCase {
	constructor(private readonly repository: SchedulesRepository) {}

	async execute(dto: UpdateScheduleDTO): Promise<ScheduleEntity> {
		return await this.repository.update(dto);
	}
}
