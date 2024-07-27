import { Inject, Injectable } from '@nestjs/common';
import { Drizzle } from 'src/db/db.module';
import { JobInsert, jobs } from '../db/entities/job.entity';
import { eq, gte, ne } from 'drizzle-orm';

@Injectable()
export class JobsService {
  constructor(@Inject('DB') private drizzle: Drizzle) {}

  async getAll() {
    return await this.drizzle.query.jobs.findMany();
  }

  async findByPeriod(period: Date[]) {
    const [startDate, endDate] = period.map((date) =>
      Math.floor(date.getTime() / 1000),
    );
    return await this.drizzle.query.jobs.findMany({
      where: (job, { between }) =>
        between(job.creationDate, startDate, endDate),
    });
  }

  async findOne(id: string) {
    return await this.drizzle.query.jobs.findFirst({
      where: (job, { eq }) => eq(job.id, id),
    });
  }

  async findGreaterSalary(
    salary: number,
    options?: {
      excludedJobId?: string;
    },
  ) {
    const filters = [gte(jobs.salary, salary), eq(jobs.status, 'active')];
    if (options?.excludedJobId) {
      filters.push(ne(jobs.id, options.excludedJobId));
    }

    return await this.drizzle.query.jobs.findMany({
      where: (_job, { and }) => and(...filters),
    });
  }

  async create(data: JobInsert) {
    await this.drizzle.insert(jobs).values(data);
  }

  async update(id: string, data: JobInsert) {
    await this.drizzle.update(jobs).set(data).where(eq(jobs.id, id));
  }

  async delete(id: string) {
    await this.drizzle.delete(jobs).where(eq(jobs.id, id));
  }

  async archive(id: string) {
    await this.drizzle
      .update(jobs)
      .set({ status: 'archive' })
      .where(eq(jobs.id, id));
  }
}
