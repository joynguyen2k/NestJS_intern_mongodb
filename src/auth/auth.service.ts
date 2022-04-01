import { ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialDto } from './dto/auth-credentials.dto';
import { UserRepository } from './user.respository';
import * as bcrypt from "bcrypt";
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { Model } from 'mongoose';


@Injectable()
export class AuthService {
    constructor(
        @InjectModel(User.name)
        private model: Model<UserDocument>
    ){}

    async signUp(authCredentialDto: AuthCredentialDto){
        const {username, password} = authCredentialDto;
        // hash
        return await new this.model({
            username, 
            password
        }).save();    
    }
}
