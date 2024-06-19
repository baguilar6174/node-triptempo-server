import {
	type RegisterUserDTO,
	type AuthRepository,
	type AuthEntity,
	type AuthDatasource,
	type LoginUserDTO,
	type UserEntity,
	type GetUserDTO
} from '../domain';

export class AuthRepositoryImpl implements AuthRepository {
	constructor(private readonly datasource: AuthDatasource) {}

	public async register(dto: RegisterUserDTO): Promise<AuthEntity> {
		return await this.datasource.register(dto);
	}

	public async login(dto: LoginUserDTO): Promise<AuthEntity> {
		return await this.datasource.login(dto);
	}

	public async getUser(dto: GetUserDTO): Promise<UserEntity> {
		return await this.datasource.getUser(dto);
	}
}
