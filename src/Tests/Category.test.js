import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import Category from '../Components/Category';
import {useNavigation} from '@react-navigation/native';

jest.mock('@react-navigation/native');

const mockCategory = {
  idCategory: '1',
  strCategory: 'Test Category',
  strCategoryThumb: 'test_image_url',
  strCategoryDescription: 'Test category description',
};

describe('Category Component', () => {
  it('renders correctly', () => {
    const {getByText, getByTestId} = render(
      <Category category={mockCategory} />,
    );

    // Check if the category name is rendered
    expect(getByText('Test Category')).toBeTruthy();

    // Check if the image is rendered
    expect(getByTestId('category-image')).toBeTruthy();
  });

  it('navigates to MealsByCategoryScreen on press', () => {
    const navigateMock = jest.fn();
    useNavigation.mockReturnValue({navigate: navigateMock});

    const {getByTestId} = render(<Category category={mockCategory} />);

    // Simulate a press on the component
    fireEvent.press(getByTestId('category-pressable'));

    // Check if the navigation function was called with the correct parameters
    expect(navigateMock).toHaveBeenCalledWith('MealsByCategoryScreen', {
      category: 'Test Category',
    });
  });
});
