import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Recipe, Tag, TAGS } from '../../models/recipe.model';
import { catchError, concatMap, Observable, of, tap } from 'rxjs';
import { RecipesService } from '../services/recipes.service';
import { AsyncPipe, CommonModule } from '@angular/common';

@Component({
  selector: 'app-new-recipe',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    AsyncPipe,
    CommonModule,
  ],
  templateUrl: './new-recipe.component.html',
  styleUrl: './new-recipe.component.css'
})
export class NewRecipeComponent implements OnInit{
  private formBuilder = inject(FormBuilder);
  private recipeService = inject(RecipesService);

  saveRecipes$!: Observable<Recipe>;

  formGroup = this.formBuilder.group<Recipe>(<Recipe>{
    id: Math.floor(1000 + Math.random() * 9000),
    title: '',
    ingredients: '',
    tags: '',
    imageUrl: '',
    cookingTime: undefined,
    yield: 0,
    prepTime: undefined,
    steps: '',
  });

  tags: Tag[] = TAGS;

  ngOnInit(): void {
    this.saveRecipes$ = this.formGroup.valueChanges.pipe(
      concatMap(newRecipe => this.recipeService.saveRecipe(<Recipe>newRecipe)),
      catchError(err => of(err)),
      tap(result => console.log("Successfully saved!"))
    )
  }
}
