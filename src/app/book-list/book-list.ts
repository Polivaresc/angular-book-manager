import { Component } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';

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
    { key: 'isFavorite', label: 'Favorite'},
    { key: 'title', label: 'Title'},
    { key: 'author', label: 'Author'},
    { key: 'pages', label: 'Pages'}
  ];

  showOnlyFavorites = false;

  constructor(
    private bookService: BookService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.bookService.getBooks()
    .subscribe(books => this.books = books);

    this.route.url.subscribe((url) => {
      this.showOnlyFavorites = url.some(segment => segment.path === 'favorites');
    })
  }

  get filteredBooks(): Book[] {
    return this.showOnlyFavorites ? this.books.filter(book => book.isFavorite) : this.books;
  }

  toggleIsFavorite(book: Book): void {
    book.isFavorite = !book.isFavorite;
    this.bookService.updateBook(book).subscribe();
    if (book.isFavorite) {
      this.snackBar.open(`Book #${book.id} added to favorites`, 'Close', {duration: 2000});
    } else {
      this.snackBar.open(`Book #${book.id} removed from favorites`, 'Close', {duration: 2000});
    }
  }

  sortBooks(key: keyof Book): void {
    this.books.sort((a, b) => {
      let prev = a[key];
      let next = b[key];

      if (typeof prev === 'string' && typeof next === 'string') {
        prev = prev.toUpperCase();
        next = next.toUpperCase();
        if (prev < next) return -1;
        if (prev > next) return 1;
      }

      else if (typeof prev === 'number' && typeof next === 'number') {
        return prev - next;
      }

      else if (typeof prev === 'boolean' && typeof next === 'boolean') {
        return (prev === next) ? 0 : prev ? -1 : 1;
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
