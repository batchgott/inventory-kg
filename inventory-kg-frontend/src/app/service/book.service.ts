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

  public updateBook(book:Book){
    return this.http.put(environment.apiURL+`books/${book._id}`,{
      title:book.title,
      author:book.author,
      isbn:book.isbn
    });
  }

  public createBook(book: Book){
    return this.http.post(environment.apiURL+"books",book);
  }

  public getBooksByGroup(groupId):Observable<Book[]>{
    return this.http.get<Book[]>(environment.apiURL+"groups/"+groupId+"/books");
  }

  public deleteBook(id){
    return this.http.delete(environment.apiURL+`books/${id}`);
  }
}
