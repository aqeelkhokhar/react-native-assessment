
import { recipeReducer, favoriteReducer } from '../src/contexts/reducers';
import {RecipeState, Recipe, FavoriteState} from '../src/types';

const mockRecipe: Recipe = {
  id: '1',
  name: 'Test Recipe',
  description: 'A test recipe',
  ingredients: ['flour', 'sugar'],
  instructions: ['Mix', 'Bake'],
  imageUrl: 'https://via.placeholder.com/150',
};

describe('recipeReducer', () => {
  const initialState: RecipeState = {
    recipes: [],
    loading: false,
    error: null,
  };

  it('sets loading on FETCH_START', () => {
    const state = recipeReducer(initialState, {type: 'FETCH_START'});
    expect(state.loading).toBe(true);
    expect(state.error).toBeNull();
  });

  it('sets recipes on FETCH_SUCCESS', () => {
    const state = recipeReducer(initialState, {
      type: 'FETCH_SUCCESS',
      payload: [mockRecipe],
    });
    expect(state.recipes).toHaveLength(1);
    expect(state.loading).toBe(false);
  });

  it('sets error on FETCH_ERROR', () => {
    const state = recipeReducer(initialState, {
      type: 'FETCH_ERROR',
      payload: 'Network error',
    });
    expect(state.error).toBe('Network error');
    expect(state.loading).toBe(false);
  });

  it('appends recipe on ADD_RECIPE', () => {
    const stateWithRecipes: RecipeState = {
      recipes: [mockRecipe],
      loading: false,
      error: null,
    };
    const newRecipe = {...mockRecipe, id: '2', name: 'New Recipe'};
    const state = recipeReducer(stateWithRecipes, {
      type: 'ADD_RECIPE',
      payload: newRecipe,
    });
    expect(state.recipes).toHaveLength(2);
    expect(state.recipes[1].name).toBe('New Recipe');
  });
});

describe('favoriteReducer', () => {
  const initialState: FavoriteState = {
    favoriteIds: [],
    loaded: false,
  };

  it('sets favorites on SET_FAVORITES', () => {
    const state = favoriteReducer(initialState, {
      type: 'SET_FAVORITES',
      payload: ['1', '2'],
    });
    expect(state.favoriteIds).toEqual(['1', '2']);
    expect(state.loaded).toBe(true);
  });

  it('adds favorite on TOGGLE_FAVORITE when not exists', () => {
    const state = favoriteReducer(initialState, {
      type: 'TOGGLE_FAVORITE',
      payload: '1',
    });
    expect(state.favoriteIds).toEqual(['1']);
  });

  it('removes favorite on TOGGLE_FAVORITE when exists', () => {
    const stateWithFavorite: FavoriteState = {
      favoriteIds: ['1', '2'],
      loaded: true,
    };
    const state = favoriteReducer(stateWithFavorite, {
      type: 'TOGGLE_FAVORITE',
      payload: '1',
    });
    expect(state.favoriteIds).toEqual(['2']);
  });
});
