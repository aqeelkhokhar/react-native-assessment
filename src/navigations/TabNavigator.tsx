import React from 'react';
import {Platform, Pressable, StyleSheet, Text} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import RecipeListScreen from '../screens/RecipeListScreen';
import FavoritesScreen from '../screens/FavoritesScreen';
import {RootStackParamList, TabParamList} from './types';

const Tab = createBottomTabNavigator<TabParamList>();

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

function RecipesIcon({color}: {color: string; size: number}) {
  return <Text style={[iconStyles.icon, {color}]}>R</Text>;
}

function FavoritesIcon({color}: {color: string; size: number}) {
  return <Text style={[iconStyles.icon, {color}]}>F</Text>;
}

function AddButton() {
  const navigation = useNavigation<NavigationProp>();
  return (
    <Pressable
      onPress={() => navigation.navigate('AddRecipe')}
      style={iconStyles.addButton}>
      <Text style={iconStyles.addText}>+</Text>
    </Pressable>
  );
}

const iconStyles = StyleSheet.create({
  icon: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  addButton: {
    marginRight: 12,
  },
  addText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
});

export default function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#FF6347',
        tabBarInactiveTintColor: '#999',
        tabBarStyle: Platform.select({
          ios: {
            backgroundColor: '#fff',
            borderTopColor: '#eee',
          },
          android: {
            backgroundColor: '#fff',
            elevation: 8,
            borderTopWidth: 0,
          },
        }),
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
        },
        headerStyle: {
          backgroundColor: '#FF6347',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}>
      <Tab.Screen
        name="RecipeList"
        component={RecipeListScreen}
        options={{
          title: 'Recipes',
          tabBarIcon: RecipesIcon,
          headerRight: AddButton,
        }}
      />
      <Tab.Screen
        name="Favorites"
        component={FavoritesScreen}
        options={{
          title: 'Favorites',
          tabBarIcon: FavoritesIcon,
        }}
      />
    </Tab.Navigator>
  );
}
