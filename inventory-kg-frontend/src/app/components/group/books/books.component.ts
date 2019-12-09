import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {merge, Observable, of} from 'rxjs';
import {Book} from '../../../model/book.model';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {BookService} from '../../../service/book.service';
import {catchError, map, startWith, switchMap, take, tap} from 'rxjs/operators';
import {MatSort, MatTableDataSource} from '@angular/material';
import {DataSource} from '@angular/cdk/collections';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss']
})
export class BooksComponent implements AfterViewInit {

  public books:Observable<Book[]>;
  public dataSource:MatTableDataSource<Book>;
  public loadingData:boolean=true;
  displayedColumns: string[] = ['title', 'author', 'isbn'];
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private router:Router,
              private route:ActivatedRoute,
              private bookService:BookService) { }

  applyFilter(filterTarget) {
    this.dataSource.filter = filterTarget.value.trim().toLowerCase();
  }

  ngAfterViewInit() {
    merge(this.sort.sortChange)
      .pipe(
        startWith({}),
        switchMap(() =>
          this.route.paramMap.pipe(
            switchMap((params: ParamMap) =>
              this.bookService.getBooksByGroup(params.get('groupid'))))),
        catchError(() => of([])),
      map(books=>{
        this.loadingData=false;
        return books;
      }))
      .subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort = this.sort;
    });

  }


}
