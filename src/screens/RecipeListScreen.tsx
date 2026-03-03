import React, {useCallback} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useRecipes} from '../hooks/useRecipes';
import {useSearch} from '../hooks/useSearch';
import {RootStackParamList} from '../navigation/types';
import {Recipe} from '../types';
import RecipeCard from '../components/RecipeCard';
import SearchBar from '../components/SearchBar';
import LoadingView from '../components/LoadingView';
import ErrorView from '../components/ErrorView';
import EmptyView from '../components/EmptyView';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function RecipeListScreen() {
  const navigation = useNavigation<NavigationProp>();
  const {recipes, loading, error, refetch} = useRecipes();
  const {searchQuery, setSearchQuery, filteredRecipes} = useSearch(recipes);

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

  if (loading && recipes.length === 0) {
    return <LoadingView message="Loading recipes..." />;
  }

  if (error && recipes.length === 0) {
    return <ErrorView message={error} onRetry={refetch} />;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={filteredRecipes}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        ListHeaderComponent={
          <SearchBar value={searchQuery} onChangeText={setSearchQuery} />
        }
        ListEmptyComponent={
          <EmptyView
            message={
              searchQuery
                ? 'No recipes match your search'
                : 'No recipes available'
            }
          />
        }
        contentContainerStyle={
          filteredRecipes.length === 0 ? styles.emptyList : styles.list
        }
        onRefresh={refetch}
        refreshing={loading}
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
    paddingBottom: 16,
  },
  emptyList: {
    flexGrow: 1,
  },
});
