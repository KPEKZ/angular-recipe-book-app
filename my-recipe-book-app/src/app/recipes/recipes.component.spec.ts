import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipesComponent } from './recipes.component';

describe('RecipesComponent', () => {
  let component: RecipesComponent;
  let fixture: ComponentFixture<RecipesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecipesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecipesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have <div> with class <recipes-list>', () => {
    const recipesComponent: HTMLElement = fixture.nativeElement;
    const div = recipesComponent.querySelector('.resipes-list');
    expect(div).toBeDefined();
  });

  it('should have <div> with class <recipes-detail>', () => {
    const recipesComponent: HTMLElement = fixture.nativeElement;
    const div = recipesComponent.querySelector('.recipes-detail');
    expect(div).toBeDefined();
  });

  it('should have <div> with class <recipes-detail>', () => {
    const recipesComponent: HTMLElement = fixture.nativeElement;
    const div = recipesComponent.querySelector('.recipes-detail');
    expect(div).toBeDefined();
  });

  it('should have <app-recipe-list> component', () => {
    const recipesComponent: HTMLElement = fixture.nativeElement;
    const appRecLst = recipesComponent.querySelector('app-recipe-list');
    expect(appRecLst).toBeDefined();
  });

});
