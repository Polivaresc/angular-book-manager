import { Injectable } from '@angular/core';

import { Book } from '../book';

import { Observable, of, catchError } from 'rxjs';

import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor(
    private http: HttpClient
  ) { }

  private booksUrl = 'api/books';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  getBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(this.booksUrl)
      .pipe(
        catchError(this.handleError<Book[]>('getBooks', []))
      );
  }

  getBook(id: number): Observable<Book> {
    const url = `${this.booksUrl}/${id}`;
    return this.http.get<Book>(url)
      .pipe(
        catchError(this.handleError<Book>('getBook'))
      );
  }

  updateBook(book: Book): Observable<any> {
    return this.http.put(this.booksUrl, book, this.httpOptions)
      .pipe(
        catchError(this.handleError<any>('updateBook'))
      );
  }

  addBook(book: Book): Observable<Book> {
    return this.http.post<Book>(this.booksUrl, book, this.httpOptions)
      .pipe(
        catchError(this.handleError<Book>('addBook'))
      );
  }

  deleteBook(id: number): Observable<Book> {
    const url = `${this.booksUrl}/${id}`;
    return this.http.delete<Book>(url, this.httpOptions)
      .pipe(
        catchError(this.handleError<Book>('deleteBook'))
      );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      return of(result as T);
    }
  }
}
