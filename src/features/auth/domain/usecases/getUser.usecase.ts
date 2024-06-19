import { type GetUserDTO } from '../dtos';
import { type UserEntity } from '../entities';
import { type AuthRepository } from '../repositories/repository';

export interface GetUserUseCase {
	execute: (dto: GetUserDTO) => Promise<UserEntity>;
}

export class GetUser implements GetUserUseCase {
	constructor(private readonly repository: AuthRepository) {}

	async execute(dto: GetUserDTO): Promise<UserEntity> {
		return await this.repository.getUser(dto);
	}
}
