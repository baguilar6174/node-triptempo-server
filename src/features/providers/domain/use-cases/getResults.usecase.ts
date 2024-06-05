import { type PaginationResponseEntity, type PaginationDto } from '../../../shared';
import { type GetResultssDto } from '../dtos';
import { type ResultEntity } from '../entities';
import { type ProvidersRepository } from '../repositories/repository';

export interface GetResultsUseCase {
	execute: (
		getResultsDto: GetResultssDto,
		pagination: PaginationDto
	) => Promise<PaginationResponseEntity<ResultEntity[]>>;
}

export class GetResults implements GetResultsUseCase {
	constructor(private readonly repository: ProvidersRepository) {}

	async execute(
		getResultsDto: GetResultssDto,
		pagination: PaginationDto
	): Promise<PaginationResponseEntity<ResultEntity[]>> {
		return await this.repository.getResults(getResultsDto, pagination);
	}
}
