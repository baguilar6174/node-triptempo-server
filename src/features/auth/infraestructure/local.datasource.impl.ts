import { AppError, basicEncript, basicJWT } from '../../../core';
import { prisma } from '../../shared';
import {
	type RegisterUserDTO,
	type AuthDatasource,
	UserEntity,
	AuthEntity,
	type LoginUserDTO,
	GetUserDTO
} from '../domain';

export class AuthDatasourceImpl implements AuthDatasource {
	public async register(dto: RegisterUserDTO): Promise<AuthEntity> {
		const user = await prisma.user.findUnique({ where: { email: dto.email } });
		if (user) throw AppError.badRequest('User with this email already exists');
		const createdUser = await prisma.user.create({
			data: { ...dto, password: basicEncript.hashPassword(dto.password) }
		});
		// Create the auth entity (omit the password)
		const { password, ...rest } = UserEntity.fromJson(createdUser);
		const token = basicJWT.generateToken({ id: createdUser.id });
		// ? Here you can verify if the token is created correctly before to send it to the client
		return new AuthEntity(rest, token);
	}

	public async login(dto: LoginUserDTO): Promise<AuthEntity> {
		const user = await this.getUser(GetUserDTO.create({ email: dto.email }));
		const isPasswordMatch = basicEncript.comparePassword(dto.password, user.password);
		if (!isPasswordMatch) throw AppError.badRequest('Invalid password');
		const { password, ...rest } = UserEntity.fromJson({ ...user });
		const token = basicJWT.generateToken({ id: user.id });
		// ? Here you can verify if the token is created correctly before to send it to the client
		return new AuthEntity(rest, token);
	}

	public async getUser(dto: GetUserDTO): Promise<UserEntity> {
		const user = await prisma.user.findUnique({ where: { ...dto } });
		if (!user) throw AppError.badRequest('User not found');
		return UserEntity.fromJson(user);
	}
}
