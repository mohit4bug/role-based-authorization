import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common'
import { Observable } from 'rxjs'
import { extractAuthTokenFromCookie } from '@/utils/cookie-parser'
import * as jwt from 'jsonwebtoken'

/*
 * This custom guard is responsible for verifying the existence of an access token in the request's cookie.
 * It then proceeds to validate the token, and if valid, it checks if the role included in the payload (req.user.role)
 * is present in the 'roles' array provided during guard instantiation.
 */

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private readonly roles: string[]) {}

  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest()
    const cookies = extractAuthTokenFromCookie(request.headers.cookie)
    const access_token = cookies.auth_token

    if (access_token) {
      try {
        const user = jwt.verify(access_token, 'super-secret-cat')
        request.user = user
        return this.roles.includes(request.user.role)
      } catch (error) {
        return false
      }
    } else {
      return false
    }
  }
}
