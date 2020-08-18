import { map } from 'rxjs/operators';
import { AuthService } from '../services/auth/auth.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import {ProfileService} from '../services/profile/profile.service';

@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate {

    constructor(private authService: AuthService, private route: Router){}

    canActivate(route: ActivatedRouteSnapshot,
                router: RouterStateSnapshot
    ): boolean  | UrlTree | Promise<boolean | UrlTree> | Observable<boolean | UrlTree> {
        return  this.authService.user.pipe(map(user => {
            const isAuth = !!user;

            if (isAuth){
                return true;
            } else{
                 this.route.navigateByUrl('/auth');
                 return false;
            }
        }));
    }
}


@Injectable({providedIn: 'root'})

export class AdminGuard implements CanActivate {
  constructor(private authService: AuthService, private profileService: ProfileService, private route: Router){}
  admin: boolean;
  canActivate(route: ActivatedRouteSnapshot,
              router: RouterStateSnapshot
  ): boolean  | UrlTree | Promise<boolean | UrlTree> | Observable<boolean | UrlTree> {
    if (this.profileService.token) {
      return this.profileService.getUserInfo()
        .pipe(map(res => {
          const isAuth = res.roles.includes('ROLE_SUPER_ADMIN');
          if (isAuth) {
            return true;
          } else {
            this.route.navigateByUrl('/not-allowed');
            return false;
          }
        }));
    }else {
      return this.route.createUrlTree(['/auth']);
    }
  }
}
