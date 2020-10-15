import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { LoginDTO, RegisterDTO } from './auth.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(
        private userService: UserService,
        private authService: AuthService,
        
      ) {}
  @Post('login')
  async login(@Body() UserDTO: LoginDTO) {
    const user = await this.userService.findByLogin(UserDTO);
    const payload = {
      email: user.email,
    };
    const token = await this.authService.signPayload(payload);
    return { user, token };
  }

  @Post('register')
  async register(@Body() UserDTO: RegisterDTO) {
    const user = await this.userService.create(UserDTO);
    const payload = {
      firstName: user.firstName,
      lastName:user.lastName,
      email: user.email,
    };

    const token = await this.authService.signPayload(payload);
    return { user, token };
  }
}
