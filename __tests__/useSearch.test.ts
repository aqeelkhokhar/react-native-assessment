import {filterRecipes} from '../src/hooks/useSearch';
import {Recipe} from '../src/types';

const recipes: Recipe[] = [
  {
    id: '1',
    name: 'Spaghetti Carbonara',
    description: 'Italian pasta',
    ingredients: ['spaghetti', 'eggs', 'pecorino cheese'],
    instructions: ['Boil pasta', 'Mix eggs'],
    imageUrl: 'https://via.placeholder.com/150',
  },
  {
    id: '2',
    name: 'Chicken Tikka Masala',
    description: 'Indian curry',
    ingredients: ['chicken', 'yogurt', 'tomatoes'],
    instructions: ['Marinate chicken', 'Cook sauce'],
    imageUrl: 'https://via.placeholder.com/150',
  },
  {
    id: '3',
    name: 'Caesar Salad',
    description: 'Classic salad',
    ingredients: ['romaine lettuce', 'parmesan', 'croutons'],
    instructions: ['Wash lettuce', 'Make dressing'],
    imageUrl: 'https://via.placeholder.com/150',
  },
];

describe('filterRecipes', () => {
  it('returns all recipes when query is empty', () => {
    expect(filterRecipes(recipes, '')).toHaveLength(3);
  });

  it('returns all recipes when query is whitespace', () => {
    expect(filterRecipes(recipes, '   ')).toHaveLength(3);
  });

  it('filters by recipe name', () => {
    const result = filterRecipes(recipes, 'spaghetti');
    expect(result).toHaveLength(1);
    expect(result[0].name).toBe('Spaghetti Carbonara');
  });

  it('filters by ingredient', () => {
    const result = filterRecipes(recipes, 'chicken');
    expect(result).toHaveLength(1);
    expect(result[0].name).toBe('Chicken Tikka Masala');
  });

  it('is case-insensitive', () => {
    const result = filterRecipes(recipes, 'CAESAR');
    expect(result).toHaveLength(1);
    expect(result[0].name).toBe('Caesar Salad');
  });

  it('returns empty array when no match', () => {
    expect(filterRecipes(recipes, 'pizza')).toHaveLength(0);
  });

  it('matches partial names', () => {
    const result = filterRecipes(recipes, 'car');
    expect(result).toHaveLength(1);
    expect(result[0].name).toBe('Spaghetti Carbonara');
  });
});
