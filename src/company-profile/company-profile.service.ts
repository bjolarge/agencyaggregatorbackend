import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCompanyProfileDto } from './dto/create-company-profile.dto';
import { UpdateCompanyProfileDto } from './dto/update-company-profile.dto';
import { CompanyProfile } from './entities/company-profile.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';

@Injectable()
export class CompanyProfileService {
  constructor(
    @InjectRepository(CompanyProfile)
  private readonly companyProfileRepository:Repository<CompanyProfile>,
  ){}
  async create(createcompanyPostDto:CreateCompanyProfileDto ) {
    const companyPost = await this.companyProfileRepository.create(createcompanyPostDto)
    return this.companyProfileRepository.save(companyPost);
  }

  findAll() {
    return this.companyProfileRepository.find();
  }

  findOne(id) {
    const companyPost =  this.companyProfileRepository.findOne({where: {id}});
    if(!companyPost){
      throw new NotFoundException(`companyProfile with the given #${id} not found`);
    }
    return companyPost;
  }

  async findcompanyprofilecount(){
    const usercount = await this.companyProfileRepository.count();
    return usercount;
  }

  // implementing search feature on my companyProfile
  async searchProfileItems(query: string): Promise<CompanyProfile[]> {
    return await this.companyProfileRepository.find({
      where: [
        { name: Like(`%${query}%`) },
        //{ body: Like(`%${query}%`) },
      ],
    });
  }

  async update(id: number, updatecompanyPostDto: UpdateCompanyProfileDto) {
    const existingcompanyPost= await this.companyProfileRepository.preload({
      id:+id,
      ...updatecompanyPostDto,
      //flavors,
    });
    if(!existingcompanyPost){
      throw new NotFoundException(`The companyPost with the given ${id} not found`);
    }
    return this.companyProfileRepository.save(existingcompanyPost);
    
  }

  async remove(id) {
    // const product = await this.companyProfileRepository.findOne(id);
    // return this.companyProfileRepository.remove(product);

    const companyPost  = await this.companyProfileRepository.delete(id);

    if (companyPost.affected === 0) {
      throw new NotFoundException(`CompanyProfile with ID "${id}" not found`);
    }
  }
}

