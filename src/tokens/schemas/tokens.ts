import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

import { BlockchainAccount } from '@/blockchain-accounts/schemas/blockchain-accounts';

export type TokenDocument = Token & mongoose.Document;

@Schema()
export class Token {
  @Prop({ type: mongoose.SchemaTypes.ObjectId, ref: BlockchainAccount.name })
  blockchainAccountId: mongoose.Types.ObjectId;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  contract: string;
}

export const TokenSchema = SchemaFactory.createForClass(Token);
