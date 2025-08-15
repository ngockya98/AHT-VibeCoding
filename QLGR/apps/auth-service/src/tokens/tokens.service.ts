import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthToken } from './auth-token.entity';
import { Repository } from 'typeorm';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class TokensService {
  constructor(
    @InjectRepository(AuthToken)
    private readonly repo: Repository<AuthToken>,
  ) {}

  generateTokens(user: any) {
    const accessToken = jwt.sign({ sub: user.id }, process.env.JWT_SECRET, { expiresIn: '15m' });
    const refreshToken = jwt.sign({ sub: user.id }, process.env.JWT_SECRET, { expiresIn: '7d' });
    this.repo.save({ userId: user.id, token: refreshToken, type: 'refresh' });
    return { accessToken, refreshToken };
  }

  async refreshTokens(refreshToken: string) {
    const payload = jwt.verify(refreshToken, process.env.JWT_SECRET) as any;
    const token = await this.repo.findOneBy({ token: refreshToken, revoked: false });
    if (!token) throw new Error('Invalid refresh token');
    return this.generateTokens({ id: payload.sub });
  }

  async revokeTokens(userId: string) {
    await this.repo.update({ userId }, { revoked: true });
    return { revoked: true };
  }
}
