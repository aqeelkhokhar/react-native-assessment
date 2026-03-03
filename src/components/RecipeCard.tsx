import React, {memo} from 'react';
import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import {Recipe} from '../types';

interface RecipeCardProps {
  recipe: Recipe;
  onPress: (id: string) => void;
}

function RecipeCard({recipe, onPress}: RecipeCardProps) {
  return (
    <Pressable
      style={({pressed}) => [styles.card, pressed && styles.cardPressed]}
      onPress={() => onPress(recipe.id)}>
      <Image source={{uri: recipe.imageUrl}} style={styles.image} />
      <View style={styles.content}>
        <Text style={styles.name} numberOfLines={1}>
          {recipe.name}
        </Text>
        <Text style={styles.description} numberOfLines={2}>
          {recipe.description}
        </Text>
      </View>
    </Pressable>
  );
}

export default memo(RecipeCard);

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 12,
    marginHorizontal: 16,
    marginVertical: 6,
    padding: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cardPressed: {
    opacity: 0.7,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 8,
    backgroundColor: '#f0f0f0',
  },
  content: {
    flex: 1,
    marginLeft: 12,
    justifyContent: 'center',
  },
  name: {
    fontSize: 16,
    fontWeight: '700',
    color: '#333',
    marginBottom: 4,
  },
  description: {
    fontSize: 13,
    color: '#777',
    lineHeight: 18,
  },
});
