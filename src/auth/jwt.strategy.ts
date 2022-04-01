import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtPayload } from './jwt-payload.interface';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
      private readonly authService: AuthService,
      private model: Model<UserDocument>,

      ) {
    super({
      ignoreExpiration: false,
      secretOrKey: 'topSecret51',
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),

    });
  }

  async validate(payload: JwtPayload): Promise<User>{
    const { username } = payload;

    const user = await this.model.findOne({username});
    if (!user) {
      throw new UnauthorizedException()
    }
    return user;
  }
}