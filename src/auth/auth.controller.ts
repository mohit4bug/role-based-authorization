import { Controller, Post, Res } from '@nestjs/common'
import { AuthService } from '@/auth/auth.service'
import { Response } from 'express'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async loginUser(@Res() res: Response) {
    const access_token = await this.authService.loginUser()
    res.cookie('auth_token', access_token)
    res.send('success')
  }
}
