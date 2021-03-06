import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {UserService} from '../service/user.service';
import {map, take} from 'rxjs/operators';

@Injectable({
  providedIn:"root"
})
export class AuthGuard implements CanActivate{
  constructor(private userService:UserService,
              private router:Router) {
  }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.userService.user.pipe(take(1),map(user=>{
      if (user)
        return true;
      this.router.navigate(['login']);
      return false;
    }));
  }

}
