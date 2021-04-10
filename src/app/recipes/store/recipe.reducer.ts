import {Ingredient} from "src/app/shared/ingredient.model";
import {Recipe} from "../recipe.model";
import * as RecipesActions from './recipe.actions';

export interface State {
  recipes: Recipe[];
}

const initialState: State = {
  // recipes: [
  //   new Recipe(
  //     'Tasty Natsy',
  //     'A super tasty Natsy - just delicious!',
  //     'https://assets.epicurious.com/photos/56f5916916f9f5a007cc1bb0/6:4/w_620%2Ch_413/Around-the-Fire_Grilled-Beef-Skirt-Steak.jpg',
  //     [
  //       new Ingredient('Meat', 1),
  //       new Ingredient('French Fries', 20),
  //     ],
  //   ),
  //   new Recipe(
  //     'Big Fat Burger',
  //     'What else you need to say?',
  //     'https://cdn.pixabay.com/photo/2020/02/02/15/07/meat-4813261_960_720.jpg',
  //     [
  //       new Ingredient('Buns', 2),
  //       new Ingredient('Meat', 1),
  //     ],
  //   ),
  // ]
  recipes: []
}


export function recipeReducer(state = initialState, action: RecipesActions.RecipesActions) {
  switch (action.type) {
    case RecipesActions.SET_RECIPES:
      return {
        ...state,
        recipes: [...action.payload]
      }
    case RecipesActions.ADD_RECIPE:
      return {
        ...state,
        recipes: [...state.recipes, action.payload]
      };
    case RecipesActions.UPDATE_RECIPE:
      const updatedRecipe = {
        ...state.recipes[action.payload.index],
        ...action.payload.newRecipe
      };
      const updatedRecipes = [...state.recipes];
      updatedRecipes[action.payload.index] = updatedRecipe;
      return {
        ...state,
        recipes: updatedRecipes
      };
    case RecipesActions.DELETE_RECIPE:
      return {
        ...state,
        recipes: state.recipes.filter((recipe, index) => {
          return index !== action.payload;
        })
      };
    default:
      return state;
  }
}
