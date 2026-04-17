import {
    ConflictException,
    Injectable
} from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';
import { User } from '../types/user.interface';

@Injectable()
export class UsersService {
  private users: User[] = [
    {
      id: 'admin-id',
      email: 'admin@example.com',
      password: '$2a$10$somehashedadminpass1234567890abcdef', // bcrypt.hashSync('adminpass', 10)
      name: 'Admin',
      role: 'admin' as const,
    },
  ];

  private refreshTokens: { [tokenHash: string]: string } = {}; // hashed -> userId

  async findByEmail(email: string): Promise<User | undefined> {
    return this.users.find((user) => user.email === email);
  }

  async findById(id: string): Promise<User | undefined> {
    return this.users.find((user) => user.id === id);
  }

  async create(
    userData: Omit<User, 'id' | 'role'> & { role?: User['role'] },
  ): Promise<User> {
    const existing = await this.findByEmail(userData.email);
    if (existing) {
      throw new ConflictException('Email already exists');
    }

    const id = uuidv4();
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    const role: User['role'] = userData.role || 'user';

    const user: User = { id, ...userData, password: hashedPassword, role };
    this.users.push(user);
    return user;
  }

  async validateRefreshToken(token: string): Promise<string | null> {
    const tokenHash = await bcrypt.hash(token, 10);
    return this.refreshTokens[tokenHash] || null;
  }

  async storeRefreshToken(token: string, userId: string): Promise<void> {
    const tokenHash = await bcrypt.hash(token, 10);
    delete this.refreshTokens[tokenHash]; // Rotate: invalidate old
    this.refreshTokens[tokenHash] = userId;
  }

  async invalidateRefreshToken(token: string): Promise<void> {
    const tokenHash = await bcrypt.hash(token, 10);
    delete this.refreshTokens[tokenHash];
  }

  getRefreshTokens(): { [key: string]: string } {
    return this.refreshTokens;
  }
}
