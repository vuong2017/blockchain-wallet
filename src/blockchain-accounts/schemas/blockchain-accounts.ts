import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

import { User } from '@/users/schemas/users.schema';

export type BlockchainAccountDocument = BlockchainAccount & mongoose.Document;

@Schema()
export class BlockchainAccount {
  @Prop({ type: mongoose.SchemaTypes.ObjectId, ref: User.name })
  userId: mongoose.Types.ObjectId;

  @Prop({ required: true, select: false })
  privateKey: string;

  @Prop({ required: true })
  address: string;
}

export const BlockchainAccountSchema =
  SchemaFactory.createForClass(BlockchainAccount);
