import bcrypt from 'bcrypts'
import DBLocal from 'db-local'
import crypto from 'node:crypto'
import { SALT_ROUNDS } from './config.js'

const {Schema}=new DBLocal({path:'./db'})

const User = Schema()

export class UserRepository{}

class Validation{}
