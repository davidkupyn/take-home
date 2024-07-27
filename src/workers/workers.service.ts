import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { eq, sql } from 'drizzle-orm';
import { Drizzle } from 'src/db/db.module';
import { JobsService } from 'src/jobs/jobs.service';
import { WorkerInsert, workers } from '../db/entities/worker.entity';

@Injectable()
export class WorkersService {
  constructor(
    @Inject('DB') private drizzle: Drizzle,
    private readonly jobsService: JobsService,
  ) {}

  async getAll() {
    return await this.drizzle.query.workers.findMany();
  }

  async findOne(id: string) {
    return await this.drizzle.query.workers.findFirst({
      where: (worker, { eq }) => eq(worker.id, id),
    });
  }

  async create(data: WorkerInsert) {
    return (
      await this.drizzle
        .insert(workers)
        .values(data)
        .returning({ id: workers.id })
    )[0];
  }

  async update(id: string, data: WorkerInsert) {
    const response = await this.drizzle
      .update(workers)
      .set(data)
      .where(eq(workers.id, id));

    if (response.rowsAffected === 0) {
      throw new HttpException(
        {
          message: 'The worker with the specified ID was not found',
          error: 'Bad Request',
          status: HttpStatus.NOT_FOUND,
        },
        HttpStatus.NOT_FOUND,
        {
          cause: 'The worker with the specified ID was not found',
        },
      );
    }
  }

  async delete(id: string) {
    const response = await this.drizzle
      .delete(workers)
      .where(eq(workers.id, id));

    if (response.rowsAffected === 0) {
      throw new HttpException(
        {
          message: 'The worker with the specified ID was not found',
          error: 'Bad Request',
          status: HttpStatus.NOT_FOUND,
        },
        HttpStatus.NOT_FOUND,
        {
          cause: 'The worker with the specified ID was not found',
        },
      );
    }
  }

  async getMatchingJobs(id: string) {
    const worker = await this.findOne(id);
    return await this.jobsService.findGreaterSalary(worker.salary, {
      excludedJobId: worker.jobId,
    });
  }
  // Joins the worker with the job and then with the employer
  async getEmployer(id: string) {
    return (
      await this.drizzle.query.workers.findFirst({
        columns: {
          jobId: true,
        },
        where: (worker, { eq }) => eq(worker.id, id),
        with: {
          job: {
            columns: {
              ownerId: true,
            },
            with: {
              employer: true,
            },
          },
        },
      })
    ).job.employer;
  }

  async changeEmployer(workerId: number, jobId?: number) {
    await this.drizzle.run(
      sql`UPDATE worker SET job_id = ${jobId ?? null} WHERE id = ${workerId}`,
    );

    //   await this.drizzle
    //     .update(workers)
    //     .set({ jobId })
    //     .where(eq(workers.id, workerId));
  }
}
