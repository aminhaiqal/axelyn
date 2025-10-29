import { Module } from '@nestjs/common';
import { BusinessController } from './business.controller';
import { BusinessService } from './business.service';
import { PrismaService } from '../../common/prisma.service';
import { BusinessRepository } from './business.repo';
import { ValidationService } from 'src/common/service/validation.service';
import { DuplicateCheckService } from 'src/common/service/duplication-check.service';

@Module({
  controllers: [BusinessController],
  providers: [
    BusinessService,
    BusinessRepository,
    PrismaService,
    ValidationService,
    DuplicateCheckService,
  ],
  exports: [BusinessService],
})
export class BusinessModule {}
