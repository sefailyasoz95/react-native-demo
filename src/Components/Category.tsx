import {Image, ImageBackground, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {CategoryType} from '../Utils/types';
import {Colors, DEVICE_HEIGHT, DEVICE_WIDTH} from '../Utils/constants';

type Props = {
  category: CategoryType;
};

const Category = ({category}: Props) => {
  return (
    <View style={styles.container}>
      <View style={styles.imgContainer}>
        <Image
          src={`${category.strCategoryThumb}`}
          resizeMode="contain"
          style={styles.img}
        />
      </View>
      <Text style={styles.name}>{category.strCategory}</Text>
      <Text style={styles.description}>
        {category.strCategoryDescription.split('.')[0]}
      </Text>
    </View>
  );
};

export default Category;

const styles = StyleSheet.create({
  container: {
    borderRadius: 15,
    margin: 5,
    backgroundColor: Colors.backgroundColorHalfOpacity,
    padding: 10,
    width: DEVICE_WIDTH * 0.35,
  },
  name: {
    fontWeight: 'bold',
    fontSize: 17,
    color: Colors.primaryColor,
  },
  img: {
    width: '100%',
    height: '100%',
  },
  imgContainer: {
    width: 100,
    height: 100,
    alignSelf: 'center',
  },
  description: {
    fontSize: 12,
    color: Colors.black,
  },
});
