import { prisma } from '../../shared';
import { RegionEntity, type RegionsDatasource } from '../domain';

export class DatasourceImpl implements RegionsDatasource {
	public async getAll(): Promise<RegionEntity[]> {
		const [data] = await Promise.all([prisma.region.findMany({ orderBy: { name: 'asc' } })]);
		return RegionEntity.fromDataBase(data);
	}
}
