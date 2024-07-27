import { Inject, Injectable } from '@nestjs/common';
import { Drizzle } from 'src/db/db.module';
import { EmployerInsert, employers } from '../db/entities/employer.entity';
import { eq } from 'drizzle-orm';

@Injectable()
export class EmployersService {
  constructor(@Inject('DB') private drizzle: Drizzle) {}

  async getAll() {
    return await this.drizzle.query.employers.findMany();
  }

  async findOne(id: string) {
    return await this.drizzle.query.employers.findFirst({
      where: (employer, { eq }) => eq(employer.id, id),
    });
  }

  async getWorkers(id: string) {
    return (
      await this.drizzle.query.employers.findFirst({
        where: (employer, { eq }) => eq(employer.id, id),
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

  async update(id: string, data: EmployerInsert) {
    await this.drizzle.update(employers).set(data).where(eq(employers.id, id));
  }

  async delete(id: string) {
    await this.drizzle.delete(employers).where(eq(employers.id, id));
  }
}
