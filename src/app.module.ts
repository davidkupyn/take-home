import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EmployersModule } from './employers/employers.module';
import { DrizzleTursoModule } from '@knaadh/nestjs-drizzle-turso';
import * as schema from './db/schema';
import * as dotenv from 'dotenv';
import { JobsModule } from './jobs/jobs.module';
import { WorkersModule } from './workers/workers.module';
dotenv.config();

@Module({
  imports: [
    DrizzleTursoModule.register({
      tag: 'DB',
      turso: {
        config: {
          url: process.env.DATABASE_URL,
          authToken: process.env.DATABASE_TOKEN,
        },
      },
      config: { schema: { ...schema } },
    }),
    EmployersModule,
    JobsModule,
    WorkersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
