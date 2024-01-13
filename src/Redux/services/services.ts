import {HttpStatusCode} from 'axios';
import axiosClient from '../../Utils/axiosClient';

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

export const GetMealSuggestionsByLocationService = async (location: string) => {
  try {
    const response = await axiosClient.get(`filter.php?a=${location}`);
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
