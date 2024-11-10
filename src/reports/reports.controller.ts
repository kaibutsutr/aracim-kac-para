import {
  Body,
  Controller,
  Param,
  Post,
  UseGuards,
  Get,
  BadRequestException,
  Query,
  Delete,
  Patch,
} from '@nestjs/common';
import { ReportsService } from './reports.service';
import { createReportDto } from './dtos/create-report.dto';
import { AuthGuard } from 'src/guards/auth.guard';
import { CurrentUser } from 'src/users/decorators/current-user.decorator';
import { User } from 'src/users/user.entity';
import { serialize, Serializer } from 'v8';
import { reportDto } from './dtos/report.dto';
import { UseInterceptors } from '@nestjs/common';
import { ClassSerializerInterceptor } from '@nestjs/common';
import { approveReportDto } from './dtos/approve-report.dto';
import { AdminGuard } from 'src/guards/admin.guard';
import { query } from 'express';
import { getEstimateDto } from './dtos/get-estimate.dto';

@Controller('reports')
export class ReportsController {
  constructor(private reportsService: ReportsService) {}
  @UseInterceptors(ClassSerializerInterceptor)
  @UseGuards(AuthGuard)
  @Post()
  async createReport(@Body() body: createReportDto, @CurrentUser() user: User) {
    // get current user so we can write the id on reports
    const report = await this.reportsService.create(body, user);
    return report;
  }
  @UseInterceptors(ClassSerializerInterceptor)
  @Get('/:id')
  async getReport(@Param('id') id: number) {
    const report = await this.reportsService.findOne(id);
    if (!report) {
      throw new BadRequestException('Cant find the report!!1');
    }
    return report;
  }
  //get estimate
  @UseInterceptors(ClassSerializerInterceptor)
  @Get()
  async getEstimate(@Query() query: getEstimateDto) {
    createEstimate(query);
  }
  //get estimate

  @UseGuards(AuthGuard)
  @Delete('/:id')
  deleteReport(@Param('id') id: number) {
    return this.reportsService.remove(id);
  }
  //approve reports
  @Patch('/:id')
  @UseGuards(AdminGuard)
  approveReport(@Body() body: approveReportDto, @Param('id') id: number) {
    return this.reportsService.update(id); // we need id only
  }
}
