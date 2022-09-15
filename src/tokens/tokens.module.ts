import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { Web3Module } from '@/web3/web3.module';
import { Token, TokenSchema } from '@/tokens/schemas/tokens';
import { TokensService } from '@/tokens/tokens.service';
import { TokensController } from '@/tokens/tokens.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Token.name, schema: TokenSchema }]),
    Web3Module,
  ],
  providers: [TokensService],
  controllers: [TokensController],
  exports: [TokensService],
})
export class TokensModule {}
