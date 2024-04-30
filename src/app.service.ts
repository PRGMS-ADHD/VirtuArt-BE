import { Injectable } from '@nestjs/common';

@Injectable()
export default class AppService {
  private readonly greeting: string;

  constructor() {
    this.greeting = 'Hello World!';
  }

  getHello(): string {
    return this.greeting;
  }
}
