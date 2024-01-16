import { ApiTags } from '@nestjs/swagger';
import { Body, Controller, HttpCode, HttpException, HttpStatus, Post } from "@nestjs/common";
import { BookRequestDto } from "presentation/DTOs";
import { BookRequestUseCase } from "application/use-cases";

@ApiTags('library')
@Controller('/')
export class LibraryController {
  constructor(private readonly bookRequestUseCase: BookRequestUseCase) {}

  @Post('/request')
  @HttpCode(HttpStatus.OK)
  async request(@Body() bookRequest: BookRequestDto) {
    try {
      return this.bookRequestUseCase.requestOneBook(bookRequest);
    } catch (error) {
      throw new HttpException(
        (error.response ? error.response : error.message) ?? error,
        error.status ?? HttpStatus.EXPECTATION_FAILED,
      );
    }
  }
}
