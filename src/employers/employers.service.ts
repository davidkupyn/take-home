import { Inject, Injectable } from '@nestjs/common';
import { Drizzle } from 'src/db/schema';
import { EmployerInsert, employers } from './employer.entity';
import { eq } from 'drizzle-orm';

@Injectable()
export class EmployersService {
  constructor(@Inject('DB') private drizzle: Drizzle) {}

  async getAll() {
    return await this.drizzle.query.employers.findMany();
  }

  async findOne(id: number) {
    return await this.drizzle.query.employers.findFirst({
      where: (table, { eq }) => eq(table.id, id),
    });
  }

  async getWorkers(id: number) {
    return (
      await this.drizzle.query.employers.findFirst({
        where: (table, { eq }) => eq(table.id, id),
        with: {
          jobs: {
            with: {
              workers: true,
            },
          },
        },
      })
    ).jobs.flatMap((job) => job.workers);
  }

  async create(data: EmployerInsert) {
    await this.drizzle.insert(employers).values(data);
  }

  async update(id: number, data: EmployerInsert) {
    await this.drizzle.update(employers).set(data).where(eq(employers.id, id));
  }

  async delete(id: number) {
    await this.drizzle.delete(employers).where(eq(employers.id, id));
  }
}
