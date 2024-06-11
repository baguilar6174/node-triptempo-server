import { type PaginationResponseEntity, type PaginationDTO, type GetByIdDTO } from '../../../shared';
import { type ScheduleEntity } from '../entities';
import { type SchedulesRepository } from '../repositories/repository';

export interface GetSchedulesByRouteIdUseCase {
	execute: (
		dto: GetByIdDTO<string>,
		paginationDTO: PaginationDTO
	) => Promise<PaginationResponseEntity<ScheduleEntity[]>>;
}

export class GetSchedulesByRouteId implements GetSchedulesByRouteIdUseCase {
	constructor(private readonly repository: SchedulesRepository) {}

	async execute(
		dto: GetByIdDTO<string>,
		paginationDTO: PaginationDTO
	): Promise<PaginationResponseEntity<ScheduleEntity[]>> {
		return await this.repository.getAllByRouteId(dto, paginationDTO);
	}
}
