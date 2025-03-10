import { Module } from '@nestjs/common';
import { ClientsController } from './clients.controller';
import { ClientsService } from './clients.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { ClientModel } from './models/client.model/client.model';

@Module({
  controllers: [ClientsController],
  providers: [ClientsService],
  imports: [SequelizeModule.forFeature([ClientModel])],
  exports: [ClientsService],
})
export class ClientsModule {}
