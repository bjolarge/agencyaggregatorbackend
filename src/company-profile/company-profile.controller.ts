import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { CompanyProfileService } from './company-profile.service';
import { CreateCompanyProfileDto } from './dto/create-company-profile.dto';
import { UpdateCompanyProfileDto } from './dto/update-company-profile.dto';
import JwtAuthenticationGuard from 'src/authentication/guards/jwt-authentication.guard';
import Role from 'src/users/enum/role.enum';
import { Public } from 'src/authentication/decorators/public.decorator';
import { Roles } from 'src/users/decorators/roles';

@Controller('company-profile')
export class CompanyProfileController {
  constructor(private readonly companyProfileService: CompanyProfileService) {}

  @UseGuards(JwtAuthenticationGuard)
  @Post()
  create(@Body() createCompanyProfileDto: CreateCompanyProfileDto) {
    return this.companyProfileService.create(createCompanyProfileDto);
  }

  @UseGuards(JwtAuthenticationGuard)
  @Get()
  findAll() {
    return this.companyProfileService.findAll();
  }

  @UseGuards(JwtAuthenticationGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.companyProfileService.findOne(+id);
  }

  @Get('/count')
  findAllCompanyProjects() {
    return this.companyProfileService.findcompanyprofilecount();
  }

  @Patch(':id')
  @Public()
  @Roles(Role.Admin)
  update(@Param('id') id: string, @Body() updateCompanyProfileDto: UpdateCompanyProfileDto) {
    return this.companyProfileService.update(+id, updateCompanyProfileDto);
  }

  @Delete(':id')
  @Public()
  @Roles(Role.Admin)
  remove(@Param('id') id: string) {
    return this.companyProfileService.remove(+id);
  }
}


