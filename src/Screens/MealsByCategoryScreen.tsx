import {
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect, useMemo, useRef, useState} from 'react';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RouteProp} from '@react-navigation/native';
import {AppStackParams, MealType} from '../Utils/types';
import {useAppDispatch, useAppSelector} from '../Redux/store/store';
import {getAMealByName, getMealSByCategory} from '../Redux/actions/actions';
import {Colors} from '../Utils/constants';
import Meal from '../Components/Meal';
import BottomSheet from '@gorhom/bottom-sheet';
import useYouTube from '../Hooks/useYouTube';
import {clearFetchedMeal} from '../Redux/reducers/reducers';
import Loading from '../Components/Loading';

type Props = {
  navigation: NativeStackNavigationProp<
    AppStackParams,
    'MealsByCategoryScreen'
  >;
  route: RouteProp<AppStackParams, 'MealsByCategoryScreen'>;
};

const MealsByCategoryScreen = ({navigation, route}: Props) => {
  const dispatch = useAppDispatch();
  const {openYouTubeLink} = useYouTube();
  const {meals, loading, meal} = useAppSelector(state => state.global);
  const [selectedMeal, setSelectedMeal] = useState<MealType>();
  const bottomSheetRef = useRef<BottomSheet>(null);
  const onBottomSheetChange = (index: number) => {
    if (index === 0) {
      bottomSheetRef.current?.close();
      setSelectedMeal(undefined);
    }
  };
  const snapPoints = useMemo(() => ['1%', '85%'], []);

  useEffect(() => {
    dispatch(getMealSByCategory(route.params.category));

    return () => {
      dispatch(clearFetchedMeal());
    };
  }, []);
  useEffect(() => {
    if (Boolean(meal)) {
      setSelectedMeal(meal);
    }
  }, [meal]);

  const onMealPress = (meal: MealType) => {
    dispatch(getAMealByName(meal.strMeal));
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Pressable style={styles.backButton} onPress={navigation.goBack} />
        <Text style={styles.title}>{route.params.category}</Text>
        <View />
      </View>
      {loading && meals.length === 0 ? (
        <Loading />
      ) : (
        <ScrollView contentContainerStyle={styles.scrollView}>
          {meals.map((meal, index) => (
            <Meal meal={meal} key={index} onPress={() => onMealPress(meal)} />
          ))}
        </ScrollView>
      )}

      {Boolean(selectedMeal) && (
        <BottomSheet
          ref={bottomSheetRef}
          index={1}
          backgroundStyle={{backgroundColor: Colors.black}}
          snapPoints={snapPoints}
          handleIndicatorStyle={{display: 'none'}}
          animateOnMount
          onChange={onBottomSheetChange}
          onClose={() => onBottomSheetChange(0)}
          enablePanDownToClose={true}>
          <ScrollView contentContainerStyle={styles.bottomSheetContent}>
            <Image
              src={selectedMeal?.strMealThumb}
              style={styles.image}
              resizeMode="cover"
              key={'img'}
            />
            <Pressable
              style={styles.close}
              key={'close'}
              onPress={() => onBottomSheetChange(0)}>
              <Text style={styles.x}>x</Text>
            </Pressable>
            <Text key={'meal'} style={styles.selectedMealName}>
              {selectedMeal?.strMeal}
            </Text>
            <Text style={styles.ingredientText}>Ingredients</Text>
            {[...Array(20)].map((val, index) => {
              let ingredient =
                selectedMeal![`strIngredient${index + 1}` as keyof MealType];
              return (
                Boolean(ingredient) && (
                  <Text style={styles.strIngredient} key={index}>
                    {`${index + 1}) `}
                    {ingredient}
                  </Text>
                )
              );
            })}
            <Text
              onPress={() => openYouTubeLink(selectedMeal!.strYoutube)}
              style={styles.youtubeLink}
              key={'youtube'}>
              Watch on YouTube
            </Text>
          </ScrollView>
        </BottomSheet>
      )}
    </SafeAreaView>
  );
};

export default MealsByCategoryScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.backgroundColor,
    flex: 1,
  },
  title: {
    color: Colors.primaryColor,
    fontSize: 25,
    fontWeight: 'bold',
    marginRight: 30,
  },
  scrollView: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  selectedMealName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.primaryColor,
    alignSelf: 'center',
    marginVertical: 10,
  },
  strIngredient: {
    color: Colors.textColor,
  },
  bottomSheetContent: {
    alignItems: 'center',
  },
  youtubeLink: {
    fontSize: 18,
    color: Colors.red,
    marginVertical: 18,
  },
  close: {
    position: 'absolute',
    right: 10,
    top: 10,
    backgroundColor: Colors.black,
    paddingHorizontal: 12,
    paddingBottom: 5,
    borderRadius: 50,
  },
  x: {
    fontSize: 30,
    fontWeight: 'bold',
    color: Colors.red,
  },
  image: {
    width: '100%',
    height: 250,
    borderRadius: 20,
  },
  ingredientText: {
    fontWeight: 'bold',
    letterSpacing: 0.5,
    marginBottom: 5,
    color: Colors.secondaryColor,
    fontSize: 16,
  },
  backButton: {
    transform: [{rotate: '225deg'}, {scale: 0.8}],
    width: 22,
    height: 22,
    borderColor: Colors.secondaryColor,
    borderRightWidth: 3,
    borderTopWidth: 3,
    marginLeft: 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    marginBottom: 10,
  },
});
