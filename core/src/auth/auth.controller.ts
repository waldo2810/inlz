import {
  Controller,
  Post,
  UseGuards,
  Request,
  Body,
  Get,
  Headers,
  BadRequestException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { RegisterRequestDto } from './dto/register-request.dto';
import { Public } from './decorators/public.decorator';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Request() req: any) {
    return await this.authService.login(req.user);
  }

  @Public()
  @Post('register')
  async register(@Body() body: RegisterRequestDto) {
    return await this.authService.register(body);
  }

  @Public()
  @Get('decode')
  async decode(@Headers('Authorization') authHeader: string) {
    if (!authHeader) {
      throw new BadRequestException('Authorization header not found');
    }
    const token = authHeader.split(' ')[1];
    if (!token) {
      throw new BadRequestException('Token not found in authorization header');
    }
    const decoded = await this.authService.decode(token);
    return decoded;
  }
}
