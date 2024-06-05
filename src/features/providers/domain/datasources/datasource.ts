import { type PaginationDto, type PaginationResponseEntity } from '../../../shared';
import { type CreateProviderDto, type GetResultssDto } from '../dtos';
import { type ProviderEntity, type ResultEntity } from '../entities';

export abstract class ProvidersDatasource {
	abstract getResults(
		getResultsDto: GetResultssDto,
		pagination: PaginationDto
	): Promise<PaginationResponseEntity<ResultEntity[]>>;

	abstract create(dto: CreateProviderDto): Promise<ProviderEntity>;
}
