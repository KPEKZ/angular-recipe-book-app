import { Ingredient } from './../shared/ingredient.model';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ShoppingListService } from './shopping-list.service';
import {map, Observable, Subscription} from 'rxjs';
import {Store} from "@ngrx/store";
import * as ShoppingListActions from './store/shopping-list.actions';
import * as fromApp from '../store/app.reducer';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.scss'],

})
export class ShoppingListComponent implements OnInit, OnDestroy {

  private _ingredientsSub: Subscription = null;
  public ingredients: Ingredient[] = null;

  constructor(
    private store: Store<fromApp.AppState>
  ) { }

  ngOnInit(): void {
    this._ingredientsSub = this.store.select('shoppingList')
      .pipe(map((shoppingListState) => shoppingListState.ingredients))
      .subscribe((ingredients) => {
        console.log(ingredients)
        this.ingredients = ingredients;
      })
  }

  onEditItem(index:number) {
    this.store.dispatch(new ShoppingListActions.StartEdit(index));

  }
  ngOnDestroy() {
    if (this._ingredientsSub) {
      this._ingredientsSub.unsubscribe();
      this._ingredientsSub = null;
    }
  }

}
