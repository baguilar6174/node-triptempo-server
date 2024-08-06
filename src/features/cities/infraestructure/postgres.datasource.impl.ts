import { AppError } from '../../../core';
import { prisma, type GetByIdDTO } from '../../shared';
import { CityEntity, type CitiesDatasource, type CreateCityDTO } from '../domain';

export class DatasourceImpl implements CitiesDatasource {
	public async getAll(): Promise<CityEntity[]> {
		const [data] = await Promise.all([prisma.city.findMany({ include: { province: { include: { region: true } } } })]);
		return CityEntity.fromDataBase(data);
	}

	public async getById(dto: GetByIdDTO<string>): Promise<CityEntity> {
		const { id } = dto;
		const city = await prisma.city.findUnique({ where: { id }, include: { province: { include: { region: true } } } });
		if (!city) throw AppError.notFound(`City with id ${id} not found`);
		return CityEntity.fromJson(city);
	}

	public async create(dto: CreateCityDTO): Promise<CityEntity> {
		const id = `${dto.provinceId}${dto.id}`;
		const { name, provinceId } = dto;
		const city = await prisma.city.create({
			data: { id, name, provinceId },
			include: { province: { include: { region: true } } }
		});
		return CityEntity.fromJson(city);
	}

	public async delete(dto: GetByIdDTO<string>): Promise<CityEntity> {
		const { id } = await this.getById(dto);
		const city = await prisma.city.delete({ where: { id }, include: { province: { include: { region: true } } } });
		return CityEntity.fromJson(city);
	}
}
