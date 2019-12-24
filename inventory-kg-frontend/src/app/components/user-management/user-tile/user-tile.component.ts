import {Component, Input, OnInit} from '@angular/core';
import {User} from '../../../model/user.model';
import {Observable} from 'rxjs';
import {Group} from '../../../model/group.model';
import {UserService} from '../../../service/user.service';

@Component({
  selector: 'app-user-tile',
  templateUrl: './user-tile.component.html',
  styleUrls: ['./user-tile.component.scss']
})
export class UserTileComponent implements OnInit {

  @Input("user")user:User;
  groups:Observable<Group[]>;

  constructor(private userService:UserService) { }

  ngOnInit() {
    this.groups=this.userService.getGroupsByUser(this.user._id);
  }

}
