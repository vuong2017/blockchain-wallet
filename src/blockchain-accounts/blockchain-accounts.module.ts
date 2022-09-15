import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import {
  BlockchainAccount,
  BlockchainAccountSchema,
} from '@/blockchain-accounts/schemas/blockchain-accounts';
import { BlockchainAccountsService } from './blockchain-accounts.service';
import { BlockchainAccountsController } from './blockchain-accounts.controller';
// Modules
import { Web3Module } from '@/web3/web3.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: BlockchainAccount.name, schema: BlockchainAccountSchema },
    ]),
    Web3Module,
  ],
  providers: [BlockchainAccountsService],
  controllers: [BlockchainAccountsController],
  exports: [BlockchainAccountsService],
})
export class BlockchainAccountsModule {}
