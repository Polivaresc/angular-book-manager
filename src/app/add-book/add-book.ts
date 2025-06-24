import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { BookService } from '../book-service';
import { Book } from '../../book';

@Component({
  selector: 'app-add-book',
  imports: [],
  templateUrl: './add-book.html',
  styleUrl: './add-book.css'
})
export class AddBook {
    books: Book[] = [];
  
    constructor(private bookService: BookService, private router: Router) {}
  
    ngOnInit(): void {
      this.bookService.getBooks()
      .subscribe(books => this.books = books);
    }

   add(title: string, author: string, pages: number): void {
    title = title.trim();
    author = author.trim();
    
    if (!title || !author || pages <= 0) { return; }

    const newBook: Book = { title, author, pages };

    this.bookService.addBook(newBook)
      .subscribe(book => {
        this.books.push(book);
        this.router.navigate(['/books']);
      })
  }
}
