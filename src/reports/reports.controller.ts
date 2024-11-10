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
} from '@nestjs/common';
import { ReportsService } from './reports.service';
import { createReportDto } from './dtos/create-report.dto';
import { AuthGuard } from 'src/guards/auth.guard';
import { CurrentUser } from 'src/users/decorators/current-user.decorator';
import { User } from 'src/users/user.entity';

@Controller('reports')
export class ReportsController {
  constructor(private reportsService: ReportsService) {}
  @UseGuards(AuthGuard)
  @Post()
  async createReport(@Body() body: createReportDto) {
    const report = await this.reportsService.create(body);
    return report;
  }
  @Get('/:id')
  async getReport(@Param('id') id: number) {
    const report = await this.reportsService.findOne(id);
    if (!report) {
      throw new BadRequestException('Cant find the report!!1');
    }
    return report;
  }
  @Get('/')
  async getReports(@Query('year') year: number) {
    const reports = await this.reportsService.find(year);
    if (!reports) {
      throw new BadRequestException('Cant find the report!!1');
    }
    return reports;
  }
  @UseGuards(AuthGuard)
  @Delete('/:id')
  deleteReport(@Param('id') id: number) {
    return this.reportsService.remove(id);
  }
}
