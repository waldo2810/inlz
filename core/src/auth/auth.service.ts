import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from 'src/user/user.entity';
import { UserService } from 'src/user/user.service';
import { RegisterRequestDto } from './dto/register-request.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.userService.findOneByEmail(email);
    const isMatch: boolean = bcrypt.compareSync(password, user.password);
    if (!isMatch) {
      throw new BadRequestException('Password does not match');
    }
    return user;
  }

  async login(user: User): Promise<AccessToken> {
    const payload = { email: user.email, id: user.id };
    return { access_token: this.jwtService.sign(payload) };
  }

  async register(user: RegisterRequestDto): Promise<AccessToken> {
    const existingUser = await this.userService.findOneByEmailNoValidate(
      user.email,
    );
    if (existingUser) {
      throw new BadRequestException('Email already exists');
    }
    const hashedPassword = await bcrypt.hash(user.password, 8);
    const newUser: User = { ...user, password: hashedPassword };
    await this.userService.create(newUser);
    return this.login(newUser);
  }

  async decode(token: string): Promise<AccessTokenDecoded> {
    try {
      return this.jwtService.decode(token);
    } catch (e) {
      throw new BadRequestException('Invalid token');
    }
  }
}
