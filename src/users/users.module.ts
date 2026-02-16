import { Module, forwardRef } from '@nestjs/common';
import { UsersService } from './users.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { UsersController } from './users.controller';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [forwardRef(() => AuthModule)],
  providers: [UsersService, PrismaService],
  exports: [UsersService], //Exporter UserService pour qu'il soit utilisable dans AuthModule
  controllers: [UsersController],
})
export class UsersModule {}
