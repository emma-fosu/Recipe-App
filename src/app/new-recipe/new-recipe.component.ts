import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Recipe, Tag, TAGS } from '../../models/recipe.model';
import { BehaviorSubject, catchError, concatMap, distinctUntilChanged, exhaustMap, Observable, of, Subject, switchMap, tap } from 'rxjs';
import { RecipesService } from '../services/recipes.service';
import { AsyncPipe, CommonModule } from '@angular/common';
import {AutoCompleteModule} from 'primeng/autocomplete'

@Component({
  selector: 'app-new-recipe',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    AsyncPipe,
    CommonModule,
    AutoCompleteModule,
  ],
  templateUrl: './new-recipe.component.html',
  styleUrl: './new-recipe.component.css'
})
export class NewRecipeComponent implements OnInit{
  private formBuilder = inject(FormBuilder);
  private recipeService = inject(RecipesService);
  private saveAction$ = new Subject<boolean>();

  saveRecipe$ = this.saveAction$.pipe(
    exhaustMap(() => this.recipeService.saveRecipe(<Recipe>this.formGroup.value))
  )


  saveRecipes$!: Observable<Recipe>;
  private searchTerm$ = new BehaviorSubject<string>('');
  searchedTags$ = this.searchTerm$.pipe(
    distinctUntilChanged(),
    switchMap(criteria => this.recipeService.searchTag$(criteria)),
    catchError(err => of(err)),
    tap(() => console.log("Searched successfully!!"))
  )

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
      switchMap(newRecipe => this.recipeService.saveRecipe(<Recipe>newRecipe)),
      catchError(err => of(err)),
      tap(result => console.log("Successfully saved!"))
    )
  }

  updateTerm(criteria: string): void {
    criteria = criteria.trim().toLowerCase(); 
    this.searchTerm$.next(criteria);
  }

  saveRecipe(): void {
    this.saveAction$.next(true);
  }
}
