import React from 'react';
import {Pressable, StyleSheet, Text} from 'react-native';

interface FavoriteButtonProps {
  isFavorite: boolean;
  onToggle: () => void;
}

export default function FavoriteButton({
  isFavorite,
  onToggle,
}: FavoriteButtonProps) {
  return (
    <Pressable onPress={onToggle} style={styles.button} hitSlop={8}>
      <Text style={[styles.text, isFavorite && styles.active]}>
        {isFavorite ? 'Unfavorite' : 'Favorite'}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#FF6347',
  },
  text: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FF6347',
  },
  active: {
    color: '#FF3B30',
  },
});
