import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable, Subject, throwError} from 'rxjs';
import {environment} from '../../environments/environment';
import {User} from '../model/user.model';
import {catchError, tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public currentUser:Subject<User>=new Subject<User>();

  constructor(private httpClient:HttpClient) { }

  public signup(firstName:string,lastName:string,password:string){
    return this.httpClient.post(environment.apiURL+"users/register",{
      "firstName":firstName,
      "lastName":lastName,
      "password":password
    });
  }

  public login(username:string,password:string){
    return this.httpClient.post<User>(environment.apiURL+"users/login",{
      "username":username,
      "password":password
    }).pipe(catchError(this.handleError),tap(resData=>{
      const user:User=resData;
      this.currentUser.next(user);
    }));
  }

  public createUser(user: User){}

  public updateUser(user: User){}

  public deleteUser(id: number){}

  public getUserById(id: number){}

  public getUsers():Observable<User[]>{
    return this.httpClient.get<User[]>(environment.apiURL+"users");
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
