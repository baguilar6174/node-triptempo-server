import { type GetByIdDTO } from '../../../shared';
import { type ScheduleEntity } from '../entities';
import { type SchedulesRepository } from '../repositories/repository';

export interface GetScheduleByIdUseCase {
	execute: (dto: GetByIdDTO<number>) => Promise<ScheduleEntity>;
}

export class GetScheduleById implements GetScheduleByIdUseCase {
	constructor(private readonly repository: SchedulesRepository) {}

	async execute(dto: GetByIdDTO<number>): Promise<ScheduleEntity> {
		return await this.repository.getById(dto);
	}
}
