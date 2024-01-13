import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {CategoryType} from '../Utils/types';

type Props = {
  category: CategoryType;
};

const Category = ({category}: Props) => {
  return (
    <View>
      <Text>Category</Text>
    </View>
  );
};

export default Category;

const styles = StyleSheet.create({});
