import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserAuthService } from './services/user-auth.service';
import { UserService } from './services/user.service';

export const authGuard: CanActivateFn = (route, state) => {


  const userAuthService = inject(UserAuthService);
  const userService = inject(UserService);
  const router = inject(Router);

    if (userAuthService.getToken() !== null) {
      const role = route.data['roles'] as Array<string>;

      if (role) {
        const match = userService.roleMatch(role);

        if (match) {
          return true;
        } else {
          router.navigate(['/forbidden']);
          return false;
        }
      }
    }

    router.navigate(['/login']);
    return false;
  }
  // const authService = inject(AuthService);
  // const router = inject(Router);

  // if(authService.isLogin())
  //   return true;
  // router.navigate(['login']);
  // return false
  // };

