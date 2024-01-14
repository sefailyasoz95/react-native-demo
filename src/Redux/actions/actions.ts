import {createAsyncThunk} from '@reduxjs/toolkit';
import {
  GetCategoryListService,
  GetMealsByNameService,
  GetMealSByCategoryService,
  GetRandomMealsService,
  GetAMealByNameService,
} from '../services/services';

export const getMealsByName = createAsyncThunk(
  'meals/byname',
  async (mealName: string) => {
    return await GetMealsByNameService(mealName);
  },
);

export const getAMealByName = createAsyncThunk(
  'meals/aMealByname',
  async (mealName: string) => {
    return await GetAMealByNameService(mealName);
  },
);

export const getRandomMeals = createAsyncThunk('meals/random', async () => {
  return await GetRandomMealsService();
});

export const getCategoryList = createAsyncThunk(
  'meals/categories',
  async () => {
    return await GetCategoryListService();
  },
);

export const getMealSByCategory = createAsyncThunk(
  'meals/category',
  async (category: string) => {
    return await GetMealSByCategoryService(category);
  },
);
