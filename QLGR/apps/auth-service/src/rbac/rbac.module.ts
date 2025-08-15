import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from './role.entity';
import { Permission } from './permission.entity';
import { UserRole } from './user-role.entity';
import { RolePermission } from './role-permission.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Role, Permission, UserRole, RolePermission])],
  exports: [TypeOrmModule],
})
export class RbacModule {}
