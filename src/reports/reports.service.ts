import { BadRequestException, Injectable } from '@nestjs/common';
import { Report } from './report.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { createReportDto } from './dtos/create-report.dto';
import { CurrentUser } from 'src/users/decorators/current-user.decorator';
import { User } from 'src/users/user.entity';
import { NotFoundException } from '@nestjs/common';
import { getEstimateDto } from './dtos/get-estimate.dto';

@Injectable()
export class ReportsService {
  constructor(@InjectRepository(Report) private repo: Repository<Report>) {}

  create(reportdto: createReportDto, user: User) {
    // get entire body as reportdto format then save it
    const report = this.repo.create(reportdto);
    report.user = user; // assign the user who wrote the
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
  async remove(id: number) {
    const report = await this.repo.findOneBy({ id });
    if (!report) {
      throw new BadRequestException('Cant find the report with given ID!!!');
    }
    console.log('report deleted');

    return this.repo.remove(report);
  }
  async update(id: number) {
    const report = await this.repo.findOneBy({ id }); //  find the report with given id then check if its not null
    if (!report) {
      throw new NotFoundException('Report not found!!!');
    }
    report.approved = true; // approve report
    console.log('Report approved by Admin!');

    return this.repo.save(report); // we save here to activate hooks
  }
  //get estimate
  createEstimate({
    make,
    model,
    longitude,
    latitude,
    year,
    mileage,
  }: getEstimateDto) {
    // we use destruction to avoid sql injection attacks
    return this.repo
      .createQueryBuilder() // used for long querites
      .select('AVG(price)', 'price') //take average of prices
      .where('make = :make', { make }) // list same make
      .andWhere('model = :model', { model }) // and same model, dont use where again since it overrides
      .andWhere('lng - :lng BETWEEN -5 AND 5', { longitude }) // +-5 difference is ok, we do substraction
      .andWhere('lat - :lat BETWEEN -5 AND 5', { latitude }) // +-5 difference is ok, we do substraction
      .andWhere('year - :year BETWEEN -3 AND 3', { year }) // +-3 difference is ok, we do substraction
      .andWhere('approved IS TRUE') // it needs to be approved
      .orderBy('ABS(mileage - :mileage)', 'DESC') // absolute value in case of negative, sort from max to mind
      .setParameters({ mileage })
      .limit(3) // take 3 top most cars
      .getRawOne(); // turn it into one value
  }
}
