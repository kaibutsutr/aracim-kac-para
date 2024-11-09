import { BadRequestException, Injectable } from '@nestjs/common';
import { Report } from './report.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { createReportDto } from './dtos/create-report.dto';

@Injectable()
export class ReportsService {
  constructor(@InjectRepository(Report) private repo: Repository<Report>) {}

  create(reportdto: createReportDto) {
    // get entire body as reportdto format then save it
    const report = this.repo.create(reportdto);
    return this.repo.save(report);
  }
  findOne(id: number) {
    if (id === null) {
      throw new BadRequestException('Cant find the report with given ID!!!');
    }
    return this.repo.findOneBy({ id });
  }
  find(year: number) {
    // bring many users with this year
    return this.repo.find({ where: { year } });
  }
}
