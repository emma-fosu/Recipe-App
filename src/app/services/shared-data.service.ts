import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Recipe } from '../../models/recipe.model';

@Injectable({
  providedIn: 'root'
})
export class SharedDataService {
  
  private sharedRecipeSubject$ = new BehaviorSubject<Recipe|undefined>(undefined);
  sharedRecipe$ = this.sharedRecipeSubject$.asObservable();

  constructor() { }

  updateRecipe(recipe: Recipe): void {
    this.sharedRecipeSubject$.next(recipe);
  }
}
