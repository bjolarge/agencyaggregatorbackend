// import { PartialType } from '@nestjs/swagger';
// import { CreateAuthenticationDto } from './create-authentication.dto';

// export class UpdateAuthenticationDto extends PartialType(CreateAuthenticationDto) {}

import { Type } from "class-transformer";
import { IsDate, IsNumber, IsObject, IsString } from "class-validator";

export class UpdateUserDto {
  @IsString()
  @IsObject()
  entityName: string;

 @IsNumber()
  @IsObject()
  entityId: number;

  @IsString()
  @IsObject()
  action: string; // e.g., 'CREATE', 'UPDATE', 'DELETE'

  @IsString()
  @IsObject()
  oldValue: any; // Store old value (before change)

  @IsString()
  @IsObject()
  newValue: any; // Store new value (after change)

  @IsDate()
  @Type(()=>Date)
  createdAt: Date;

  @IsNumber()
  @IsObject()
  userId: number; 
}