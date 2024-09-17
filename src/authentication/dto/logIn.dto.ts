import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, IsNotEmpty, MinLength } from 'class-validator';

export class LogInDto {
  @ApiProperty({description:'This has to be a valid email of a registered user'})
  @IsEmail()
  email: string;

  @ApiProperty({description:'This has to be a valid password for a registered user'})
  @IsString()
  @IsNotEmpty()
  @MinLength(7)
  password: string;
}

export default LogInDto;