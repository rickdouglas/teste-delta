import express, { response } from 'express';
import './database/connection';
import {getRepository} from 'typeorm'
import User from './models/User'

const app = express();

app.use(express.json());

app.post('/users', async(request , response) => {
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
});

app.listen(3333);