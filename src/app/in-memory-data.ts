import { Injectable } from '@angular/core';

import { InMemoryDbService } from 'angular-in-memory-web-api';

import { Book } from '../book';

@Injectable({
  providedIn: 'root'
})
export class InMemoryData implements InMemoryDbService {

  createDb() {
    const books = [
      {
        id: 1,
        title: 'El problema de los tres cuerpos',
        author: 'Cixin Liu',
        pages: 400
      },
      {
        id: 2,
        title: 'El bosque oscuro',
        author: 'Cixin Liu',
        pages: 528
      },
      {
        id: 3,
        title: 'El fin de la muerte',
        author: 'Cixin Liu',
        pages: 768
      },
      {
        id: 4,
        title: 'Frankenstein o el moderno Prometeo',
        author: 'Mary Shelley',
        pages: 280
      }
    ];
    return { books };
  }

  genId(books: Book[]): number {
    const ids = books.map(book => book.id)
      .filter((id): id is number => id !== undefined);

    return ids.length > 0 ? Math.max(...ids) + 1 : 1;
  }

}
