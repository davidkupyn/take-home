import { Inject, Injectable } from '@nestjs/common';
import { Drizzle } from 'src/db/schema';
import { WorkerInsert, workers } from './worker.entity';
import { eq, sql } from 'drizzle-orm';

@Injectable()
export class WorkersService {
  constructor(@Inject('DB') private drizzle: Drizzle) {}

  async getAll() {
    return await this.drizzle.query.workers.findMany();
  }

  async findOne(id: number) {
    return await this.drizzle.query.workers.findFirst({
      where: (table, { eq }) => eq(table.id, id),
    });
  }

  async create(data: WorkerInsert) {
    await this.drizzle.insert(workers).values(data);
  }

  async update(id: number, data: WorkerInsert) {
    await this.drizzle.update(workers).set(data).where(eq(workers.id, id));
  }

  async delete(id: number) {
    await this.drizzle.delete(workers).where(eq(workers.id, id));
  }

  async getMatchingJobs(id: number) {
    const worker = await this.drizzle.query.workers.findFirst({
      where: (table, { eq }) => eq(table.id, id),
    });

    return await this.drizzle.query.jobs.findMany({
      where: (table, { gte, and, ne }) =>
        and(gte(table.salary, worker.salary), ne(table.id, worker.jobId)),
    });
  }

  async changeEmployer(workerId: number, jobId: number) {
    await this.drizzle.run(
      sql`UPDATE worker SET job_id = ${jobId} WHERE id = ${workerId}`,
    );

    //   await this.drizzle
    //     .update(workers)
    //     .set({ jobId })
    //     .where(eq(workers.id, workerId));
  }
}
