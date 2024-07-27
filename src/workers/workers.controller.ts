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
import { OptionalParseUUIDPipe } from 'src/common/pipes/optionalParseUuidPipe';
import { ZodValidationPipe } from 'src/common/pipes/zodValidationPipe';
import { createWorkerSchema } from './dto/createWorker.dto';
import { updateWorkerSchema } from './dto/updateWorker.dto';
import { WorkerInsert } from '../db/entities/worker.entity';
import { WorkersService } from './workers.service';

@Controller('workers')
export class WorkersController {
  constructor(private workersService: WorkersService) {}

  @Get()
  async getAll() {
    return this.workersService.getAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    return await this.workersService.findOne(id);
  }

  @Post()
  @UsePipes(new ZodValidationPipe(createWorkerSchema))
  async create(@Body() data: WorkerInsert) {
    return this.workersService.create(data);
  }

  @Put(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body(new ZodValidationPipe(updateWorkerSchema)) data: WorkerInsert,
  ) {
    return this.workersService.update(id, data);
  }

  @Delete(':id')
  async delete(@Param('id', ParseUUIDPipe) id: string) {
    return this.workersService.delete(id);
  }

  @Get(':id/matched-jobs')
  async getMatchingJobs(@Param('id', ParseUUIDPipe) id: string) {
    return this.workersService.getMatchingJobs(id);
  }

  @Put(':id/new-employer')
  async changeEmployer(
    @Param('id', ParseUUIDPipe) workerId: number,
    @Query('job', OptionalParseUUIDPipe) job?: number,
  ) {
    return this.workersService.changeEmployer(workerId, job);
  }
}
