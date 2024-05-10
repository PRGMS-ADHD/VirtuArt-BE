import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import AuthService from './auth.service';

@Injectable()
export default class AuthGuard implements CanActivate {
  constructor(private authService: AuthService) {}

  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    return this.validateRequest(request);
  }

  private validateRequest(request: any) {
    try {
      if (!request.headers.authorization) {
        throw new Error('인증 토큰이 없습니다.');
      }
      const jwtstring = request.headers.authorization.split('Bearer ')[1];

      request.user = this.authService.verify(jwtstring);

      this.authService.verify(jwtstring);

      if (request.params.email && request.user.email !== request.param.email) {
        throw new Error('다른 사용자의 정보에 접근할 수 없습니다.');
      }

      return true;
    } catch (e) {
      console.error(e.message);
      return false;
    }
  }
}
