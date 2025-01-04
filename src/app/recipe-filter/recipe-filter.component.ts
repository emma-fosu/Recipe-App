import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { RecipesService } from '../services/recipes.service';
import { Recipe } from '../../models/recipe.model';

@Component({
  selector: 'app-recipe-filter',
  imports: [
    ReactiveFormsModule,
  ],
  templateUrl: './recipe-filter.component.html',
  styleUrl: './recipe-filter.component.css'
})
export class RecipeFilterComponent {
  filterFb = inject(FormBuilder);
  recipesService = inject(RecipesService);

  filterFormGroup = this.filterFb.group<Recipe>(<Recipe>{
    title: '',
    ingredients: '',
    tags: '',
    category: '',
    prepTime: undefined,
    cookingTime: undefined,
  });


  clearFilter() {
    this.recipesService.clearFilter();
    this.filterFormGroup.reset();
  }

  updateFilter() {
    this.recipesService.updateFilter(<Recipe>this.filterFormGroup.value);
  }
}
