import { Module } from '@nestjs/common';
import { PrismaService } from './common/prisma.service';
import { UserModule } from './modules/user/user.module';
import { WorkflowModule } from './modules/workflow/workflow.module';
import { NodeModule } from './modules/node/node.module';
import { ExecutionModule } from './modules/execution/execution.module';
import { BusinessModule } from './modules/business/business.module';

@Module({
  imports: [
    UserModule,
    WorkflowModule,
    NodeModule,
    ExecutionModule,
    BusinessModule,
  ],
  providers: [PrismaService],
  exports: [PrismaService],
})
export class AppModule {}
