import { IsBoolean, IsNotEmpty, IsString } from "class-validator";

export class CreateAgencyDto {
    @IsString()
    @IsNotEmpty()
    agencyName:string;

    @IsString()
    @IsNotEmpty()
    agencyLocation:string;

    @IsBoolean()
    @IsNotEmpty()
    isActivated:boolean;

    @IsBoolean()
    @IsNotEmpty()
    isDeactivated:boolean
}
