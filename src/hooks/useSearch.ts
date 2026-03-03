import {useEffect, useMemo, useState} from 'react';
import {Recipe} from '../types';

export function filterRecipes(recipes: Recipe[], query: string): Recipe[] {
  if (!query.trim()) {
    return recipes;
  }
  const q = query.toLowerCase();
  return recipes.filter(
    recipe =>
      recipe.name.toLowerCase().includes(q) ||
      recipe.ingredients.some(ing => ing.toLowerCase().includes(q)),
  );
}

export function useSearch(recipes: Recipe[]) {
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 300);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  const filteredRecipes = useMemo(
    () => filterRecipes(recipes, debouncedQuery),
    [recipes, debouncedQuery],
  );

  return {searchQuery, setSearchQuery, filteredRecipes};
}
