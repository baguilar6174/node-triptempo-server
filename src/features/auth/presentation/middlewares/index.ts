import { AuthDatasourceImpl, AuthRepositoryImpl } from '../../infraestructure';
import { AuthMiddleware } from './auth.middleware';

// * Authentication middleware
const authDatasource = new AuthDatasourceImpl();
const authRepository = new AuthRepositoryImpl(authDatasource);
export const authMiddleware = new AuthMiddleware(authRepository).validateJWT;
