import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Recipe } from '../../recipe.model';

import { RecipeItemComponent } from './recipe-item.component';

describe('RecipeItemComponent', () => {
  let component: RecipeItemComponent;
  let fixture: ComponentFixture<RecipeItemComponent>;


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecipeItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecipeItemComponent);
    component = fixture.componentInstance;
    let index: number = 1;
    let recipe: Recipe = {
      name: '',
      description: '',
      imagePath: '',
      ingredients: []
    };
    component.index = index;
    component.recipe = recipe;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(component.index).toBeDefined();
    expect(component.recipe).toBeDefined();
  });
});
