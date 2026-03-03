export interface Recipe {
    id: string;
    name: string;
    description: string;
    ingredients: string[];
    instructions: string[];
    imageUrl: string;
}


export interface RecipeState{
    recipes: Recipe[];
    loading: boolean;
    error: string | null;
}

export type RecipeAction =
    | { type: 'FETCH_START' }
    | { type: 'FETCH_SUCCESS'; payload: Recipe[] }
    | { type: 'FETCH_ERROR'; payload: string }
    | { type: 'ADD_RECIPE'; payload: Recipe }
     

export interface FavoriteState {
    favoriteIds: string[];
    loaded: boolean;
}

export type FavoriteAction =
    | { type: 'SET_FAVORITES'; payload: string[] }
    | { type: 'TOGGLE_FAVORITE'; payload: string }