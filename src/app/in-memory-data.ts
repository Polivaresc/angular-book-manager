import { Injectable } from '@angular/core';

import { InMemoryDbService } from 'angular-in-memory-web-api';

import { BOOKS } from '../mock-books';

import { Book } from '../book';

@Injectable({
  providedIn: 'root'
})
export class InMemoryData implements InMemoryDbService {

  createDb() {
    const books = BOOKS;
    return { books };
  }

  genId(books: Book[]): number {
    const ids = books.map(book => book.id)
      .filter((id): id is number => id !== undefined);

    return ids.length > 0 ? Math.max(...ids) + 1 : 1;
  }

}
