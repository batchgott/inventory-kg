import {Component, HostListener, OnInit} from '@angular/core';
import {UserService} from './service/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'Inventar';

  constructor(private userService:UserService) {
  }

  ngOnInit(): void {
    this.userService.autoLogin();
  }


}
