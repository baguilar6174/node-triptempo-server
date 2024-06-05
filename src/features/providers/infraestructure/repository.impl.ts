import { type PaginationResponseEntity, type PaginationDto } from '../../shared';
import {
	type CreateProviderDto,
	type ProviderEntity,
	type GetResultssDto,
	type ProvidersDatasource,
	type ProvidersRepository,
	type ResultEntity
} from '../domain';

export class RepositoryImpl implements ProvidersRepository {
	constructor(private readonly datasource: ProvidersDatasource) {}

	async getResults(
		getResultsDto: GetResultssDto,
		pagination: PaginationDto
	): Promise<PaginationResponseEntity<ResultEntity[]>> {
		return await this.datasource.getResults(getResultsDto, pagination);
	}

	async create(dto: CreateProviderDto): Promise<ProviderEntity> {
		return await this.datasource.create(dto);
	}
}
