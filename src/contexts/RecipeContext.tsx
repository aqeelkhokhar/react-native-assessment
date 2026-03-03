import React, {createContext, useContext, useReducer} from 'react';
import {RecipeState, RecipeAction} from '../types';
import {recipeReducer} from './reducers';

interface RecipeContextValue {
  state: RecipeState;
  dispatch: React.Dispatch<RecipeAction>;
}

const RecipeContext = createContext<RecipeContextValue | undefined>(undefined);

const initialState: RecipeState = {
  recipes: [],
  loading: false,
  error: null,
};

export function RecipeProvider({children}: {children: React.ReactNode}) {
  const [state, dispatch] = useReducer(recipeReducer, initialState);
  return (
    <RecipeContext.Provider value={{state, dispatch}}>
      {children}
    </RecipeContext.Provider>
  );
}

export function useRecipeContext(): RecipeContextValue {
  const context = useContext(RecipeContext);
  if (context === undefined) {
    throw new Error('useRecipeContext must be used within a RecipeProvider');
  }
  return context;
}
