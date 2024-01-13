import {
  Image,
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
import {CategoryType} from '../Utils/types';
import {Colors, DEVICE_HEIGHT, DEVICE_WIDTH} from '../Utils/constants';

type Props = {
  category: CategoryType;
};

const Category = ({category}: Props) => {
  const handlePress = () => {};
  return (
    <Pressable style={styles.container} onPress={handlePress}>
      <View style={styles.imgContainer}>
        <Image
          src={category.strCategoryThumb}
          resizeMode="contain"
          style={styles.img}
        />
      </View>
      <Text style={styles.name}>{category.strCategory}</Text>
    </Pressable>
  );
};

export default Category;

const styles = StyleSheet.create({
  container: {
    borderRadius: 15,
    margin: 5,
    backgroundColor: Colors.backgroundColorHalfOpacity,
    width: DEVICE_WIDTH * 0.35,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: 10,
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
