import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  UsePipes,
} from '@nestjs/common';
import { WorkerInsert } from './worker.entity';
import { WorkersService } from './workers.service';
import { ZodValidationPipe } from 'src/common/pipes/zodValidationPipe';
import { createWorkerSchema } from './dto/createWorker.dto';
import { updateWorkerSchema } from './dto/updateWorker.dto';

@Controller('workers')
export class WorkersController {
  constructor(private workersService: WorkersService) {}

  @Get()
  async getAll() {
    return this.workersService.getAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return await this.workersService.findOne(id);
  }

  @Post()
  @UsePipes(new ZodValidationPipe(createWorkerSchema))
  async create(@Body() data: WorkerInsert) {
    return this.workersService.create(data);
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body(new ZodValidationPipe(updateWorkerSchema)) data: WorkerInsert,
  ) {
    return this.workersService.update(id, data);
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return this.workersService.delete(id);
  }

  @Get(':id/matched-jobs')
  async getMatchingJobs(@Param('id', ParseIntPipe) id: number) {
    return this.workersService.getMatchingJobs(id);
  }

  @Put(':id/new-employer')
  async changeEmployer(
    @Param('id', ParseIntPipe) workerId: number,
    @Query('job', ParseIntPipe) job: number,
  ) {
    return this.workersService.changeEmployer(workerId, job);
  }
}
