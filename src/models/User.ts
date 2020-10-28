import { Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinColumn } from 'typeorm'
import Image from  './Image';


@Entity('users')
export default class User {
    @PrimaryGeneratedColumn('increment')
    id : number;
    
    @Column()
    name : string;
    
    @Column()
    endereco : string;

    @OneToMany( () => Image, image => image.user, {
        cascade : ['insert', 'update']
    })
    @JoinColumn({name:'user_id'})
    images : Image[];  
}