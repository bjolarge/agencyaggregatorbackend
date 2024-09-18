import {
    Column,
    Entity,
    JoinColumn,
    OneToMany,
    OneToOne,
    PrimaryGeneratedColumn,
  } from 'typeorm';
  import { Exclude } from 'class-transformer';
import Role from '../enum/role.enum';
  
  @Entity('registeredusers')
  class User {
    @PrimaryGeneratedColumn()
    public id: number;
  
    @Column({ unique: true })
    public email: string;
  
    @Column()
    public name: string;
  
    @Column({ nullable: true })
    @Exclude()
    public password?: string;
  
    @Column({ default: false })
    public isRegisteredWithGoogle: boolean;
     
    @Column({
      nullable: true,
    })
    @Exclude()
    public currentHashedRefreshToken?: string;
   
    @Column({ default: false })
    public isEmailConfirmed: boolean;

    @Column({
      type: 'enum',
     enum: Role,
      //array: true,
      default: [Role.Admin]
    })
     public roles: Role[]
  
  }
  
  export default User;