import bcrypt from 'bcryptjs'
import DBLocal from 'db-local'
import crypto from 'node:crypto'
import { SALT_ROUNDS } from './config.js'

const { Schema } = new DBLocal({ path: './db' })

//creació de conexió a bbdd
const User = Schema('User', {
    _id: { type: String, required: true },
    username: { type: String, required: true },
    password: { type: String, required: true },
})

export class UserRepository { 
    static async create({username, password}){
        Validation.username(username);
        Validation.password(password);
        const user= User.findOne({username});
        if(user) throw new Error('username already exists');
        const id = crypto.randomUUID();
        const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

        const newUser = {
            _id:id,
            username,
            password: hashedPassword,

        };

        User.create(newUser).save();
        return newUser;
    }

    static async login({username, password}){
        Validation.username(username);
        Validation.password(password);

        const user = User.findOne({ username });

        if(!user) throw new Error('usuario o contraseña incorrecta');

        return user;
    }
}


//static: no necessito crear a l'objecte per crear el mètode
class Validation {
    static username(username) {
        if (typeof username != 'string') throw new Error('username must be a string');
        if (username.length < 3) throw new Error('Username superior a 3 caracteres');

    }
    static password(password) {
        if (typeof password != 'string') throw new Error('sdfjkl must be a string');
        if (password.length < 6) throw new Error('password superior a 5 caracteres');
    }
}
