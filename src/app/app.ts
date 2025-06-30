import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet, RouterModule } from '@angular/router';
import { Search } from './search/search';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FormsModule, RouterModule, Search],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected title = 'angular-book-manager';
}
