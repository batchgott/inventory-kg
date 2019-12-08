import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Book} from '../model/book.model';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor(private http:HttpClient) { }

  public getBooksByGroup(groupId):Observable<Book[]>{
    return this.http.get<Book[]>(environment.apiURL+"groups/"+groupId+"/books");
  }
}
