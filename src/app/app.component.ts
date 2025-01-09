import { Component } from '@angular/core';
import { RecipesListComponent } from './recipes-list/recipes-list.component';
import { RouterModule } from '@angular/router';
import { NaveComponent } from './nave/nave.component';



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    NaveComponent,
    RouterModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Recipe-App';
}
