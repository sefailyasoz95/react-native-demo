import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {AppStackParams, CategoryType} from '../Utils/types';
import {Colors, DEVICE_WIDTH} from '../Utils/constants';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

type Props = {
  category: CategoryType;
};

const Category = ({category}: Props) => {
  const navigation = useNavigation<NativeStackNavigationProp<AppStackParams>>();
  const handlePress = () => {
    navigation.navigate('MealsByCategoryScreen', {
      category: category.strCategory,
    });
  };
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
