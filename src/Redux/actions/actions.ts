import {createAsyncThunk} from '@reduxjs/toolkit';
import {
  GetCategoryListService,
  GetMealByNameService,
  GetMealSByCategoryService,
  GetMealSuggestionsByLocationService,
} from '../services/services';

export const getMealsByName = createAsyncThunk(
  'meals/byname',
  async (mealName: string) => {
    return await GetMealByNameService(mealName);
  },
);

export const getMealSuggestionsByLocation = createAsyncThunk(
  'meals/location',
  async (location: string) => {
    return await GetMealSuggestionsByLocationService(location);
  },
);

export const getCategoryList = createAsyncThunk(
  'meals/categories',
  async () => {
    return await GetCategoryListService();
  },
);

export const getMealSuggestionsByCategory = createAsyncThunk(
  'meals/category',
  async (category: string) => {
    return await GetMealSByCategoryService(category);
  },
);
