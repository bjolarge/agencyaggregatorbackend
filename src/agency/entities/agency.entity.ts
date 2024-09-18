import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
  } from 'typeorm';
@Entity()
export class Agency {
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    agencyName:string;

    @Column()
    agencyLocation:string;

    @Column({ default: false })
    isActivated:boolean;

    @Column({ default: false })
    isDeactivated:boolean
}
