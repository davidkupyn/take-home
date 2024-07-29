import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
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
    const employer = await this.drizzle.query.employers.findFirst({
      where: (employer, { eq }) => eq(employer.id, id),
    });

    if (!employer) {
      throw new HttpException(
        {
          message: 'The employer with the specified ID was not found',
          error: 'Bad Request',
          status: HttpStatus.NOT_FOUND,
        },
        HttpStatus.NOT_FOUND,
        {
          cause: 'The employer with the specified ID was not found',
        },
      );
    }
    return employer;
  }

  // Joins the employers table with the jobs table and then with the workers table
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
    return (
      await this.drizzle
        .insert(employers)
        .values(data)
        .returning({ id: employers.id })
    )[0];
  }

  async update(id: string, data: EmployerInsert) {
    const response = await this.drizzle
      .update(employers)
      .set(data)
      .where(eq(employers.id, id));

    if (response.rowsAffected === 0) {
      throw new HttpException(
        {
          message: 'The employer with the specified ID was not found',
          error: 'Bad Request',
          status: HttpStatus.NOT_FOUND,
        },
        HttpStatus.NOT_FOUND,
        {
          cause: 'The employer with the specified ID was not found',
        },
      );
    }
  }

  async delete(id: string) {
    const response = await this.drizzle
      .delete(employers)
      .where(eq(employers.id, id));

    if (response.rowsAffected === 0) {
      throw new HttpException(
        {
          message: 'The employer with the specified ID was not found',
          error: 'Bad Request',
          status: HttpStatus.NOT_FOUND,
        },
        HttpStatus.NOT_FOUND,
        {
          cause: 'The employer with the specified ID was not found',
        },
      );
    }
  }
}
