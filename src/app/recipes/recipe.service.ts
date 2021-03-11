import { EventEmitter } from '@angular/core';

import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';

export class RecipeService {
  recipeSelectionEvent = new EventEmitter<Recipe>();

  private recipes: Recipe[] = [
    new Recipe(
      'Tasty Natsy',
      'A super tasty Natsy - just delicious!',
      'https://assets.epicurious.com/photos/56f5916916f9f5a007cc1bb0/6:4/w_620%2Ch_413/Around-the-Fire_Grilled-Beef-Skirt-Steak.jpg',
      [
        new Ingredient('Meat', 1),
        new Ingredient('French Fries', 20),
      ],
    ),
    new Recipe(
      'Big Fat Burger',
      'What else you need to say?',
      'https://cdn.pixabay.com/photo/2020/02/02/15/07/meat-4813261_960_720.jpg',
      [
        new Ingredient('Buns', 2),
        new Ingredient('Meat', 1),
      ],
    ),
  ];

  getRecipes() {
    return this.recipes.slice();
  }
}
