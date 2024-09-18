import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAgencyDto } from './dto/create-agency.dto';
import { UpdateAgencyDto } from './dto/update-agency.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Agency } from './entities/agency.entity';
import { Like, Repository } from 'typeorm';


@Injectable()
export class AgencyService {
  constructor(
    @InjectRepository(Agency)
  private readonly agencyProfileRepository:Repository<Agency>,
  ){}
  async create(createAgencyDto:CreateAgencyDto ) {
    const companyPost = await this.agencyProfileRepository.create(createAgencyDto)
    return this.agencyProfileRepository.save(companyPost);
  }

  findAll() {
    return this.agencyProfileRepository.find();
  }

  findOne(id) {
    const companyPost =  this.agencyProfileRepository.findOne({where: {id}});
    if(!companyPost){
      throw new NotFoundException(`AgencyDto with the given #${id} not found`);
    }
    return companyPost;
  }

  async findcompanyprofilecount(){
    const usercount = await this.agencyProfileRepository.count();
    return usercount;
  }

  // implementing search feature on my companyProfile
  async searchAgencyItems(query: string): Promise<Agency[]> {
    return await this.agencyProfileRepository.find({
      where: [
        { agencyName: Like(`%${query}%`) },
      ],
    });
  }

  async update(id: number, updatecompanyPostDto: UpdateAgencyDto) {
    const existingcompanyPost= await this.agencyProfileRepository.preload({
      id:+id,
      ...updatecompanyPostDto,
      //flavors,
    });
    if(!existingcompanyPost){
      throw new NotFoundException(`The UpdateAgencyDto with the given ${id} not found`);
    }
    return this.agencyProfileRepository.save(existingcompanyPost);
    
  }

  async remove(id) {
    const companyPost  = await this.agencyProfileRepository.delete(id);

    if (companyPost.affected === 0) {
      throw new NotFoundException(`AgencyDto with ID "${id}" not found`);
    }
  }
}
