import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useReducer,
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FavoriteAction } from '../types';
import { favoriteReducer } from './reducers';


const STORAGE_KEY = 'favorite_recipes';

interface FavoritesContextValue {
  state: {favoriteIds: string[]; loaded: boolean};
  dispatch: React.Dispatch<FavoriteAction>;
  isFavorite: (id: string) => boolean;
}

const FavoritesContext = createContext<FavoritesContextValue | undefined>(
  undefined,
);

const initialState = {
  favoriteIds: [] as string[],
  loaded: false,
};

export function FavoritesProvider({children}: {children: React.ReactNode}) {
  const [state, dispatch] = useReducer(favoriteReducer, initialState);

  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY).then(stored => {
      const ids: string[] = stored ? JSON.parse(stored) : [];
      dispatch({type: 'SET_FAVORITES', payload: ids});
    });
  }, []);

  const isFavorite = useCallback(
    (id: string) => state.favoriteIds.includes(id),
    [state.favoriteIds],
  );

  return (
    <FavoritesContext.Provider value={{state, dispatch, isFavorite}}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavoritesContext(): FavoritesContextValue {
  const context = useContext(FavoritesContext);
  if (context === undefined) {
    throw new Error(
      'useFavoritesContext must be used within a FavoritesProvider',
    );
  }
  return context;
}
