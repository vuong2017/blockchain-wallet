import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Token, TokenDocument } from '@/tokens/schemas/tokens';
import { BlockchainAccount } from '@/blockchain-accounts/schemas/blockchain-accounts';
import { CreateTokenDto } from '@/tokens/dto/create-token.dto';
import { Web3Service } from '@/web3/web3.service';

@Injectable()
export class TokensService {
  constructor(
    @InjectModel(Token.name)
    private tokenModel: Model<TokenDocument>,
    private web3Service: Web3Service,
  ) {}

  async getList() {
    const tokens = await this.tokenModel
      .find()
      .populate<{ blockchainAccountId: BlockchainAccount }>(
        'blockchainAccountId',
      )
      .exec();
    const result = Promise.all(
      tokens.map(async (token) => {
        const balance = await this.web3Service.getTokenBalance(
          token?.blockchainAccountId?.address,
          token.contract,
        );
        return {
          ...token.toObject(),
          balance,
        };
      }),
    );
    return result;
  }

  async create(data: CreateTokenDto) {
    const result = await this.tokenModel.create(data);
    return result;
  }
}
