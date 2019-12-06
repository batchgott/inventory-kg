import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../service/user.service';
import {User} from '../../model/user.model';
import {Observable} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {HttpErrorResponse} from '@angular/common/http';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {


  loginForm=new FormGroup({
    username:new FormControl('',[Validators.required]),
    password:new FormControl('',[Validators.required])
  });

  constructor(private userService:UserService,
              private snackBar:MatSnackBar) {
  }

  ngOnInit() {
  }

  onLogin() {
      let currentUser: Observable<User>;
      currentUser = this.userService.login(this.loginForm.get("username").value, this.loginForm.get("password").value);
      currentUser.subscribe((res: User) => {
        console.log(res);
      },errorMessage=>{
        this.snackBar.open(errorMessage,"Schließen",{duration:10000,panelClass:['warn-snackbar']});
      });
  }
}
