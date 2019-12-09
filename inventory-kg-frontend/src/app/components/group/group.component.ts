import {AfterViewInit, Component, OnInit} from '@angular/core';
import {map, switchMap, take, tap} from 'rxjs/operators';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {GroupService} from '../../service/group.service';
import {Observable} from 'rxjs';
import {Group} from '../../model/group.model';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.scss']
})
export class GroupComponent implements AfterViewInit {

  public group:Group;

  constructor(private route:ActivatedRoute,
              private groupService:GroupService,
              private router:Router) { }

  ngAfterViewInit() {
    this.route.paramMap.subscribe(params=>{
      this.groupService.getGroupById(params.get("groupid")).pipe(take(1)).subscribe(group=>this.group=group);
    });
  }

}
