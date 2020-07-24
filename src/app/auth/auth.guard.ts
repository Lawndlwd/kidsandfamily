import { map } from 'rxjs/operators';
import { AuthService } from './../services/auth/auth.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, UrlTree } from '@angular/router'
import { Observable } from 'rxjs';

@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate {

    constructor(private authService: AuthService,private route: Router){}

    canActivate(route: ActivatedRouteSnapshot, router: RouterStateSnapshot): boolean  | UrlTree | Promise<boolean | UrlTree> | Observable<boolean | UrlTree> {
      return  this.authService.user.pipe(map(user => {
          const isAuth = !!user
          if (isAuth){
              return true;
          } else{
              return this.route.createUrlTree(['/auth']);
          }
      }));
    }
}