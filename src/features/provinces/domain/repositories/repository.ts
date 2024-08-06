import { type ProvincesEntity } from '../entities/province.entity';

export abstract class ProvincesRepository {
	abstract getAll(): Promise<ProvincesEntity[]>;
}
