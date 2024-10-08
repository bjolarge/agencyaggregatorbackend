import {
    Column,
    Entity,
    PrimaryGeneratedColumn
  } from 'typeorm';
@Entity()
export class CompanyProfile {
    @PrimaryGeneratedColumn()
    id:number;
    @Column()
    name:string;

    @Column()
    address:string;

    @Column()
    details:string;

    @Column()
    projects:number;
    
}
