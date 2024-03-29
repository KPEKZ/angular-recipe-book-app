import { Recipe } from './../recipe.model';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as fromApp from './../../store/app.reducer';
import * as RecipeActions from './../store/recipes.actions';
import * as ShoppingListActions from './../../shopping-list/store/shopping-list.actions';
import { map, switchMap } from 'rxjs';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.scss']
})
export class RecipeDetailComponent implements OnInit {
  public recipe: Recipe;
  public id: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<fromApp.AppState>
    ) { }

  ngOnInit(): void {
    this.route.params.pipe(
      map((params: Params) => {
        return +params['id'];
      }),
      switchMap((id) => {
        this.id = id;
        return this.store.select('recipes');
      }),
      map((recipesState) => {
        return recipesState.recipes.find((recipe,index) => {
          return index === this.id;
        })
      })
    )
    .subscribe(recipe => {
        this.recipe = recipe;
    });
  }

  onClassToggle(element: HTMLElement) {
    element.classList.toggle('show');
  }
  onAddToShoppingList() {
    this.store.dispatch(new ShoppingListActions.AddIngredients(this.recipe.ingredients));
  }

  onEditRecipe() {
    this.router.navigate(['edit'], { relativeTo: this.route });
  }

  onDeleteRecipe() {
   this.store.dispatch(new RecipeActions.DeleteRecipe(this.id));
   this.router.navigate(['/recipes']);
  }


}
