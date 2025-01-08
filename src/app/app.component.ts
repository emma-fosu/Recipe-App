import { Component } from '@angular/core';
import { RecipesListComponent } from './recipes-list/recipes-list.component';
import { NewRecipeComponent } from './new-recipe/new-recipe.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    NewRecipeComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Recipe-App';
}
