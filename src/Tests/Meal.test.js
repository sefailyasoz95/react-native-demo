import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import Meal from '../Components/Meal';

const mockMeal = {
  idMeal: '1',
  strMeal: 'Test Meal',
  strMealThumb:
    'https://www.google.com/url?sa=i&url=https%3A%2F%2Funsplash.com%2Fs%2Fphotos%2Fimage&psig=AOvVaw0vTuWXDag4NcPYzQm_I53z&ust=1705388589266000&source=images&cd=vfe&opi=89978449&ved=0CBMQjRxqFwoTCIjv-Nzp3oMDFQAAAAAdAAAAABAD',
  strCategory: 'Test Category',
  strArea: 'Test Area',
  strInstructions: 'Test instructions',
  strIngredient1: 'string',
  strIngredient2: 'string',
  strIngredient3: 'string',
  strIngredient4: 'string',
  strIngredient5: 'string',
  strIngredient6: 'string',
  strIngredient7: 'string',
  strIngredient8: 'string',
  strIngredient9: 'string',
  strIngredient10: 'string',
  strIngredient11: 'string',
  strIngredient12: 'string',
  strIngredient13: 'string',
  strIngredient14: 'string',
  strIngredient15: 'string',
  strIngredient16: 'string',
  strIngredient17: 'string',
  strIngredient18: 'string',
  strIngredient19: 'string',
  strIngredient20: 'string',
};

describe('Meal Component', () => {
  it('renders correctly', () => {
    const onPressMock = jest.fn();
    const {getByText, getByTestId} = render(
      <Meal meal={mockMeal} onPress={onPressMock} />,
    );

    // Check if the meal name is rendered
    const mealName = getByText('Test Meal');
    expect(mealName).toBeTruthy();

    // Check if the Image is rendered
    const mealImage = getByTestId('meal-image');
    expect(mealImage).toBeTruthy();
  });

  it('calls onPress function when pressed', () => {
    const onPressMock = jest.fn();
    const {getByTestId} = render(
      <Meal meal={mockMeal} onPress={onPressMock} />,
    );

    // Simulate a press on the component
    fireEvent.press(getByTestId('meal-container'));

    // Check if the onPress function was called
    expect(onPressMock).toHaveBeenCalled();
  });
});
