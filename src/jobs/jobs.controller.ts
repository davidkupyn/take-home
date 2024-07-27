import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  Query,
  UsePipes,
} from '@nestjs/common';
import { JobInsert } from '../db/entities/job.entity';
import { JobsService } from './jobs.service';
import { ZodValidationPipe } from 'src/common/pipes/zodValidationPipe';
import { createJobSchema } from './dto/createJob.dto';
import { updateJobSchema } from './dto/updateJob.dto';
import { dateSchema } from './dto/date.dto';

@Controller('jobs')
export class JobsController {
  constructor(private jobsService: JobsService) {}

  @Get()
  async getAll() {
    return this.jobsService.getAll();
  }

  @Get('/date-period')
  async findByPeriod(
    @Query('from', new ZodValidationPipe(dateSchema)) from: Date,
    @Query('to', new ZodValidationPipe(dateSchema)) to: Date,
  ) {
    return this.jobsService.findByPeriod([from, to]);
  }

  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    return await this.jobsService.findOne(id);
  }

  @Post()
  @UsePipes(new ZodValidationPipe(createJobSchema))
  async create(@Body() data: JobInsert) {
    return this.jobsService.create(data);
  }

  @Put(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body(new ZodValidationPipe(updateJobSchema)) data: JobInsert,
  ) {
    return this.jobsService.update(id, data);
  }

  @Delete(':id')
  async delete(@Param('id', ParseUUIDPipe) id: string) {
    return this.jobsService.delete(id);
  }

  @Put(':id/archive')
  async archive(@Param('id', ParseUUIDPipe) id: string) {
    return this.jobsService.archive(id);
  }
}
