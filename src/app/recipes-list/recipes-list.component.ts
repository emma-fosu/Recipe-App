import { ChangeDetectionStrategy, Component, OnInit, inject} from '@angular/core';
import { RecipesService } from '../services/recipes.service';
import { Recipe } from '../../models/recipe.model';

import { combineLatest, Observable, map } from 'rxjs';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { IconFieldModule } from 'primeng/iconfield';
import { RatingModule } from 'primeng/rating';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { RecipeFilterComponent } from '../recipe-filter/recipe-filter.component';
import { SharedDataService } from '../services/shared-data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recipes-list',
  standalone: true,
  imports: [
    CommonModule,
    RatingModule,
    FormsModule,
    ButtonModule,
    NgOptimizedImage,
    RecipeFilterComponent,
  ],
  templateUrl: './recipes-list.component.html',
  styleUrl: './recipes-list.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RecipesListComponent {

  private recipesService = inject(RecipesService);
  private sharedDataService =  inject(SharedDataService);
  private routerService =  inject(Router);

  recipes$: Observable<Recipe[]> = this.recipesService.recipes$;
  private recipesFilterAction$ = this.recipesService.recipesFilterAction$;
  filteredRecipes$ = combineLatest([this.recipes$, this.recipesFilterAction$]).pipe(
    map(([recipes, filter]: [Recipe[], Recipe]) => {
      const filterCriteria = filter.title.toLowerCase() ?? "";
      return recipes.filter((recipes) => recipes.title?.toLowerCase().includes(filterCriteria));
    })
  )

  constructor() {}

  editRecipe(recipe: Recipe): void {
    this.sharedDataService.updateRecipe(recipe);
    this.routerService.navigate(["/detail"])
  }
}
