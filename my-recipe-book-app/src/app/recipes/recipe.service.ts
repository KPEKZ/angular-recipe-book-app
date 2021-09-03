import { Recipe } from './recipe.model';
import { Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Subject } from 'rxjs';


@Injectable()
export class RecipeService {

    recipesChanged = new Subject<Recipe[]>();
    recipeSelected = new Subject<Recipe>();

    private recipes: Recipe[] = [
        new Recipe('Test Recipe',
            'just simple desc',
            'https://www.healthbeginswithmom.com/wp-content/uploads/2017/04/Colombian-chicken-stew-with-tomatoes-potatoes-and-onion.jpg',
            [
                new Ingredient('Meat', 3),
                new Ingredient('salt', 300)
            ]),
        new Recipe('Test Recipe 1',
            'just simple desc',
            'https://i.ytimg.com/vi/j2FYrtrGaFg/maxresdefault.jpg',
            [
                new Ingredient('Buns', 2),
                new Ingredient('Meat', 1)
            ])
    ];

    constructor(private slService: ShoppingListService) { }

    getRecipes() {
        return this.recipes.slice();
    }
    getRecipe(index: number) {
        return this.recipes[index];
    }

    addIngredientsToShoppingList(ingredients: Ingredient[]) {
        this.slService.addIngredients(ingredients);
    }

    addRecipe(recipe:Recipe) {
      this.recipes.push(recipe);
      this.recipesChanged.next(this.recipes.slice());
    }

    updateRecipe(index:number, newRecipe: Recipe) {
      this.recipes[index] = newRecipe;
      this.recipesChanged.next(this.recipes.slice());
    }

    deleteRecipe(index: number) {
      this.recipes.splice(index,1);
      this.recipesChanged.next(this.recipes.slice());
    }
}
