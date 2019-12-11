import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Book} from '../../../../model/book.model';

@Component({
  selector: 'app-edit-books',
  templateUrl: './edit-book.component.html',
  styleUrls: ['./edit-book.component.scss']
})
export class EditBookComponent implements OnInit {

  editBookForm=new FormGroup({
    title:new FormControl('',[Validators.required]),
    author:new FormControl(''),
    isbn:new FormControl('')
  });
  constructor(private dialogRef:MatDialogRef<EditBookComponent>,
              @Inject(MAT_DIALOG_DATA) public book: Book) { }

  ngOnInit() {
    this.editBookForm.setValue({
      title:this.book.title,
      author:this.book.author?this.book.author:"",
      isbn:this.book.isbn?this.book.isbn:""
    })
  }

  cancel() {
    this.dialogRef.close();
  }
}
