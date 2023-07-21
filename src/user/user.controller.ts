import { Controller, Get, UseGuards } from '@nestjs/common'
import { RoleGuard } from '@/guards/role'
import * as crypto from 'crypto'

@Controller('users')
export class UserController {
  @Get()
  // add the roles which should exist while visiting the route
  @UseGuards(new RoleGuard(['admin']))
  async getUser() {
    return {
      id: crypto.randomBytes(16).toString('hex'),
      name: 'Mohit Khatri'
    }
  }
}
