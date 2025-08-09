import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UserController } from './presentation/user.controller';
import { UserUseCase } from './application/usecase/user.usecase';

@Module({
  imports: [PrismaModule],
  controllers: [UserController],
  providers: [UserUseCase, UserController],
})
export class UserModule {}
