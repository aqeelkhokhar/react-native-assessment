import { FavoriteAction, FavoriteState, RecipeAction, RecipeState } from "../types";



export function recipeReducer(state: RecipeState, action: RecipeAction): RecipeState {
    switch (action.type) {
        case 'FETCH_START':
            return { ...state, loading: true, error: null };
        case 'FETCH_SUCCESS':
            return { ...state, loading: false, recipes: action.payload };
        case 'FETCH_ERROR':
            return { ...state, loading: false, error: action.payload };
        case 'ADD_RECIPE':
            return { ...state, recipes: [...state.recipes, action.payload] };
        default:
            return state;
    }

}


export function favoriteReducer(state: FavoriteState, action: FavoriteAction): FavoriteState {
    switch (action.type) {
    case 'SET_FAVORITES':
      return {favoriteIds: action.payload, loaded: true};
    case 'TOGGLE_FAVORITE': {
      const exists = state.favoriteIds.includes(action.payload);
      const favoriteIds = exists
        ? state.favoriteIds.filter(id => id !== action.payload)
        : [...state.favoriteIds, action.payload];
      return {...state, favoriteIds};
    }
    default:
      return state;
  }
}