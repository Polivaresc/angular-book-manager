import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { BookService } from '../book-service';
import { Book } from '../../book';

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
    private location: Location
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

  delete(): void {
    if (this.book && this.book.id !== undefined) {
      this.bookService.deleteBook(this.book.id).subscribe(() => this.goBack());
    }
  }
}
