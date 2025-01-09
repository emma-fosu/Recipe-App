import { Routes } from '@angular/router';
import { RecipesListComponent } from './recipes-list/recipes-list.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { NewRecipeComponent } from './new-recipe/new-recipe.component';

export const routes: Routes = [
    {
        path: "recipes",
        component: RecipesListComponent,
        title: "My Recipes",
    },
    {
        path: "new-recipes",
        component: NewRecipeComponent,
        title: "Add New Recipe"
    },
    {
        path: "",
        redirectTo: "recipes",
        pathMatch: "full",
    },
    {
        path: "**",
        component: PageNotFoundComponent,
        title: "404 Page Not Found",
    }
];
