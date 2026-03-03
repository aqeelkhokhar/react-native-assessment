import React, {useState} from 'react';
import {
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {createRecipe} from '../services/api';
import { RootStackParamList } from '../navigations/types';
import { useRecipeContext } from '../contexts/RecipeContext';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

interface FormErrors {
  name?: string;
  description?: string;
  ingredients?: string;
  instructions?: string;
}

export default function AddRecipeScreen() {
  const navigation = useNavigation<NavigationProp>();
  const {dispatch} = useRecipeContext();

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [instructions, setInstructions] = useState('');
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitting, setSubmitting] = useState(false);

  function validate(): FormErrors {
    const formErrors: FormErrors = {};
    if (name.trim().length < 3) {
      formErrors.name = 'Name must be at least 3 characters';
    }
    if (!description.trim()) {
      formErrors.description = 'Description is required';
    }
    if (!ingredients.trim()) {
      formErrors.ingredients = 'At least one ingredient is required';
    }
    if (!instructions.trim()) {
      formErrors.instructions = 'At least one instruction is required';
    }
    return formErrors;
  }

  async function handleSubmit() {
    const formErrors = validate();
    setErrors(formErrors);

    if (Object.keys(formErrors).length > 0) {
      return;
    }

    setSubmitting(true);
    try {
      const recipe = await createRecipe({
        name: name.trim(),
        description: description.trim(),
        ingredients: ingredients
          .split(',')
          .map(i => i.trim())
          .filter(Boolean),
        instructions: instructions
          .split('\n')
          .map(i => i.trim())
          .filter(Boolean),
        imageUrl: 'https://via.placeholder.com/150/CCCCCC/FFFFFF?text=New',
      });
      dispatch({type: 'ADD_RECIPE', payload: recipe});
      navigation.goBack();
    } catch (err) {
      const message =
        err instanceof Error ? err.message : 'Failed to add recipe';
      Alert.alert('Error', message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.label}>Recipe Name</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        placeholder="Enter recipe name"
        placeholderTextColor="#999"
      />
      {errors.name && <Text style={styles.error}>{errors.name}</Text>}

      <Text style={styles.label}>Description</Text>
      <TextInput
        style={styles.input}
        value={description}
        onChangeText={setDescription}
        placeholder="Enter description"
        placeholderTextColor="#999"
      />
      {errors.description && (
        <Text style={styles.error}>{errors.description}</Text>
      )}

      <Text style={styles.label}>Ingredients (comma-separated)</Text>
      <TextInput
        style={[styles.input, styles.multiline]}
        value={ingredients}
        onChangeText={setIngredients}
        placeholder="e.g. flour, eggs, sugar"
        placeholderTextColor="#999"
        multiline
      />
      {errors.ingredients && (
        <Text style={styles.error}>{errors.ingredients}</Text>
      )}

      <Text style={styles.label}>Instructions (one per line)</Text>
      <TextInput
        style={[styles.input, styles.multiline]}
        value={instructions}
        onChangeText={setInstructions}
        placeholder="Step 1&#10;Step 2&#10;Step 3"
        placeholderTextColor="#999"
        multiline
      />
      {errors.instructions && (
        <Text style={styles.error}>{errors.instructions}</Text>
      )}

      <Pressable
        style={[styles.button, submitting && styles.buttonDisabled]}
        onPress={handleSubmit}
        disabled={submitting}>
        <Text style={styles.buttonText}>
          {submitting ? 'Adding...' : 'Add Recipe'}
        </Text>
      </Pressable>

      <View style={styles.spacer} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  label: {
    fontSize: 15,
    fontWeight: '600',
    color: '#333',
    marginTop: 16,
    marginBottom: 6,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 15,
    color: '#333',
    backgroundColor: '#fafafa',
  },
  multiline: {
    minHeight: 80,
    textAlignVertical: 'top',
  },
  error: {
    color: '#e53935',
    fontSize: 13,
    marginTop: 4,
  },
  button: {
    backgroundColor: '#FF6347',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 24,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  spacer: {
    height: 40,
  },
});
