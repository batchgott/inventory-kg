import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {BehaviorSubject, Observable, Subject, throwError} from 'rxjs';
import {environment} from '../../environments/environment';
import {User} from '../model/user.model';
import {catchError, tap} from 'rxjs/operators';
import {Router} from '@angular/router';
import {Group} from '../model/group.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public user:BehaviorSubject<User>=new BehaviorSubject<User>(null);
  private expirationTimer:any;

  constructor(private http:HttpClient,
              private router:Router) { }

  public signup(firstName:string,lastName:string,password:string){
    return this.http.post(environment.apiURL+"users/register",{
      "firstName":firstName,
      "lastName":lastName,
      "password":password
    });
  }

  public login(username:string,password:string){
    return this.http.post<User>(environment.apiURL+"users/login",{
      "username":username,
      "password":password
    }).pipe(catchError(this.handleError),tap(resData=>{
      const user:User=resData;
      this.user.next(user);
      localStorage.setItem('userData',JSON.stringify(user));
      this.autoLogout(user.expirationDate);
    }));
  }

  public logout(){
    this.user.next(null);
    localStorage.removeItem("userData");
    this.router.navigate(['login']);
    if (this.expirationTimer)clearTimeout(this.expirationTimer);
    this.expirationTimer=null;
  }
  public autoLogin(){
    const user:User=JSON.parse(localStorage.getItem('userData'));
    if (!user)return;

    if (!user.expirationDate||new Date()>user.expirationDate)return;
    this.user.next(user);
    this.autoLogout(user.expirationDate);
  }

  private autoLogout(expirationDate:Date){
    this.expirationTimer=setTimeout(()=>this.logout(),new Date(expirationDate).getTime()-(new Date()).getTime());
  }

  public createUser(user: User){}

  public updateUser(user: User){}

  public deleteUser(id: number){}

  public getUserById(id: number){}

  public getGroupsByUser(userId):Observable<Group[]>{
    return this.http.get<Group[]>(environment.apiURL+`users/${userId}/groups`);
  }

  public getUsers():Observable<User[]>{
    return this.http.get<User[]>(environment.apiURL+"users");
  }

  private handleError(error:HttpErrorResponse){
    let errorMessage="Es ist ein Fehler aufgetreten";
    if (!error.error)return throwError(errorMessage);
    switch (error.error)
    {
      case "Invalid password":
        errorMessage="Falsches Passwort";break;
      case "Username does not exist":
        errorMessage="Benutzer existiert nicht";break;
      case "\"password\" length must be at least 6 characters long":
        errorMessage="Falsches Passwort";break;
  }
  return throwError(errorMessage);
  }
}
