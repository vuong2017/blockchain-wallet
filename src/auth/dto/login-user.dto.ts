import { ApiProperty } from '@nestjs/swagger';

export class LoginUserDto {
  @ApiProperty({
    default: 'phanquyenvuong97',
  })
  username: string;
  @ApiProperty({
    default: 'anhnet12',
  })
  password: string;
}
