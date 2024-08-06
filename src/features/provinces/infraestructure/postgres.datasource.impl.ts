import { prisma } from '../../shared';
import { ProvincesEntity, type ProvincesDatasource } from '../domain';

export class DatasourceImpl implements ProvincesDatasource {
	public async getAll(): Promise<ProvincesEntity[]> {
		const [data] = await Promise.all([prisma.province.findMany({ orderBy: { name: 'asc' } })]);
		return ProvincesEntity.fromDataBase(data);
	}
}
