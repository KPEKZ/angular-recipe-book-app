import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import { map, switchMap, withLatestFrom } from 'rxjs';
import { Recipe } from '../recipe.model';
import * as RecipesActions from './recipes.actions';
import * as fromApp from './../../store/app.reducer';
import { Store } from '@ngrx/store';

@Injectable()
export class RecipeEffects {

    fetchRecipes = createEffect(() => {
        return this.actions$.pipe(
            ofType(RecipesActions.FETCH_RECIPES),
            switchMap(() => {
                return this.http.get<Recipe[]>('https://my-recipe-book-e8955-default-rtdb.firebaseio.com/recipes.json')
            }),
            map(recipes => {
                return recipes.map(recipe => {
                  return {...recipe, ingredients: recipe.ingredients ? recipe.ingredients : []};
                });
            }),
            map((recipes) => {
                return new RecipesActions.SetRecipes(recipes)
            }));
        });

    storeRecipes = createEffect(() => {
        return this.actions$.pipe(
            ofType(RecipesActions.STORE_RECIPES),
            withLatestFrom(this.store.select('recipes')),
            switchMap(([actionData, recipesState]) => {
                return this.http.put('https://my-recipe-book-e8955-default-rtdb.firebaseio.com/recipes.json', 
                recipesState.recipes)
            })
        );
    }, {
        dispatch: false
    });

    constructor(
        private actions$: Actions,
        private http : HttpClient,
        private store: Store<fromApp.AppState>
    ){}
}