import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Group} from '../model/group.model';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GroupService {

  constructor(private http:HttpClient) { }

  public createGroup(group: Group){}

  public updateGroup(group: Group){}

  public deleteGroup(id: number){}

  public getGroupById(id):Observable<Group>{
    return this.http.get<Group>(environment.apiURL+"groups/"+id);
  }

  public getGroups():Observable<Group[]>{
    return this.http.get<Group[]>(environment.apiURL+"groups");
  }

}
