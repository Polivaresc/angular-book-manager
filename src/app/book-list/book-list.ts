import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MatSnackBar } from '@angular/material/snack-bar';

import { BookService } from '../book-service';
import { Book } from '../../book';

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
    private snackBar: MatSnackBar
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

  delete(book: Book): void {
    if (book && book.id !== undefined) {
      this.books = this.books.filter(b => b !== book);
      this.bookService.deleteBook(book.id).subscribe();
      this.snackBar.open(`Book #${book.id} deleted`, 'Close', {duration: 3000});
    }
  }
}
