import { TypeOrmModule } from '@nestjs/typeorm'; // we need typeorm for db connection
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ReportsModule } from './reports/reports.module';
import { User } from './users/user.entity';
import { Report } from './reports/report.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      //config for typeorm
      type: 'sqlite', //db type
      database: 'db.sqlite', //db name
      entities: [User, Report], //entities connected
      synchronize: true, // auto migration, this is for development only. You dont want to do migrations after app is developed!!!
    }),
    UsersModule,
    ReportsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
