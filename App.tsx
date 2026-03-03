import React from 'react';
import {StatusBar, useColorScheme} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {RecipeProvider} from './src/context/RecipeContext';
import {FavoritesProvider} from './src/context/FavoritesContext';
import {RootStackParamList} from './src/navigation/types';
import TabNavigator from './src/navigation/TabNavigator';
import RecipeDetailScreen from './src/screens/RecipeDetailScreen';
import AddRecipeScreen from './src/screens/AddRecipeScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

const headerOptions = {
  headerStyle: {backgroundColor: '#FF6347'},
  headerTintColor: '#fff',
  headerTitleStyle: {fontWeight: 'bold' as const},
};

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaProvider>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <RecipeProvider>
        <FavoritesProvider>
          <NavigationContainer>
            <Stack.Navigator>
              <Stack.Screen
                name="Main"
                component={TabNavigator}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="RecipeDetail"
                component={RecipeDetailScreen}
                options={{title: 'Recipe', ...headerOptions}}
              />
              <Stack.Screen
                name="AddRecipe"
                component={AddRecipeScreen}
                options={{title: 'Add Recipe', ...headerOptions}}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </FavoritesProvider>
      </RecipeProvider>
    </SafeAreaProvider>
  );
}

export default App;
