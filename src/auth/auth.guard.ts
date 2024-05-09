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
    const jwtstring = request.headers.authorization.split('Bearer ')[1];

    request.user = this.authService.verify(jwtstring);

    this.authService.verify(jwtstring);

    return true;
  }
}
