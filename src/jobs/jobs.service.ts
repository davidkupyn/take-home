import { Inject, Injectable } from '@nestjs/common';
import { Drizzle } from 'src/db/schema';
import { JobInsert, jobs } from './job.entity';
import { eq } from 'drizzle-orm';

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
      where: (table, { between }) =>
        between(table.creationDate, startDate, endDate),
    });
  }

  async findOne(id: number) {
    return await this.drizzle.query.jobs.findFirst({
      where: (table, { eq }) => eq(table.id, id),
    });
  }

  async create(data: JobInsert) {
    await this.drizzle.insert(jobs).values(data);
  }

  async update(id: number, data: JobInsert) {
    await this.drizzle.update(jobs).set(data).where(eq(jobs.id, id));
  }

  async delete(id: number) {
    await this.drizzle.delete(jobs).where(eq(jobs.id, id));
  }

  async archive(id: number) {
    await this.drizzle
      .update(jobs)
      .set({ status: 'archive' })
      .where(eq(jobs.id, id));
  }
}
