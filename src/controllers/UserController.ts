import { Request, Response} from 'express'
import {getRepository} from 'typeorm'
import User from '../models/User'

export default {
    async index(request:Request, response:Response){
        const usersRepository = getRepository(User);
        const users = await usersRepository.find();
        return response.json(users);
    },

    async show(request:Request, response:Response){
        const {id} = request.params;
        const usersRepository = getRepository(User);
        const user = await usersRepository.findOneOrFail(id);
        return response.json(user);
    },

    async create(request:Request, response:Response) {
        const {
            name,
            endereco
        } = request.body;
    
        const usersRepository = getRepository(User);
    
        const user = usersRepository.create({
            name,
            endereco
        });
        await usersRepository.save(user);
        return response.status(201).json(user);
    }
};