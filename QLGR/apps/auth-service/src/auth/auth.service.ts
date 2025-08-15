import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { TokensService } from '../tokens/tokens.service';
import { LoginDto, RegisterDto, RefreshDto } from './auth.dto';
import * as argon2 from 'argon2';

@Injectable()
export class AuthService {
  constructor(
    private readonly users: UsersService,
    private readonly tokens: TokensService,
  ) {}

  async login(dto: LoginDto) {
    const user = await this.users.findByEmail(dto.email);
    if (!user || !(await argon2.verify(user.passwordHash, dto.password))) {
      throw new Error('Invalid credentials');
    }
    return this.tokens.generateTokens(user);
  }

  async register(dto: RegisterDto) {
    const hash = await argon2.hash(dto.password, { type: argon2.argon2id });
    const user = await this.users.create({ ...dto, passwordHash: hash });
    return user;
  }

  async refresh(dto: RefreshDto) {
    return this.tokens.refreshTokens(dto.refreshToken);
  }

  async logout(user: any) {
    return this.tokens.revokeTokens(user.id);
  }
}
