import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { MatSnackBar } from '@angular/material/snack-bar';

import { BookService } from '../book-service';
import { Book } from '../../book';
import { InvalidDataMap } from '../../invalidData';
import { INVALID_DATA } from '../../invalid-form-data';


@Component({
  selector: 'app-add-book',
  imports: [FormsModule],
  templateUrl: './add-book.html',
  styleUrl: './add-book.css'
})
export class AddBook {
    books: Book[] = [];
    invalidData: InvalidDataMap = INVALID_DATA;

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
    if (!this.validateForm(title, author, pages)) {
      return; 
    } 

    const newBook: Book = { isFavorite: false, title, author, pages };

    this.bookService.addBook(newBook)
      .subscribe(book => {
        this.books.push(book);
        this.snackBar.open('Book added successfully!', 'Close', {duration: 3000});
        this.router.navigate(['/books']);
      })
  }

  isFormInvalid(): boolean {
    return Object.values(this.invalidData).some(error=> error.isActive);
  }

  setFieldValidity(fieldKey: keyof InvalidDataMap, condition: boolean): void {
    this.invalidData[fieldKey].isActive = condition;
    this.isFormInvalid();
  }

  validateTitle(title: string, author?: string): void {
    this.setFieldValidity('missingTitle', !title.trim());
    if (author) {
      this.validateExistingBook(title, author);
    }
  }

  validateAuthor(author: string, title?: string): void {
    this.setFieldValidity('missingAuthor', !author.trim());
    if (title) {
      this.validateExistingBook(title, author);
    }
  }

  validatePages(pages: number): void {
    this.setFieldValidity('missingPages', !pages);
    this.setFieldValidity('invalidPages', pages <= 0);
  }

  validateExistingBook(title: string, author: string): void {
    const duplicate: boolean = this.books.some((book) => 
      book.title.toUpperCase() === title.trim().toUpperCase() &&
      book.author.toUpperCase() === author.trim().toUpperCase()
    )
    this.setFieldValidity('existingBook', duplicate);
  }

  validateForm(title: string, author: string, pages: number): boolean {
    this.validateTitle(title);
    this.validateAuthor(author);
    this.validatePages(pages);
    return !this.isFormInvalid();
  }
}
