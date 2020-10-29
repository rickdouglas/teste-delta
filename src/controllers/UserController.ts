import { Request, Response} from 'express'
import {getRepository} from 'typeorm'
import User from '../models/User'
import userView from '../views/userView';
import * as Yup from 'yup';

export default {
    async index(request:Request, response:Response){
        const usersRepository = getRepository(User);
        const users = await usersRepository.find({
            relations: ['images']
        });
        return response.json(userView.renderMany(users));
    },

    async show(request:Request, response:Response){
        const {id} = request.params;
        const usersRepository = getRepository(User);
        const user = await usersRepository.findOneOrFail(id, {
            relations: ['images']
        });
        return response.json(userView.render(user));
    },

    async create(request:Request, response:Response) {
        const {
            name,
            endereco
        } = request.body;
    
        const usersRepository = getRepository(User);

        const requestImages = request.files as Express.Multer.File[];
        
        const images = requestImages.map(image => {
            return {path: image.filename}
        })
    
        const data = {
            name,
            endereco,
            images
        
        };

        const schema = Yup.object().shape({
            name: Yup.string().required(),
            endereco: Yup.string().required(),
            images: Yup.array(Yup.object().shape({
                path: Yup.string().required()
            }))
        });

        await schema.validate(data, {
            abortEarly: false,
        })

        const user = usersRepository.create(data);
        
        await usersRepository.save(user);
        return response.status(201).json(user);
    }
};