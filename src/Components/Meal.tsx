import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {MealType} from '../Utils/types';
import {Colors, DEVICE_WIDTH} from '../Utils/constants';

type Props = {
  meal: MealType;
  onPress: () => void;
};

const Meal = ({meal, onPress}: Props) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <View style={styles.imgContainer}>
        <Image
          src={meal.strMealThumb}
          resizeMode="contain"
          style={styles.img}
        />
      </View>
      <Text style={styles.name}>{meal.strMeal}</Text>
    </TouchableOpacity>
  );
};

export default Meal;

const styles = StyleSheet.create({
  container: {
    borderRadius: 15,
    margin: 5,
    backgroundColor: Colors.backgroundColorHalfOpacity,
    width: DEVICE_WIDTH * 0.35,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingTop: 10,
    paddingBottom: 5,
  },
  name: {
    fontWeight: 'bold',
    fontSize: DEVICE_WIDTH * 0.027,
    color: Colors.primaryColor,
    textAlign: 'center',
  },
  img: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  imgContainer: {
    width: 100,
    height: 100,
    alignSelf: 'center',
    marginBottom: 5,
  },
  description: {
    fontSize: 12,
    color: Colors.black,
  },
});
