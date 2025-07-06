import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

import { BookService } from '../book-service';
import { Book } from '../../book';
import { ConfirmationDialog } from '../confirmation-dialog/confirmation-dialog';

@Component({
  selector: 'app-book-list',
  imports: [RouterModule],
  templateUrl: './book-list.html',
  styleUrl: './book-list.css'
})
export class BookList {
  books: Book[] = [];
  headers: { key: keyof Book; label: string }[] = [
    { key: 'id', label: '#'},
    { key: 'title', label: 'Title'},
    { key: 'author', label: 'Author'},
    { key: 'pages', label: 'Pages'}
  ];

  constructor(
    private bookService: BookService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
  ) {}

  ngOnInit(): void {
    this.bookService.getBooks()
    .subscribe(books => this.books = books);
  }

  sortBooks(key: keyof Book): void {
    this.books.sort((a, b) => {
      let prev = a[key];
      let next = b[key];

      if (typeof prev === 'string' && typeof next === 'string') {
        prev = prev.toUpperCase();
        next = next.toUpperCase();
      }

      if (prev && next) {
        if (prev < next) return -1;
        if (prev > next) return 1;
      }
      return 0;
    });

    this.snackBar.open(`Books sorted by ${key}`, 'Close', {duration: 2000});
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
        this.delete(book);
      }
    });
  }

  delete(book: Book): void {
    if (book && book.id !== undefined) {
      this.books = this.books.filter(b => b !== book);
      this.bookService.deleteBook(book.id).subscribe();
      this.snackBar.open(`Book #${book.id} deleted`, 'Close', {duration: 3000});
    }
  }
}
