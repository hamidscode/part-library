import { ApiTags } from '@nestjs/swagger';
import { Controller, HttpException, HttpStatus, Post } from '@nestjs/common';

@ApiTags('library')
@Controller('/')
export class LibraryController {
  constructor() {}

  @Post('/request')
  async request() {
    try {
      return { status: 'ok' };
    } catch (error) {
      throw new HttpException(
        (error.response ? error.response : error.message) ?? error,
        error.status ?? HttpStatus.EXPECTATION_FAILED,
      );
    }
  }
}
