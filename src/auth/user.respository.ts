import { ConflictException, InternalServerErrorException } from "@nestjs/common";
import { EntityRepository, Repository } from "typeorm";
import { AuthCredentialDto } from "./dto/auth-credentials.dto";
import * as bcrypt from "bcrypt";
import { User } from "./schemas/user.schema";

@EntityRepository(User)
export class UserRepository extends Repository<User> {
    async createUser(authCredentialDto: AuthCredentialDto): Promise<void> {
        const {username, password} = authCredentialDto;
        // hash
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);
        console.log('salt', salt);
        console.log('hashedPassword', hashedPassword);
        
        const user = this.create({username, password: hashedPassword});
        try {
            await this.save(user);
        }catch(error){
            console.log(error.code);
            if(error.code === '19888'){
                throw new ConflictException('Username already exists')
            }else{
                throw new InternalServerErrorException();
            }
        }
    }
}