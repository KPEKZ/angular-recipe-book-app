import { Recipe } from './recipe.model';
import { Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Subject } from 'rxjs';


@Injectable()
export class RecipeService {

    recipesChanged = new Subject<Recipe[]>();
    recipeSelected = new Subject<Recipe>();

    // private recipes: Recipe[] = [
    //     new Recipe('Жаркое по-деревенски',
    //         'Простое, но очень ароматное и вкусное блюдо для семейного обеда или ужина.',
    //         'https://img1.russianfood.com/dycontent/images_upl/465/sm_464858.jpg',
    //         [
    //             new Ingredient('Свиная корейка без кости', 1),
    //             new Ingredient('Сало свиное свежее', 50),
    //             new Ingredient('Масло сливочное', 50),
    //             new Ingredient('Картофель', 1),
    //             new Ingredient('Перец болгарский', 50),
    //             new Ingredient('Морковь', 2),
    //             new Ingredient('Лук репчатый', 2),
    //             new Ingredient('Чеснок', 2),
    //             new Ingredient('Зелень петрушки свежая', 5),
    //             new Ingredient('Зелень петрушки свежая', 10),
    //             new Ingredient('Специи для мяса', 1),
    //             new Ingredient('Перец чёрный горошком', 1),
    //             new Ingredient('Перец чёрный молотый', 1),
    //             new Ingredient('Соль', 1),
    //         ]),
    //     new Recipe('Куриный беф-строганов',
    //         'Бефстроганов из курицы - очень нежный и вкусный. И быстро готовится. Готовится так же, как и бефстроганов из говядины, но меньше по времени.',
    //         'https://img1.russianfood.com/dycontent/images_upl/32/sm_31172.jpg',
    //         [
    //             new Ingredient('Куриное филе', 600),
    //             new Ingredient('Сметана', 2),
    //             new Ingredient('Томатная паста', 1),
    //             new Ingredient('Лук репчатый', 2),
    //             new Ingredient('Мука', 1),
    //             new Ingredient('Масло растительное', 2),
    //             new Ingredient('Бульон', 1),
    //             new Ingredient('Соль', 1),
    //             new Ingredient('Перец черный молотый', 1),
    //         ])
    // ];

  private recipes: Recipe [] = [];

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

    setRecipes(recipes : Recipe []) {
      this.recipes = recipes;
      this.recipesChanged.next(this.recipes.slice());
    }
}
