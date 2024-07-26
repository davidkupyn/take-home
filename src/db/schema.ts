import { LibSQLDatabase } from 'drizzle-orm/libsql';
import { employerRelation, employers } from 'src/employers/employer.entity';
import { jobRelation, jobs } from 'src/jobs/job.entity';
import {
  historyRelation,
  workerRelation,
  workers,
  history,
} from 'src/workers/worker.entity';

const schema = {
  employers,
  jobs,
  workers,
  history,
  employerRelation,
  jobRelation,
  workerRelation,
  historyRelation,
};
export {
  employers,
  jobs,
  workers,
  history,
  employerRelation,
  jobRelation,
  workerRelation,
  historyRelation,
};
export type Drizzle = LibSQLDatabase<typeof schema>;
