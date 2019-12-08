import {Component, HostListener, OnDestroy, OnInit} from '@angular/core';
import {UserService} from '../../service/user.service';
import {Subscription} from 'rxjs';
import {User} from '../../model/user.model';
import {Router} from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit,OnDestroy {
  isAuthenticated:boolean=false;
  currentUser:User;
  private userSub:Subscription;

  windowWidth:number;

  constructor(private userService:UserService,
              private router:Router) { }

  ngOnInit() {
    this.userSub=this.userService.user.subscribe(user=>{
        this.isAuthenticated=!!user;
        this.currentUser=user;
    });
  }
  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.windowWidth=event.target.innerWidth
  }

  ngOnDestroy(): void {
  this.userSub.unsubscribe();
  }

  logout() {
    this.userService.logout();
  }
}
