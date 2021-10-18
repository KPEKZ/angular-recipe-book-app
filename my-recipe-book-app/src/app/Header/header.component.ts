import {Component, OnDestroy, OnInit} from '@angular/core';
import {DataServiceStorage} from "../shared/data-service.storage";
import {AuthService} from "../Auth/auth.service";
import {Subscription} from "rxjs";

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html'
})

export class HeaderComponent implements OnInit, OnDestroy{

  isAuthenticated:Boolean = false;
  private userSub: Subscription;

  constructor(private dataStorageService: DataServiceStorage, private authService: AuthService) {
  }

  ngOnInit() {
    this.userSub = this.authService.user.subscribe(user => {
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
    this.authService.logout();
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }
}
