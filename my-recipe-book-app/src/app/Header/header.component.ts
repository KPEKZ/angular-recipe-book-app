import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {Store} from "@ngrx/store";
import * as fromApp from "./../store/app.reducer";
import * as AuthActions from "./../Auth/store/auth.actions";
import * as RecipeActions from "./../recipes/store/recipes.actions";
import {map, tap} from "rxjs/operators";
import { User } from '../Auth/user.model';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit, OnDestroy{

  private _userSub: Subscription = null;
  public isAuthenticated:Boolean = false;

  constructor(
    private store: Store<fromApp.AppState>
  ) {}

  ngOnInit() {
    this._userSub = this.store.select('auth').pipe(
      map((authState: { user: User; }) => authState.user))
      .subscribe(user => {
      this.isAuthenticated = !! user;
    });
    if (this._userSub) this.onFetchData();
  }


  onClassToggle(element: HTMLElement) {
    element.classList.toggle('show');
  }

  onSaveData() {
    this.store.dispatch(new RecipeActions.StoreRecipes());
  }

  onFetchData() {
    this.store.dispatch(new RecipeActions.FetchRecipes());
  }

  onLogout() {
    this.store.dispatch(new AuthActions.Logout());
  }

  ngOnDestroy() {
    if (this._userSub) {
      this._userSub.unsubscribe();
      this._userSub = null;
    }
  }
}
