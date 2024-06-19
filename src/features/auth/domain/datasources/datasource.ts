import { type GetUserDTO, type LoginUserDTO, type RegisterUserDTO } from '../dtos';
import { type UserEntity, type AuthEntity } from '../entities';

export abstract class AuthDatasource {
	abstract register(dto: RegisterUserDTO): Promise<AuthEntity>;
	abstract login(dto: LoginUserDTO): Promise<AuthEntity>;
	abstract getUser(dto: GetUserDTO): Promise<UserEntity>;
}
