import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Пошел ты нахуй со своими запросами!!!';
  }
}
