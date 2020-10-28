import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'

@Entity('users')
export default class User {
    @PrimaryGeneratedColumn('increment')
    id : number;
    
    @Column()
    name : string;
    
    @Column()
    endereco : string;
}