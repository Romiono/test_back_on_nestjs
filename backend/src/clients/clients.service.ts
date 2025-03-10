import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ClientModel } from './models/client.model/client.model';
import { CreateClientDto } from './dto/create-client.dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto/update-client.dto';

@Injectable()
export class ClientsService {
  constructor(
    @InjectModel(ClientModel)
    private clientModel: typeof ClientModel,
  ) {}

  async create(dto: CreateClientDto): Promise<ClientModel> {
    return await this.clientModel.create(dto);
  }

  async findAll(): Promise<ClientModel[]> {
    return await this.clientModel.findAll();
  }

  async findOne(id: number): Promise<ClientModel> {
    const client = await this.clientModel.findByPk(id);
    if (!client) {
      throw new NotFoundException(`Клиент с id ${id} не найден`);
    }
    return client;
  }

  async update(id: number, dto: UpdateClientDto): Promise<ClientModel> {
    const client = await this.findOne(id);
    await client.update(dto);
    return client;
  }

  async remove(id: number): Promise<void> {
    const client = await this.findOne(id);
    await client.destroy();
  }
}
