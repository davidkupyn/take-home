import { DrizzleTursoModule } from '@knaadh/nestjs-drizzle-turso';
import { Module } from '@nestjs/common';
import * as dotenv from 'dotenv';
import { LibSQLDatabase } from 'drizzle-orm/libsql';
import * as employerEntity from './entities/employer.entity';
import * as jobEntity from './entities/job.entity';
import * as workerEntity from './entities/worker.entity';
import * as historyEntity from './entities/history.entity';

dotenv.config();

const schema = {
  ...employerEntity,
  ...jobEntity,
  ...workerEntity,
  ...historyEntity,
};

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
      config: {
        schema,
      },
    }),
  ],
})
export class DatabaseModule {}

export type Drizzle = LibSQLDatabase<typeof schema>;
