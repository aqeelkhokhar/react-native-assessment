import React, {useCallback, useMemo} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useRecipes} from '../hooks/useRecipes';
import {useFavorites} from '../hooks/useFavorites';
import {Recipe} from '../types';
import RecipeCard from '../components/RecipeCard';
import LoadingView from '../components/LoadingView';
import EmptyView from '../components/EmptyView';
import { RootStackParamList } from '../navigations/types';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function FavoritesScreen() {
  const navigation = useNavigation<NavigationProp>();
  const {recipes, loading} = useRecipes();
  const {favoriteIds, loaded} = useFavorites();

  const favoriteRecipes = useMemo(
    () => recipes.filter(recipe => favoriteIds.includes(recipe.id)),
    [recipes, favoriteIds],
  );

  const handlePress = useCallback(
    (id: string) => {
      navigation.navigate('RecipeDetail', {recipeId: id});
    },
    [navigation],
  );

  const renderItem = useCallback(
    ({item}: {item: Recipe}) => (
      <RecipeCard recipe={item} onPress={handlePress} />
    ),
    [handlePress],
  );

  const keyExtractor = useCallback((item: Recipe) => item.id, []);

  if (loading || !loaded) {
    return <LoadingView message="Loading favorites..." />;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={favoriteRecipes}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        ListEmptyComponent={
          <EmptyView message="No favorites yet. Tap the heart icon on a recipe to save it here!" />
        }
        contentContainerStyle={
          favoriteRecipes.length === 0 ? styles.emptyList : styles.list
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  list: {
    paddingVertical: 8,
  },
  emptyList: {
    flexGrow: 1,
  },
});
