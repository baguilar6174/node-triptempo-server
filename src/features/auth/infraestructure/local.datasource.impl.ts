import { AppError, bcryptAdapter, jsonwebtokenAdapter } from '../../../core';
import { prisma } from '../../shared';
import {
	type RegisterUserDTO,
	type AuthDatasource,
	UserEntity,
	AuthEntity,
	type LoginUserDTO,
	type GetUserDTO
} from '../domain';

export class AuthDatasourceImpl implements AuthDatasource {
	public async register(dto: RegisterUserDTO): Promise<AuthEntity> {
		const user = await prisma.user.findUnique({ where: { email: dto.email } });
		if (user) throw AppError.badRequest('User with this email already exists');
		const createdUser = await prisma.user.create({
			data: { ...dto, password: bcryptAdapter.hash(dto.password) }
		});
		// Create the auth entity (omit the password)
		const { password, ...rest } = UserEntity.fromJson(createdUser);
		const token = await jsonwebtokenAdapter.generateToken({ id: createdUser.id });
		if (!token) throw AppError.internalServer('Error generating token');
		return new AuthEntity(rest, token);
	}

	public async login(dto: LoginUserDTO): Promise<AuthEntity> {
		const user = await prisma.user.findUnique({ where: { email: dto.email } });
		if (!user) throw AppError.badRequest('Invalid credentials');
		const isPasswordMatch = bcryptAdapter.comparePassword(dto.password, user.password);
		if (!isPasswordMatch) throw AppError.badRequest('Invalid credentials');
		const { password, ...rest } = UserEntity.fromJson(user);
		const token = await jsonwebtokenAdapter.generateToken({ id: user.id });
		if (!token) throw AppError.internalServer('Error generating token');
		return new AuthEntity(rest, token);
	}

	public async getUser(dto: GetUserDTO): Promise<UserEntity> {
		const user = await prisma.user.findUnique({ where: { ...dto } });
		if (!user) throw AppError.badRequest('User not found');
		return UserEntity.fromJson(user);
	}
}
