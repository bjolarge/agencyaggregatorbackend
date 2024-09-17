import {
    Column,
    Entity,
    JoinColumn,
    OneToMany,
    OneToOne,
    PrimaryGeneratedColumn,
  } from 'typeorm';
  import { Exclude } from 'class-transformer';
  
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

    // @OneToOne(() => Profile, (profile) => profile.user) // specify inverse side as a second parameter
    // @JoinColumn()
    // profile: Profile


  
  }
  
  export default User;