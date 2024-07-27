import { Module } from '@nestjs/common';
import { WorkersController } from './workers.controller';
import { WorkersService } from './workers.service';
import { JobsModule } from 'src/jobs/jobs.module';

@Module({
  imports: [JobsModule],
  controllers: [WorkersController],
  providers: [WorkersService],
})
export class WorkersModule {}
