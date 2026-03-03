import { API_ENDPOINTS } from "../constants/api";
import { Recipe } from "../types";



async function fetchjson<T>(url: string): Promise<T> {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}: ${response.statusText}`);
    }
    const data: T = await response.json();
    return data;
}

export async function fetchRecipes(): Promise<Recipe[]> {
    return await fetchjson<Recipe[]>(API_ENDPOINTS.recipes);
}

export async function fetchRecipeById(id: number): Promise<Recipe> {
    return await fetchjson<Recipe>(API_ENDPOINTS.recipeById(id));
}

export async function getRecipes(): Promise<Recipe[]> {
  return fetchjson<Recipe[]>(API_ENDPOINTS.recipes);
}

export async function createRecipe(recipe: Omit<Recipe, 'id'>): Promise<Recipe> {
    const response = await fetch(API_ENDPOINTS.recipes, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(recipe),
    });

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}: ${response.statusText}`);
    }

    const createdRecipe: Recipe = await response.json();
    return createdRecipe;
}