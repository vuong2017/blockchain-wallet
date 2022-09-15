import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';

import { JwtAuthGuard } from '@/auth/jwt-auth.guard';
import { TokensService } from '@/tokens/tokens.service';
import { CreateTokenDto } from '@/tokens/dto/create-token.dto';

@ApiTags('Tokens')
@Controller()
export class TokensController {
  constructor(private tokensService: TokensService) {}
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('tokens')
  async getList() {
    try {
      const result = this.tokensService.getList();
      return result;
    } catch (error) {
      console.log('Tokens: getList error', error);
    }
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post('tokens/create')
  async create(@Body() body: CreateTokenDto) {
    try {
      const result = this.tokensService.create(body);
      return result;
    } catch (error) {
      console.log('Tokens: CREATE error', error);
    }
  }
}
