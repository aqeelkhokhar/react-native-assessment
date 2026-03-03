import {useCallback, useEffect} from 'react';
import { useRecipeContext } from '../contexts/RecipeContext';
import { getRecipes } from '../services/api';


export function useRecipes() {
  const {state, dispatch} = useRecipeContext();

  const fetchRecipes = useCallback(async () => {
    dispatch({type: 'FETCH_START'});
    try {
      const recipes = await getRecipes();
      dispatch({type: 'FETCH_SUCCESS', payload: recipes});
    } catch (err) {
      const message =
        err instanceof Error ? err.message : 'Failed to fetch recipes';
      dispatch({type: 'FETCH_ERROR', payload: message});
    }
  }, [dispatch]);

  useEffect(() => {
    fetchRecipes();
  }, [fetchRecipes]);

  return {
    recipes: state.recipes,
    loading: state.loading,
    error: state.error,
    refetch: fetchRecipes,
  };
}
