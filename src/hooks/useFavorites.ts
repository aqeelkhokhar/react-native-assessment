import {useCallback} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFavoritesContext } from '../contexts/FavoritesContext';


const STORAGE_KEY = 'favorite_recipes';

export function useFavorites() {
  const {state, dispatch, isFavorite} = useFavoritesContext();

  const toggleFavorite = useCallback(
    async (id: string) => {
      dispatch({type: 'TOGGLE_FAVORITE', payload: id});

      const exists = state.favoriteIds.includes(id);
      const newIds = exists
        ? state.favoriteIds.filter(fid => fid !== id)
        : [...state.favoriteIds, id];

      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newIds));
    },
    [dispatch, state.favoriteIds],
  );

  return {
    favoriteIds: state.favoriteIds,
    loaded: state.loaded,
    isFavorite,
    toggleFavorite,
  };
}
