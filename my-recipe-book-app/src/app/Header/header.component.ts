import {Component, OnDestroy, OnInit} from '@angular/core';
import {DataServiceStorage} from "../shared/data-service.storage";
import {AuthService} from "../Auth/auth.service";
import {Subscription} from "rxjs";
import {Store} from "@ngrx/store";
import * as fromApp from "./../store/app.reducer";
import * as AuthActions from "./../Auth/store/auth.actions";
import {map} from "rxjs/operators";

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html'
})

export class HeaderComponent implements OnInit, OnDestroy{

  isAuthenticated:Boolean = false;
  private userSub: Subscription;

  constructor(
    private dataStorageService: DataServiceStorage,
    private authService: AuthService,
    private store: Store<fromApp.AppState>) {
  }

  ngOnInit() {
    this.userSub = this.store.select('auth').pipe(
      map(authState => authState.user))
      .subscribe(user => {
      this.isAuthenticated = !! user;
    });
  }


  onClassToggle(element: HTMLElement) {
        element.classList.toggle('show');
  }

  onSaveData() {
    this.dataStorageService.storeRecipes();
  }

  onFetchData() {
    this.dataStorageService.fetchRecipes().subscribe();
  }

  onLogout() {
    this.store.dispatch(new AuthActions.Logout());
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }
}
