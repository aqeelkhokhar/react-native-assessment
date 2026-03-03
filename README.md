# Recipe App - React Native Assessment

A React Native recipe browsing application with search, favorites, and recipe creation features. Built with TypeScript, React Navigation, Context API with `useReducer`, and a local JSON Server backend.

## Tech Stack

- **React Native** 0.84 with TypeScript
- **React Navigation** (Native Stack + Bottom Tabs)
- **Context API + useReducer** for state management
- **AsyncStorage** for persisting favorites
- **JSON Server** as a local REST API

## Prerequisites

- Node.js >= 22.11.0
- React Native CLI (`@react-native-community/cli`)
- Xcode (for iOS) / Android Studio (for Android)
- CocoaPods (for iOS)

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Install iOS pods

```bash
cd ios && pod install && cd ..
```

### 3. Start the JSON Server

```bash
npm run server
```

This starts a REST API at `http://localhost:3001` serving recipe data from `db.json`.

### 4. Run the app

```bash
# iOS
npm run ios

# Android
npm run android
```

## Project Structure

```
src/
├── types/            # TypeScript interfaces (Recipe, RecipeState, FavoriteState)
├── constants/        # API base URL and endpoint configuration
├── services/         # API service layer (fetch, create recipes)
├── contexts/         # React Context providers and reducers
│   ├── RecipeContext.tsx
│   ├── FavoritesContext.tsx
│   └── reducers.ts
├── hooks/            # Custom hooks
│   ├── useRecipes.ts    # Fetch recipes on mount
│   ├── useFavorites.ts  # Toggle and persist favorites
│   └── useSearch.ts     # Debounced search with filtering
├── components/       # Reusable UI components
│   ├── RecipeCard.tsx
│   ├── SearchBar.tsx
│   ├── FavoriteButton.tsx
│   ├── LoadingView.tsx
│   ├── ErrorView.tsx
│   └── EmptyView.tsx
├── screens/          # App screens
│   ├── RecipeListScreen.tsx
│   ├── RecipeDetailScreen.tsx
│   ├── FavoritesScreen.tsx
│   └── AddRecipeScreen.tsx
└── navigations/      # Navigation configuration and types
    ├── types.ts
    └── TabNavigator.tsx
```

## Available Scripts

| Script           | Description                          |
| ---------------- | ------------------------------------ |
| `npm run ios`    | Run on iOS simulator                 |
| `npm run android`| Run on Android emulator              |
| `npm run server` | Start JSON Server on port 3001       |
| `npm test`       | Run unit tests with Jest             |
| `npm run lint`   | Run ESLint                           |
| `npm start`      | Start Metro bundler                  |

## Testing

The project includes unit tests for reducers and search logic:

```bash
npm test
```

- `__tests__/reducers.test.ts` - Tests for `recipeReducer` and `favoriteReducer`
- `__tests__/useSearch.test.ts` - Tests for `filterRecipes` utility

## API Endpoints

The JSON Server provides the following endpoints at `http://localhost:3001`:

| Method | Endpoint            | Description         |
| ------ | ------------------- | ------------------- |
| GET    | `/recipes`          | List all recipes    |
| GET    | `/recipes/:id`      | Get recipe by ID    |
| POST   | `/recipes`          | Create a new recipe |

## Features

- Browse recipes in a scrollable list
- Search recipes by name or ingredient (with 300ms debounce)
- Pull-to-refresh recipe list
- View full recipe details with ingredients and step-by-step instructions
- Favorite/unfavorite recipes (persisted with AsyncStorage)
- Dedicated favorites tab
- Add new recipes with form validation
