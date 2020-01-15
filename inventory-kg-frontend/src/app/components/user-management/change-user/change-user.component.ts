import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {take} from 'rxjs/operators';
import {UserService} from '../../../service/user.service';
import {User} from '../../../model/user.model';
import {Observable} from 'rxjs';
import {Group} from '../../../model/group.model';
import {GroupService} from '../../../service/group.service';
import {group} from '@angular/animations';
import {ConfirmationDialogComponent} from '../../../shared/confirmation-dialog/confirmation-dialog.component';
import {MatDialog, MatSnackBar} from '@angular/material';
import {error} from 'util';

@Component({
  selector: 'app-change-user',
  templateUrl: './change-user.component.html',
  styleUrls: ['./change-user.component.scss']
})
export class ChangeUserComponent implements OnInit {
  changeUserForm=new FormGroup({
    firstname:new FormControl('',[Validators.required]),
    lastname:new FormControl('',[Validators.required]),
    username:new FormControl('',[Validators.required])
  });
  user:User;
  groups:Group[]=[];
  selectedGroups:Group[]=[];
  constructor(private route:ActivatedRoute,
              private userService:UserService,
              private groupService:GroupService,
              private dialog:MatDialog,
              private router:Router,
              private snackBar:MatSnackBar) { }

  ngOnInit() {

    this.route.params.pipe(take(1)).subscribe(params=>{
      this.userService.getUserById(params['userid']).pipe(take(1)).subscribe(user=>{
        this.user=user;
        this.changeUserForm=new FormGroup({
          firstname:new FormControl(user.firstName,[Validators.required]),
          lastname:new FormControl(user.lastName,[Validators.required]),
          username:new FormControl(user.username,[Validators.required])
        });
        this.groupService.getGroups().pipe(take(1)).subscribe(allGroups=>{
          this.userService.getGroupsByUser(user._id).pipe(take(1)).subscribe(selectedGroups=>{
            allGroups.forEach(group=>{
              selectedGroups.forEach(sGroup=>{
                if (sGroup._id==group._id)
                  this.selectedGroups.push(group);
              });
            });
            this.groups=allGroups;
          });
        });
      })
    });
  }

  changeUser() {
    this.userService.update(
      this.user._id,
      this.changeUserForm.get("firstname").value,
      this.changeUserForm.get('lastname').value,
      this.changeUserForm.get("username").value
    ).pipe(take(1)).subscribe(user=>{
      this.userService.updateGroups(this.user._id,this.selectedGroups).pipe(take(1)).subscribe(()=>{},
        err=>{
        this.snackBar.open("Es ist ein Fehler aufgetreten","Schließen",{duration:10000,panelClass:['warn-snackbar']});
      });
      this.router.navigate(['/users']);
    },err=>{
      if (err["error"]["error"]=="Username already taken")
        this.snackBar.open("Dieser Benutzername ist schon vergeben","Schließen",{duration:10000,panelClass:['warn-snackbar']});
      else
      this.snackBar.open("Es ist ein Fehler aufgetreten","Schließen",{duration:10000,panelClass:['warn-snackbar']});
    })
  }

  deleteUser() {
    const dialogRef=this.dialog.open(ConfirmationDialogComponent,{
      width:"350px",
      data:`Wollen Sie den Benutzer "${this.user.username}" wirklich löschen?`
    });
    dialogRef.afterClosed().subscribe(result=>{
      if (result){
        this.userService.deleteUser(this.user._id).pipe(take(1)).subscribe(()=>
          this.router.navigate(['/users']),
            err=> this.snackBar.open("Es ist ein Fehler aufgetreten","Schließen",{duration:10000,panelClass:['warn-snackbar']})
        )
      }
    })

  }
}
