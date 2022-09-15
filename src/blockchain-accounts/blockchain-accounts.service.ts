import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import {
  BlockchainAccount,
  BlockchainAccountDocument,
} from '@/blockchain-accounts/schemas/blockchain-accounts';
import { CreateBlockchainAccountDto } from '@/blockchain-accounts/dto/create-blockchain-account.dto';
// Services
import { Web3Service } from '@/web3/web3.service';

@Injectable()
export class BlockchainAccountsService {
  constructor(
    @InjectModel(BlockchainAccount.name)
    private blockchainAccountModel: Model<BlockchainAccountDocument>,
    private web3Service: Web3Service,
  ) {}

  async getList(): Promise<BlockchainAccountDocument[] | undefined> {
    const blockchainAccounts = await this.blockchainAccountModel
      .find()
      .populate('userId')
      .exec();
    return blockchainAccounts;
  }

  async create(data: CreateBlockchainAccountDto) {
    const { address } = await this.web3Service.getTokenInfo(data.privateKey);
    const result = await this.blockchainAccountModel.create({
      ...data,
      address,
    });
    return result;
  }
}
