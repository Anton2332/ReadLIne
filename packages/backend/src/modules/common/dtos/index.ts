// eslint-disable-next-line max-classes-per-file
import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';
import { EAppRoles } from 'src/modules/common/types';

export class TokenDTO {
  @ApiProperty()
  token: string;
}

export class IdDTO {
  @ApiProperty({
    example: '03adea8e-0578-4b4e-b779-bdcbd32e40d0',
    description: 'id'
  })
  @IsUUID()
  id: string;
}
export class BaseEntityDto extends IdDTO {
  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
export class PayloadTokenDTO {
  @ApiProperty()
  token: string;

  @ApiProperty()
  id: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  role: Array<EAppRoles>;
}
