import React, {useCallback, useEffect, useState} from 'react';
import {Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../navigation/types';
import {Recipe} from '../types';
import {getRecipeById} from '../services/api';
import {useFavorites} from '../hooks/useFavorites';
import FavoriteButton from '../components/FavoriteButton';
import LoadingView from '../components/LoadingView';
import ErrorView from '../components/ErrorView';

type DetailRouteProp = RouteProp<RootStackParamList, 'RecipeDetail'>;
type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function RecipeDetailScreen() {
  const route = useRoute<DetailRouteProp>();
  const navigation = useNavigation<NavigationProp>();
  const {recipeId} = route.params;

  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const {isFavorite, toggleFavorite} = useFavorites();

  const fetchRecipe = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getRecipeById(recipeId);
      setRecipe(data);
      navigation.setOptions({title: data.name});
    } catch (err) {
      const message =
        err instanceof Error ? err.message : 'Failed to load recipe';
      setError(message);
    } finally {
      setLoading(false);
    }
  }, [recipeId, navigation]);

  useEffect(() => {
    fetchRecipe();
  }, [fetchRecipe]);

  const handleToggleFavorite = useCallback(() => {
    toggleFavorite(recipeId);
  }, [recipeId, toggleFavorite]);

  if (loading) {
    return <LoadingView />;
  }

  if (error || !recipe) {
    return (
      <ErrorView message={error ?? 'Recipe not found'} onRetry={fetchRecipe} />
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Image source={{uri: recipe.imageUrl}} style={styles.image} />

      <View style={styles.header}>
        <Text style={styles.name}>{recipe.name}</Text>
        <FavoriteButton
          isFavorite={isFavorite(recipeId)}
          onToggle={handleToggleFavorite}
        />
      </View>

      <Text style={styles.description}>{recipe.description}</Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Ingredients</Text>
        {recipe.ingredients.map((ingredient, index) => (
          <View key={index} style={styles.ingredientRow}>
            <Text style={styles.bullet}>•</Text>
            <Text style={styles.ingredientText}>{ingredient}</Text>
          </View>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Instructions</Text>
        {recipe.instructions.map((step, index) => (
          <View key={index} style={styles.stepRow}>
            <Text style={styles.stepNumber}>{index + 1}</Text>
            <Text style={styles.stepText}>{step}</Text>
          </View>
        ))}
      </View>

      <View style={styles.bottomSpacer} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  image: {
    width: '100%',
    height: 220,
    backgroundColor: '#f0f0f0',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  name: {
    flex: 1,
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  description: {
    fontSize: 15,
    color: '#777',
    paddingHorizontal: 16,
    paddingTop: 8,
    lineHeight: 22,
  },
  section: {
    paddingHorizontal: 16,
    paddingTop: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#333',
    marginBottom: 12,
  },
  ingredientRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  bullet: {
    fontSize: 16,
    color: '#FF6347',
    marginRight: 8,
    lineHeight: 22,
  },
  ingredientText: {
    flex: 1,
    fontSize: 15,
    color: '#555',
    lineHeight: 22,
  },
  stepRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  stepNumber: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#FF6347',
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
    lineHeight: 28,
    marginRight: 12,
    overflow: 'hidden',
  },
  stepText: {
    flex: 1,
    fontSize: 15,
    color: '#555',
    lineHeight: 22,
    paddingTop: 3,
  },
  bottomSpacer: {
    height: 32,
  },
});
