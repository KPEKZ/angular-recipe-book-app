import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {Recipe} from "./recipe.model";
import {DataServiceStorage} from "../shared/data-service.storage";
import {RecipeService} from "./recipe.service";

@Injectable({providedIn: 'root'})
export class RecipesResolverService implements Resolve<Recipe[]>{
  constructor(private dataStorageService: DataServiceStorage, private recipeService: RecipeService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const recipes = this.recipeService.getRecipes();
    if (recipes.length === 0 ) {
      return this.dataStorageService.fetchRecipes();
    } else {
      return recipes;
    }
  }
}
