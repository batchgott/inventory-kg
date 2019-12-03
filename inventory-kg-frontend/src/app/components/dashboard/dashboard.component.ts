import { Component, OnInit } from '@angular/core';
import {GroupService} from '../../service/group.service';
import {Observable} from 'rxjs';
import {Group} from '../../model/group.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  public groups:Observable<Group[]>;

  constructor(private groupService:GroupService) { }

  ngOnInit() {
    this.groups=this.groupService.getGroups();
  }

}
