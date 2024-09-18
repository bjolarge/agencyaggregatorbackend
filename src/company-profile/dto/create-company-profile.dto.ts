import { IsNotEmpty, IsNumber, IsPositive, IsString } from "class-validator";

export class CreateCompanyProfileDto {
    @IsString()
    @IsNotEmpty()
    name:string;

    @IsString()
    @IsNotEmpty()
    address:string;

    @IsString()
    @IsNotEmpty()
    details:string;

    @IsNumber()
    @IsPositive()
    @IsNotEmpty()
    projects:number;
}
