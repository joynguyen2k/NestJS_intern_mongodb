import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schemas/user.schema';


@Module({
  providers: [AuthService],
  controllers: [AuthController],
  imports: [
    MongooseModule.forFeature([{name:User.name, schema: UserSchema }]),
    // MongooseModule.forFeatureAsync([
    //   {
    //     name: User.name,
    //     useFactory: () => {
    //       const schema = UserSchema;
    //       schema.plugin(require('mongoose-unique-validator'), { message: 'your custom message' }); // or you can integrate it without the options   schema.plugin(require('mongoose-unique-validator')
    //       return schema;
    //     },
    //   },
    // ]),
  ],
})
export class AuthModule {}
