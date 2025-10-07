import bcrypt from 'bcrypts'
import DBLocal from 'db-local'
import crypto from 'node:crypto'
import { SALT_ROUNDS } from './config.js'

const {Schema}=new DBLocal({path:'./db'})

//creació de conexió a bbdd
const User = Schema('User', {
    _id:{type:String, required:true},
    username:{type:String, required:true},
    password:{type:String, required:true},
})

export class UserRepository{}

class Validation{}
