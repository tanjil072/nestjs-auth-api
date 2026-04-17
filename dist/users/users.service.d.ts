import { User } from '../types/user.interface';
export declare class UsersService {
    private users;
    private refreshTokens;
    findByEmail(email: string): Promise<User | undefined>;
    findById(id: string): Promise<User | undefined>;
    create(userData: Omit<User, 'id' | 'role'> & {
        role?: User['role'];
    }): Promise<User>;
    validateRefreshToken(token: string): Promise<string | null>;
    storeRefreshToken(token: string, userId: string): Promise<void>;
    invalidateRefreshToken(token: string): Promise<void>;
    getRefreshTokens(): {
        [key: string]: string;
    };
}
