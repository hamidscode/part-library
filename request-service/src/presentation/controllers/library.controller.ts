import { ApiTags, ApiResponse } from '@nestjs/swagger';
import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { BookRequestDto } from 'presentation/DTOs';
import {
  BookRequestUseCase,
  BookReservationUseCase,
} from 'application/use-cases';

@ApiTags('library')
@Controller('/')
export class LibraryController {
  constructor(
    private readonly bookRequestUseCase: BookRequestUseCase,
    private readonly bookReservationUseCase: BookReservationUseCase,
  ) {}

  @Post('/request')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    schema: {
      type: 'object',
      required: ['id', 'status', 'requesterName', 'requestedBook', 'createdAt'],
      properties: {
        id: {
          type: 'string',
        },
        status: {
          type: 'string',
          enum: ['pending', 'reserved', 'rejected', 'returned'],
        },
        requesterName: {
          type: 'string',
        },
        requestedBook: {
          type: 'string',
        },
        createdAt: {
          type: 'string',
        },
        updatedAt: {
          type: 'string',
        },
        tags: {
          type: 'array',
          items: { type: 'string' },
        },
      },
    },
    status: HttpStatus.OK,
  })
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

  @Get('request/:id')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    schema: {
      type: 'object',
      required: ['id', 'status', 'requesterName', 'requestedBook', 'createdAt'],
      properties: {
        id: {
          type: 'string',
        },
        status: {
          type: 'string',
          enum: ['pending', 'reserved', 'rejected', 'returned'],
        },
        requesterName: {
          type: 'string',
        },
        requestedBook: {
          type: 'string',
        },
        createdAt: {
          type: 'string',
        },
        updatedAt: {
          type: 'string',
        },
        reservedAt: {
          type: 'string',
        },
        returnedAt: {
          type: 'string',
        },
        tags: {
          type: 'array',
          items: { type: 'string' },
        },
      },
    },
    status: HttpStatus.OK,
  })
  async getRequestById(@Param('id') id: string) {
    try {
      return this.bookRequestUseCase.getRequestById(id);
    } catch (error) {
      throw new HttpException(
        (error.response ? error.response : error.message) ?? error,
        error.status ?? HttpStatus.EXPECTATION_FAILED,
      );
    }
  }

  @Patch('/return-book/:id')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    schema: {
      type: 'object',
      required: ['id', 'status', 'requesterName', 'requestedBook', 'createdAt'],
      properties: {
        id: {
          type: 'string',
        },
        status: {
          type: 'string',
          enum: ['pending', 'reserved', 'rejected', 'returned'],
        },
        requesterName: {
          type: 'string',
        },
        requestedBook: {
          type: 'string',
        },
        createdAt: {
          type: 'string',
        },
        updatedAt: {
          type: 'string',
        },
        reservedAt: {
          type: 'string',
        },
        returnedAt: {
          type: 'string',
        },
        tags: {
          type: 'array',
          items: { type: 'string' },
        },
      },
    },
    status: HttpStatus.OK,
  })
  async returnBook(@Param('id') id: string) {
    try {
      return this.bookReservationUseCase.ReturnBook(id);
    } catch (error) {
      throw new HttpException(
        (error.response ? error.response : error.message) ?? error,
        error.status ?? HttpStatus.EXPECTATION_FAILED,
      );
    }
  }

  @Get('my-requests/:name')
  @ApiResponse({
    schema: {
      type: 'object',
      required: [
        'rows',
        'count',
        'requesterName',
        'requestedBook',
        'createdAt',
      ],
      properties: {
        rows: {
          type: 'array',
          items: {
            type: 'object',
            required: [
              'id',
              'status',
              'requesterName',
              'requestedBook',
              'createdAt',
            ],
            properties: {
              id: {
                type: 'string',
              },
              status: {
                type: 'string',
                enum: ['pending', 'reserved', 'rejected', 'returned'],
              },
              requesterName: {
                type: 'string',
              },
              requestedBook: {
                type: 'string',
              },
              createdAt: {
                type: 'string',
              },
              updatedAt: {
                type: 'string',
              },
              reservedAt: {
                type: 'string',
              },
              returnedAt: {
                type: 'string',
              },
              tags: {
                type: 'array',
                items: { type: 'string' },
              },
            },
          },
        },
        count: {
          type: 'number',
        },
      },
    },
    status: HttpStatus.OK,
  })
  async getMyRequests(@Param('name') name: string) {
    try {
      return this.bookRequestUseCase.getMyRequests(name);
    } catch (error) {
      throw new HttpException(
        (error.response ? error.response : error.message) ?? error,
        error.status ?? HttpStatus.EXPECTATION_FAILED,
      );
    }
  }
}
