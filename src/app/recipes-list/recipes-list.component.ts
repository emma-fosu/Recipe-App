import { ChangeDetectionStrategy, Component, OnInit, inject} from '@angular/core';
import { RecipesService } from '../services/recipes.service';
import { Recipe } from '../../models/recipe.model';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { DataViewModule } from 'primeng/dataview';
import { Observable } from 'rxjs';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { IconFieldModule } from 'primeng/iconfield';
import { RatingModule } from 'primeng/rating';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-recipes-list',
  standalone: true,
  imports: [
    CommonModule,
    RatingModule,
    FormsModule,
    ButtonModule,
    NgOptimizedImage,
  ],
  templateUrl: './recipes-list.component.html',
  styleUrl: './recipes-list.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RecipesListComponent {

  private recipesService = inject(RecipesService);
  recipes$: Observable<Recipe[]> = this.recipesService.recipes$;

  constructor() {}
}
