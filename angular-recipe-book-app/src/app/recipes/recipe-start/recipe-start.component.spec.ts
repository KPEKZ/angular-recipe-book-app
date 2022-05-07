import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipeStartComponent } from './recipe-start.component';

describe('RecipeStartComponent', () => {
  let component: RecipeStartComponent;
  let fixture: ComponentFixture<RecipeStartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecipeStartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecipeStartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be the header <h3>Please select a Recipe!</h3>', () => {
    const recipeStartComponent: HTMLElement = fixture.debugElement.nativeElement;
    const headerElement: HTMLHeadElement = recipeStartComponent.querySelector('h3');
    expect(headerElement).toBeDefined();
    expect(headerElement.textContent).toBe('Please select a Recipe!');
  });

});
