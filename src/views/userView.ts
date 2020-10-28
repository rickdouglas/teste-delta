import User from '../models/User';
import imagesView from './imageView'

export default {
    render(user:User) {
        return {
            id : user.id,
            name: user.name,
            endereco: user.endereco,
            images: imagesView.renderMany(user.images)
        };
    },

    renderMany(users : User[]) {
        return users.map(user => this.render(user));
    }
};