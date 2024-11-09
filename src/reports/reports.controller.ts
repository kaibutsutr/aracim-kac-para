import { Body, Controller, Post } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { createReportDto } from './dtos/create-report.dto';

@Controller('reports')
export class ReportsController {
  constructor(private reportsService: ReportsService) {}
  @Post()
  async createReport(@Body() body: createReportDto) {
    const report = await this.reportsService.create();
    return report;
  }
}
