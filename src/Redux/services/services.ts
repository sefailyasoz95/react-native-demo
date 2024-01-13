import {HttpStatusCode} from 'axios';
import axiosClient from '../../Utils/axiosClient';
import {MealType} from '../../Utils/types';

export const GetMealByNameService = async (mealName: string) => {
  try {
    const response = await axiosClient.get(`search.php?s=${mealName}`);
    return {
      data: response.data.meals,
      message: 'Success',
      status: response.status,
    };
  } catch (error: any) {
    return {
      data: null,
      message: error?.response?.message || 'Request failed',
      status: HttpStatusCode.BadRequest,
    };
  }
};

export const GetCategoryListService = async () => {
  try {
    const response = await axiosClient.get(`categories.php`);
    return {
      data: response.data.categories,
      message: 'Success',
      status: response.status,
    };
  } catch (error: any) {
    return {
      data: null,
      message: error?.response?.message || 'Request failed',
      status: HttpStatusCode.BadRequest,
    };
  }
};

export const GetRandomMealsService = async () => {
  let meals = [] as MealType[];
  try {
    const response1 = await axiosClient.get(`random.php`);
    const response2 = await axiosClient.get(`random.php`);
    const response3 = await axiosClient.get(`random.php`);
    const response4 = await axiosClient.get(`random.php`);
    const response5 = await axiosClient.get(`random.php`);
    meals.push(response1.data.meals[0]);
    meals.push(response2.data.meals[0]);
    meals.push(response3.data.meals[0]);
    meals.push(response4.data.meals[0]);
    meals.push(response5.data.meals[0]);
    return {
      data: meals,
      message: 'Success',
      status: HttpStatusCode.Ok,
    };
  } catch (error: any) {
    return {
      data: null,
      message: error?.response?.message || 'Request failed',
      status: HttpStatusCode.BadRequest,
    };
  }
};

export const GetMealSByCategoryService = async (category: string) => {
  try {
    const response = await axiosClient.get(`filter.php?c=${category}`);
    return {
      data: response.data.meals,
      message: 'Success',
      status: response.status,
    };
  } catch (error: any) {
    return {
      data: null,
      message: error?.response?.message || 'Request failed',
      status: HttpStatusCode.BadRequest,
    };
  }
};
