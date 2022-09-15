import { ApiProperty } from '@nestjs/swagger';

export class CreateBlockchainAccountDto {
  @ApiProperty()
  userId: string;
  @ApiProperty()
  privateKey: string;
}
