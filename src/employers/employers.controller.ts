import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UsePipes,
} from '@nestjs/common';
import { EmployerInsert } from './employer.entity';
import { EmployersService } from './employers.service';
import { ZodValidationPipe } from 'src/common/pipes/zodValidationPipe';
import { createEmployerSchema } from './dto/createEmployer.dto';
import { updateEmployerSchema } from './dto/updateEmployer.dto';

@Controller('employers')
export class EmployersController {
  constructor(private employersService: EmployersService) {}

  @Get()
  async getAll() {
    return this.employersService.getAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return await this.employersService.findOne(id);
  }

  @Post()
  @UsePipes(new ZodValidationPipe(createEmployerSchema))
  async create(@Body() data: EmployerInsert) {
    return this.employersService.create(data);
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body(new ZodValidationPipe(updateEmployerSchema)) data: EmployerInsert,
  ) {
    return this.employersService.update(id, data);
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return this.employersService.delete(id);
  }

  @Get(':id/workers')
  async getWorkers(@Param('id', ParseIntPipe) id: number) {
    return this.employersService.getWorkers(id);
  }
}
