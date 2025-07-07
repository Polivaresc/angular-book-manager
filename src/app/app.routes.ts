import { Routes } from '@angular/router';
import { BookList } from './book-list/book-list';
import { BookDetail } from './book-detail/book-detail';
import { AddBook } from './add-book/add-book';

export const routes: Routes = [
    { path: '', redirectTo: '/books', pathMatch: 'full'},
    { path: 'books', component: BookList },
    { path: 'favorites',  component: BookList, data: {showFavorites: true}},
    { path: 'add-book', component: AddBook},
    { path: 'detail/:id', component: BookDetail}
];
