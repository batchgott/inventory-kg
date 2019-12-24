import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {UserService} from '../service/user.service';
import {Observable} from 'rxjs';
import {map, take} from 'rxjs/operators';
import {ERole} from '../model/user.model';

@Injectable({
  providedIn:"root"
})
export class AdminAuthGuard implements CanActivate{
  constructor(private userService:UserService,
              private router:Router) {
  }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.userService.user.pipe(take(1),map(user=>{
      if (!user) {
        this.router.navigate(['login']);
        return false;
      }
      else if (user.role==ERole.ADMIN)
        return true;
      else {
        this.router.navigate(['groups']);
        return false;
      }
    }));
  }

}
