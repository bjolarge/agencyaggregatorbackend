import {
    IsEmail,
    IsString,
    IsNotEmpty,
    MinLength,
    Matches,
    IsStrongPassword,
  } from 'class-validator';
  import { ApiProperty } from '@nestjs/swagger';
export class CreateUserDto {
    @ApiProperty({
        description: 'Has to be a valid email address',
        example: 'tan@yahoo.com',
          })
        @IsEmail()
        email: string;
    
        @ApiProperty({
        description: 'Has to be a valid email address',
        example: 'Folake Johnson',
          })
        @IsString()
        @IsNotEmpty()
        name: string;
    
        @ApiProperty({
        description: 'Has to be a strong password',
        example: 'fhfLlw^Q$12!fgh',
          })
        @IsString()
        @IsNotEmpty()
        @MinLength(8)
        @IsStrongPassword()
        password: string; 
}