import { Component, OnDestroy, OnInit } from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {FormArray, FormControl, FormGroup, Validators} from "@angular/forms";
import { Store } from '@ngrx/store';
import * as fromApp from './../../store/app.reducer';
import * as RecipeActions from './../store/recipes.actions';
import { map, Subscription } from 'rxjs';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.scss']
})
export class RecipeEditComponent implements OnInit, OnDestroy {
  id: number;
  editMode = false;
  recipeForm: FormGroup;

  private storeSub: Subscription;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<fromApp.AppState>
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = + params['id'];
        this.editMode = params['id'] != null;
        this.initForm();
      }
    );
  }

  onSubmit() {
    if (this.editMode) {
     this.store.dispatch(new RecipeActions.UpdateRecipe({index: this.id, newRecipe: this.recipeForm.value}));
    }
    else{
     this.store.dispatch(new RecipeActions.AddRecipe(this.recipeForm.value));
    }

    this.onCancel();
  }

  private initForm() {
    let recipeName = '';
    let recipeImagePath = '';
    let recipeDescription = '';
    let recipeIngredients = new FormArray([]);

    if (this.editMode){
     this.storeSub = this.store.select('recipes')
     .pipe(
       map((recipesState)=>{
         return recipesState.recipes.find((recipe,index) => {
           return index === this.id;
         });
       }),
     ).subscribe( recipe => {
      recipeName = recipe.name;
      recipeImagePath = recipe.imagePath;
      recipeDescription = recipe.description;
      if (recipe['ingredients']) {
        for (let ingredient of recipe.ingredients) {
          recipeIngredients.push(new FormGroup({
            'name' : new FormControl(ingredient.name, Validators.required),
            'amount': new FormControl(ingredient.amount, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
          }));
        }
      }
     });

    }
    this.recipeForm = new FormGroup({
      'name': new FormControl(recipeName, Validators.required),
      'imagePath' : new FormControl(recipeImagePath , Validators.required),
      'description' : new FormControl(recipeDescription, Validators.required),
      'ingredients' : recipeIngredients
    });
  }

  get controls() {
    return (<FormArray>this.recipeForm.get('ingredients')).controls;
  }

  onAddIngredient(){
    (<FormArray>this.recipeForm.get('ingredients')).push(new FormGroup({
      'name' : new FormControl(null,Validators.required),
      'amount': new FormControl(null,[Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
    }))
  }

  onCancel() {
    this.router.navigate(['../'],{relativeTo:this.route});
  }

  onDeleteRecipe(index: number) {
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
  }

  ngOnDestroy() {
    if (this.storeSub) {
      this.storeSub.unsubscribe();
    }
  }

}
