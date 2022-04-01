import { ConflictException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialDto } from './dto/auth-credentials.dto';
import { UserRepository } from './user.respository';
import * as bcrypt from "bcrypt";
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { Model } from 'mongoose';
import { JwtPayload } from './jwt-payload.interface';
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class AuthService {
    constructor(
        @InjectModel(User.name)
        private model: Model<UserDocument>,
        private jwtService: JwtService,

        // @InjectRepository(UserRepository)
        // private userRepository: UserRepository
    ){}
    async findOne(authCredentialDto: AuthCredentialDto){
        const {username} = authCredentialDto
        const user = await this.model.findOne({username})
        return user
    }

    async signUp(authCredentialDto: AuthCredentialDto){
        const {username, password} = authCredentialDto;
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);
        console.log('salt', salt);
        console.log('hashedPassword', hashedPassword);
        const user = await this.model.findOne({username: username})
        if(user){
            throw new ConflictException('Username already exists');

        }else{
            return await new this.model({
                username, 
                password: hashedPassword
            }).save();
        }
    }
    async signIn(authCredentialDto: AuthCredentialDto): Promise<{accessToken: string}>{
        const {username, password} = authCredentialDto;
        const user = await this.model.findOne({username: username});
        
        if(user && (await bcrypt.compare( password,user.password))){
            const payload: JwtPayload = {username};
            const accessToken: string = await this.jwtService.sign(payload);
            return {accessToken};
        }else{
            throw new UnauthorizedException('Please check your login credentials')
        }
    }
}
