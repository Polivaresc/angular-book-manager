import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { RouterModule } from '@angular/router';

import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

import { Book } from '../../book';
import { BookService } from '../book-service';

@Component({
  selector: 'app-search',
  imports: [AsyncPipe, RouterModule],
  templateUrl: './search.html',
  styleUrl: './search.css'
})
export class Search implements OnInit {
  books$!: Observable<Book[]>;

  private searchTerms = new Subject<string>();

  constructor(private bookService: BookService) {}

  search(term: string): void {
    this.searchTerms.next(term);
  }

  clearInput(searchBox: HTMLInputElement): void {
    searchBox.value = '';
    this.search('');
  }

  ngOnInit(): void {
    this.books$ = this.searchTerms.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((term: string) => 
      this.bookService.searchBooks(term))
    );
  }

}
