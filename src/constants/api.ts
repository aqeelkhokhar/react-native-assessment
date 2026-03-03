import { Platform } from "react-native";


export const HOST = Platform.select({
  ios: "localhost",
  android: "10.0.2.2",
}) ?? "localhost";

export const API_BASE_URL = `http://${HOST}:3001`;

export const API_ENDPOINTS = {
    recipes: `${API_BASE_URL}/recipes`,
    recipeById: (id: string) => `${API_BASE_URL}/recipes/${id}`,
} as const;