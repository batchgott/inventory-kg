import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {merge, Observable, of} from 'rxjs';
import {Book} from '../../../model/book.model';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {BookService} from '../../../service/book.service';
import {catchError, map, startWith, switchMap, take} from 'rxjs/operators';
import {MatSnackBar, MatSort, MatTableDataSource} from '@angular/material';
import {UserService} from '../../../service/user.service';
import {ERole, User} from '../../../model/user.model';
import {GroupService} from '../../../service/group.service';
import {Group} from '../../../model/group.model';
import {FormControl, FormGroup, Validators} from '@angular/forms';


@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss']
})
export class BooksComponent implements OnInit {

  public books:Observable<Book[]>;
  public dataSource:MatTableDataSource<Book>=new MatTableDataSource<Book>();
  public group:Group;
  public currentUser:User;
  public userAllowedToEdit:boolean=false;
  public loadingData:boolean=true;
  @ViewChild('title',{static: false}) titleElement: ElementRef;
  displayedColumns: string[] = ['title', 'author', 'isbn'];
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  addBookForm=new FormGroup({
    title:new FormControl('',[Validators.required]),
    author:new FormControl(''),
    isbn:new FormControl('')
  });
  public addBookOpen:boolean=false;

  constructor(private router:Router,
              private route:ActivatedRoute,
              private bookService:BookService,
              private userService:UserService,
              private groupService:GroupService,
              private snackBar:MatSnackBar) { }

  applyFilter(filterTarget) {
    this.dataSource.filter = filterTarget.value.trim().toLowerCase();
  }

  ngOnInit() {
    this.userService.user.subscribe((user:User)=>{
      this.currentUser=user;
      this.groupService.getGroupById(this.route.snapshot.paramMap.get("groupid"))
        .pipe(take(1)).subscribe(group=>{
          this.group=group;
          if (user&&(user.role==ERole.ADMIN||group.users.indexOf(user._id)>-1)) {
            this.userAllowedToEdit = true;
            this.displayedColumns.push('actions');
          }
          else {
            this.userAllowedToEdit = false;
            if (this.displayedColumns.length > 3)
              this.displayedColumns.pop();
          }
        });
    });

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

  addBook() {
    this.bookService.createBook({...this.addBookForm.value,"group":this.group._id}).pipe(take(1)).subscribe(
      (data:Book)=>{
        let books=this.dataSource.data;
        books.push(data);
        this.dataSource=new MatTableDataSource<Book>(books);
        this.addBookForm.reset();
        this.titleElement.nativeElement.focus();
      },error =>
        this.snackBar.open("Buch konnte nicht hinzugefügt werden","Schließen",{duration:5000,panelClass:['warn-snackbar']})
    )
  }
}
