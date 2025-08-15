import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { TokensModule } from '../tokens/tokens.module';
import { RbacModule } from '../rbac/rbac.module';
import { AuditModule } from '../audit/audit.module';

@Module({
  imports: [UsersModule, TokensModule, RbacModule, AuditModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
