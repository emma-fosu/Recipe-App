import { Component, inject } from '@angular/core';
import { SharedDataService } from '../services/shared-data.service';
import { AsyncPipe, CommonModule } from '@angular/common';

@Component({
  selector: 'app-recipe-detail',
  imports: [
    CommonModule,
    AsyncPipe
  ],
  templateUrl: './recipe-detail.component.html',
  styleUrl: './recipe-detail.component.css'
})
export class RecipeDetailComponent {
  private sharedDataService = inject(SharedDataService);
  recipe$ = this.sharedDataService.sharedRecipe$;
}
