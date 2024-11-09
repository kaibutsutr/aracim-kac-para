import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { createReportDto } from './dtos/create-report.dto';
import { AuthGuard } from 'src/guards/auth.guard';

@Controller('reports')
export class ReportsController {
  constructor(private reportsService: ReportsService) {}
  @UseGuards(AuthGuard)
  @Post()
  async createReport(@Body() body: createReportDto) {
    const report = await this.reportsService.create(body);
    return report;
  }
}
