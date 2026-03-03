import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

interface EmptyViewProps {
  message: string;
}

export default function EmptyView({message}: EmptyViewProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.icon}>--</Text>
      <Text style={styles.message}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  icon: {
    fontSize: 48,
    marginBottom: 12,
  },
  message: {
    fontSize: 16,
    color: '#999',
    textAlign: 'center',
    lineHeight: 22,
  },
});
