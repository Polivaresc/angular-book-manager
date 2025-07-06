import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { BookService } from '../book-service';
import { Book } from '../../book';
import { ConfirmationDialog } from '../confirmation-dialog/confirmation-dialog';

import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-book-detail',
  imports: [FormsModule],
  templateUrl: './book-detail.html',
  styleUrl: './book-detail.css'
})
export class BookDetail {
  book!: Book;

  constructor (
    private route: ActivatedRoute,
    private bookService: BookService,
    private location: Location,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.bookService.getBook(id)
    .subscribe(book => {
      this.book = book
      console.log(book);
    } );
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    if (this.book) {
      this.bookService.updateBook(this.book)
        .subscribe(()=> this.goBack());
    }
  }

  confirmDelete(book: Book) {
      const dialogRef = this.dialog.open(ConfirmationDialog, {
        data: {
          message: `Do you want to delete book #${book.id}?`,
          confirmButton: 'Confirm',
          cancelButton: 'Cancel'
        }
      });
      dialogRef.afterClosed().subscribe((confirmed: boolean) => {
        if (confirmed) {
          this.delete();
        }
      });
    }
  

  delete(): void {
    if (this.book && this.book.id !== undefined) {
      this.bookService.deleteBook(this.book.id).subscribe(() => this.goBack());
      this.snackBar.open(`Book #${this.book.id} deleted`, 'Close', {duration: 3000});
    }
  }
}
