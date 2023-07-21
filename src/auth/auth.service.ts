import { Injectable } from '@nestjs/common'
import * as crypto from 'crypto'
import * as jwt from 'jsonwebtoken'

@Injectable()
export class AuthService {
  constructor() {}

  // return access token
  async loginUser() {
    const user = {
      id: crypto.randomBytes(16).toString('hex'),
      role: 'user'
    }
    return jwt.sign(user, 'super-secret-cat')
  }
}
