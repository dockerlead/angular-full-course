import {
  Component,
  OnInit,
  Output,
  EventEmitter,
} from '@angular/core';

import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  @Output() selectRecipeEvent = new EventEmitter<Recipe>();

  recipes: Recipe[] = [
    new Recipe('Test Recipe A', 'This is test A', 'https://cdn.pixabay.com/photo/2020/02/02/15/07/meat-4813261_960_720.jpg'),
    new Recipe('Test Recipe B', 'This is test B', 'https://cdn.pixabay.com/photo/2020/02/02/15/07/meat-4813261_960_720.jpg')
  ];

  constructor() { }

  ngOnInit(): void {
  }

  onSelectRecipe(recipe: Recipe) {
    this.selectRecipeEvent.emit(recipe);
  }

}
