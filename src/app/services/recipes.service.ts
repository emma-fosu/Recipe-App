import { Injectable, inject } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, catchError, Observable, of } from 'rxjs';
import { Recipe, Tag } from '../../models/recipe.model';


const BASE_PATH = environment.basePath;

@Injectable({
  providedIn: 'root'
})
export class RecipesService {
  private http = inject(HttpClient);
  recipes$ = this.http.get<Recipe[]>(`${BASE_PATH}/recipes`).pipe(
    catchError(() => of([]))
  );

  private recipesFilterSubject$ =  new BehaviorSubject<Recipe>(<Recipe>{title: ""});
  searchTag$ = (criteria: string) => this.http.get<Tag[]>(`${BASE_PATH}/tags`, {
    params: {
      criteria: criteria
    }
  })

  recipesFilterAction$ = this.recipesFilterSubject$.asObservable();


  constructor() { }

  updateFilter(criteria: Recipe) {
    this.recipesFilterSubject$.next(criteria);
  }

  clearFilter() {
    this.recipesFilterSubject$.next(<Recipe>{title: ''});
  }

  saveRecipe(recipe: Recipe): Observable<Recipe> {
    return this.http.post<Recipe>(`${BASE_PATH}/recipes`, recipe);
  }
}
