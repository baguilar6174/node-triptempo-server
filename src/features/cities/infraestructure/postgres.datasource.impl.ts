import { AppError, ONE } from '../../../core';
import { type PaginationResponseEntity, type PaginationDTO, prisma, type GetByIdDTO } from '../../shared';
import { CityEntity, type CitiesDatasource, type CreateCityDTO } from '../domain';

export class DatasourceImpl implements CitiesDatasource {
	public async getAll(pagination: PaginationDTO): Promise<PaginationResponseEntity<CityEntity[]>> {
		const { page, limit } = pagination;

		const [total, data] = await Promise.all([
			prisma.city.count(),
			prisma.city.findMany({
				skip: (page - ONE) * limit,
				take: limit,
				include: {
					province: {
						include: {
							region: true
						}
					}
				}
			})
		]);

		const totalPages = Math.ceil(total / limit);
		const nextPage = page < totalPages ? page + ONE : null;
		const prevPage = page > ONE ? page - ONE : null;

		return {
			data: CityEntity.fromDataBase(data),
			currentPage: page,
			nextPage,
			prevPage,
			total,
			totalPages
		};
	}

	public async getById(dto: GetByIdDTO): Promise<CityEntity> {
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

	public async delete(dto: GetByIdDTO): Promise<CityEntity> {
		const { id } = await this.getById(dto);
		const city = await prisma.city.delete({ where: { id }, include: { province: { include: { region: true } } } });
		return CityEntity.fromJson(city);
	}
}
