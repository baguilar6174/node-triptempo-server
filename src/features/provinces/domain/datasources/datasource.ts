import { type ProvincesEntity } from '../entities/province.entity';

export abstract class ProvincesDatasource {
	abstract getAll(): Promise<ProvincesEntity[]>;
}
