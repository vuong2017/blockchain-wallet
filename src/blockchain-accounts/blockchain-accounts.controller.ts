import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';

import { JwtAuthGuard } from '@/auth/jwt-auth.guard';
import { BlockchainAccountsService } from '@/blockchain-accounts/blockchain-accounts.service';
import { CreateBlockchainAccountDto } from '@/blockchain-accounts/dto/create-blockchain-account.dto';

@ApiTags('Blockchain Accounts')
@Controller()
export class BlockchainAccountsController {
  constructor(private blockchainAccountsService: BlockchainAccountsService) {}
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('blockchain-accounts')
  async getList() {
    try {
      const result = this.blockchainAccountsService.getList();
      return result;
    } catch (error) {
      console.log('Blockchain Accounts: getList error', error);
    }
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post('blockchain-accounts/create')
  async create(@Body() body: CreateBlockchainAccountDto) {
    try {
      const result = this.blockchainAccountsService.create(body);
      return result;
    } catch (error) {
      console.log('Blockchain Accounts: CREATE error', error);
    }
  }
}
