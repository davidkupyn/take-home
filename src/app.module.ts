import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './db/db.module';
import { EmployersModule } from './employers/employers.module';
import { JobsModule } from './jobs/jobs.module';
import { WorkersModule } from './workers/workers.module';

@Module({
  imports: [DatabaseModule, EmployersModule, JobsModule, WorkersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
