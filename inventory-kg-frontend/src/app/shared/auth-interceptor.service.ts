import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {UserService} from '../service/user.service';
import {exhaust, exhaustMap, take} from 'rxjs/operators';

@Injectable()
export class AuthInterceptorSevice implements HttpInterceptor{

  constructor(private userService:UserService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return this.userService.user.pipe(
      take(1),
      exhaustMap(user=>{
        if (!user)
          return next.handle(req);
        const modifiedRequest=req.clone({headers:new HttpHeaders().append("auth-token",user.authToken)});
        return next.handle(modifiedRequest)
      })
    );

  }

}
