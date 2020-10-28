import {Router} from 'express'
import UserController from './controllers/UserController';
import multer from 'multer';
import uploadConfig from './config/upload'

const routes = Router();
const upload = multer(uploadConfig);

routes.get('/users', UserController.index);
routes.get('/users/:id', UserController.show);
routes.post('/users', upload.array('images'), UserController.create);

export default routes;