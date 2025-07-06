import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { MatSnackBar } from '@angular/material/snack-bar';

import { BookService } from '../book-service';
import { Book } from '../../book';
import { InvalidDataMap } from '../invalidData';


@Component({
  selector: 'app-add-book',
  imports: [FormsModule],
  templateUrl: './add-book.html',
  styleUrl: './add-book.css'
})
export class AddBook {
    books: Book[] = [];

    invalidData: InvalidDataMap = {
      'missingTitle': { errorCode: 1, errorMessage: 'Title is required', isActive: false },
      'missingAuthor': { errorCode: 2, errorMessage: 'Author is required', isActive: false },
      'missingPages': { errorCode: 3, errorMessage: 'Number of pages is required', isActive: false},
      'invalidPages': { errorCode: 4, errorMessage: 'Number of pages must be a number above 0', isActive: false }
    };

    constructor(
      private bookService: BookService, 
      private router: Router,
      private snackBar: MatSnackBar
    ) {}
  
    ngOnInit(): void {
      this.bookService.getBooks()
      .subscribe(books => this.books = books);
    }

   add(title: string, author: string, pages: number): void {
    title = title.trim();
    author = author.trim();

    this.validateForm(title, author, pages);

    if (!title || !author || pages <= 0) {
      return; 
    } 

    const newBook: Book = { title, author, pages };

    this.bookService.addBook(newBook)
      .subscribe(book => {
        this.books.push(book);
        this.snackBar.open('Book added successfully!', 'Close', {duration: 3000});
        this.router.navigate(['/books']);
      })
  }

  invalidForm(): boolean {
    return Object.values(this.invalidData).some(error=> error.isActive);
  }

  validateField(fieldKey: keyof InvalidDataMap, condition: boolean): void {
    this.invalidData[fieldKey].isActive = condition;
    this.invalidForm();
  }

  validateTitle(title: string): void {
    this.validateField('missingTitle', !title.trim());
  }

  validateAuthor(author: string): void {
    this.validateField('missingAuthor', !author.trim());
  }

  validatePages(pages: number): void {
    this.validateField('missingPages', !pages);
    this.validateField('invalidPages', pages <= 0);
  }

  validateForm(title: string, author: string, pages: number): void {
    this.validateTitle(title);
    this.validateAuthor(author);
    this.validatePages(pages);
  }
}
