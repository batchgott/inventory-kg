import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MatSnackBar} from '@angular/material';
import {UserService} from '../../../service/user.service';
import {take} from 'rxjs/operators';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';
import {Group} from '../../../model/group.model';
import {GroupService} from '../../../service/group.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {

  addUserForm=new FormGroup({
    firstname:new FormControl('',[Validators.required]),
    lastname:new FormControl('',[Validators.required]),
    password:new FormControl('',[Validators.required,Validators.minLength(6)]),
    repeatPassword:new FormControl('',[Validators.required,Validators.minLength(6)])
  });
  groups:Observable<Group[]>;
  selectedGroups:Group[]=[];
  constructor(private snackBar:MatSnackBar,
              private userService:UserService,
              private router:Router,
              private groupService:GroupService) { }

  ngOnInit() {
    this.groups=this.groupService.getGroups();
  }


  matchingPasswords():boolean{
    return this.addUserForm.get("password").value==this.addUserForm.get("repeatPassword").value
  }

  addUser() {
    this.userService.signup(
      this.addUserForm.get("firstname").value,
      this.addUserForm.get('lastname').value,
      this.addUserForm.get("password").value
      ).pipe(take(1)).subscribe(user=>{
        this.userService.updateGroups(user._id,this.selectedGroups).pipe(take(1)).subscribe(()=>{},
            err=>this.snackBar.open("Es ist ein Fehler aufgetreten","Schließen",{duration:10000,panelClass:['warn-snackbar']}))
      this.snackBar.open(`Der Benutzer ${user.username} wurde erstellt`,null,{duration:3000});
      this.router.navigate(['/users']);
    },err=>{
      this.snackBar.open("Es ist ein Fehler aufgetreten","Schließen",{duration:10000,panelClass:['warn-snackbar']});
    })
  }
}
