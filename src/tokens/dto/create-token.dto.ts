import { ApiProperty } from '@nestjs/swagger';

export class CreateTokenDto {
  @ApiProperty()
  blockchainAccountId: string;
  @ApiProperty()
  name: string;
  @ApiProperty()
  contract: string;
}
