import { Ingredient } from './../shared/ingredient.model';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ShoppingListService } from './shopping-list.service';
import {Observable, Subscription} from 'rxjs';
import {Store} from "@ngrx/store";
import * as ShoppingListActions from './store/shopping-list.actions';
import * as fromApp from '../store/app.reducer';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.scss'],

})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Observable<{ingredients:Ingredient[]}>;
  private igChangeSub: Subscription;

  constructor(
    private slService: ShoppingListService,
    private store: Store<fromApp.AppState>
  ) { }

  ngOnInit(): void {
    this.ingredients = this.store.select('shoppingList');
  }

  onEditItem(index:number) {
    this.store.dispatch(new ShoppingListActions.StartEdit(index));

  }
  ngOnDestroy() {
  }

}
