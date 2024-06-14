import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Param,
  NotFoundException,
} from '@nestjs/common';
import { CreateMessageDto } from './dtos/create-message.dto';
import { MessagesService } from './messages.service';

@Controller('messages')
export class MessagesController {
  // Dependency Injection - creation of this controller depends on creation of the MessagesService
  constructor(public messagesService: MessagesService) {}

  @Get()
  listMessages() {
    return this.messagesService.findAll();
  }

  @Post()
  createMessage(@Body() body: CreateMessageDto) {
    const { content } = body;
    return this.messagesService.create(content);
  }

  @Get('/:id')
  async getMessage(@Param('id') id: string) {
    const message = await this.messagesService.findOne(id);
    if (!message) {
      throw new NotFoundException(
        'message not found! try sending request with a valid id.',
      );
    }
  }

  @Delete('/:id')
  async deleteMessage(@Param('id') id: string) {
    const message = await this.messagesService.deleteOne(id);
    if (!message) {
      throw new NotFoundException(
        'message not found! try sending request with a valid id.',
      );
    }
    return message;
  }
}
