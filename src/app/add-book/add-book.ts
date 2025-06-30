import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { BookService } from '../book-service';
import { Book } from '../../book';
import { InvalidData } from '../invalidData';

@Component({
  selector: 'app-add-book',
  imports: [FormsModule],
  templateUrl: './add-book.html',
  styleUrl: './add-book.css'
})
export class AddBook {
    books: Book[] = [];

    invalidData: InvalidData[] = [
      { errorCode: 1, errorType: 'missingTitle', errorMessage: 'Title is required', active: false},
      { errorCode: 2, errorType: 'missingAuthor', errorMessage: 'Author is required', active: false},
      { errorCode: 3, errorType: 'missingPages', errorMessage: 'Number of pages is required', active: false},
      { errorCode: 4, errorType: 'invalidPages', errorMessage: 'Number of pages must be a number above 0', active: false}
    ];

    constructor(private bookService: BookService, private router: Router) {}
  
    ngOnInit(): void {
      this.bookService.getBooks()
      .subscribe(books => this.books = books);
    }

   add(title: string, author: string, pages: number): void {
    title = title.trim();
    author = author.trim();
    this.validate(title, author, pages);

    if (!title || !author || pages <= 0) {
      return; 
    } 

    const newBook: Book = { title, author, pages };

    this.bookService.addBook(newBook)
      .subscribe(book => {
        this.books.push(book);
        this.router.navigate(['/books']);
      })
  }

  validate(title: string, author: string, pages: number): void {

    if (!title) {
      this.invalidData.map(error => error.errorType === 'missingTitle' ? error.active = true : false);
    } else {
      this.invalidData.map(error => error.errorType === 'missingTitle' ? error.active = false : true);
    }

    if (!author) {
      this.invalidData.map(error => error.errorType === 'missingAuthor' ? error.active = true : false);
    } else {
      this.invalidData.map(error => error.errorType === 'missingAuthor' ? error.active = false : true);
    }

    if (!pages) {
      this.invalidData.map(error => error.errorType === 'missingPages' ? error.active = true : false);
    } else {
      this.invalidData.map(error => error.errorType === 'missingPages' ? error.active = false : true);
    }

    if (pages <= 0) {
      this.invalidData.map(error => error.errorType === 'invalidPages' ? error.active = true : false);
    } else {
      this.invalidData.map(error => error.errorType === 'invalidPages' ? error.active = false : true);
    }

  }
}
