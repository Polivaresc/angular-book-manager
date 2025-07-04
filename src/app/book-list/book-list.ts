import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
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

  constructor(private bookService: BookService) {}

  ngOnInit(): void {
    this.bookService.getBooks()
    .subscribe(books => this.books = books);
  }

  delete(book: Book): void {
    if (book && book.id !== undefined) {
      this.books = this.books.filter(b => b !== book);
      this.bookService.deleteBook(book.id).subscribe();
    }
  }
}
