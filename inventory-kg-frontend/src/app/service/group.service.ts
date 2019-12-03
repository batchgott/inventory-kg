import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Group} from '../model/group.model';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GroupService {

  constructor(private httpClient:HttpClient) { }

  public createGroup(group: Group){}

  public updateGroup(group: Group){}

  public deleteGroup(id: number){}

  public getGroupById(id: number){}

  public getGroups():Observable<Group[]>{
    return this.httpClient.get<Group[]>(environment.apiURL+"groups");
  }

}
