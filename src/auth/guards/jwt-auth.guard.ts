import { Injectable, ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    // Check if JWT authentication is enabled
    const isJwtEnabled = process.env.JWT_ENABLED === 'true';
    
    // If JWT is disabled, allow all requests
    if (!isJwtEnabled) {
      return true;
    }

    // If JWT is enabled, use the default JWT authentication
    return super.canActivate(context);
  }
} 