import {
  Alert,
  Image,
  Linking,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import React, {useEffect, useMemo, useRef, useState} from 'react';
import {Colors} from '../Utils/constants';
import {useAppDispatch, useAppSelector} from '../Redux/store/store';
import {getCategoryList, getRandomMeals} from '../Redux/actions/actions';
import Category from '../Components/Category';
import Section from '../Components/Section';
import Meal from '../Components/Meal';
import {MealType} from '../Utils/types';
import BottomSheet from '@gorhom/bottom-sheet';

type Props = {};

const HomeScreen = (props: Props) => {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const [searchValue, setSearchValue] = useState<string>();
  const snapPoints = useMemo(() => ['1%', '85%'], []);
  const onChangeText = (value: string) => {
    setSearchValue(value);
  };
  const onYouTubePress = async () => {
    const supported = await Linking.canOpenURL(selectedMeal!.strYoutube);
    if (supported) {
      await Linking.openURL(selectedMeal!.strYoutube);
    } else {
      Alert.alert(`This video cannot be opened right now.`);
    }
  };
  const [selectedMeal, setSelectedMeal] = useState<MealType>();
  const {loading, categories, randomMeals, isRandomMealsLoading} =
    useAppSelector(state => state.global);
  const onBottomSheetChange = (index: number) => {
    if (index === 0) {
      bottomSheetRef.current?.close();
      setSelectedMeal(undefined);
    }
  };
  const dispatch = useAppDispatch();
  useEffect(() => {
    categories.length === 0 && dispatch(getCategoryList());
    randomMeals.length === 0 && dispatch(getRandomMeals());
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>
          You just cannot decide what to cook today?
        </Text>
        <Text style={styles.headerText}>
          Let <Text style={styles.brandText}>Food GPT</Text> help you out!
        </Text>
        <View style={styles.searchSection}>
          <Text style={styles.headerText}>Search</Text>
          <TextInput
            placeholder="Enter some ingredients or a meal name"
            onChangeText={onChangeText}
            placeholderTextColor={'#7d7d7d'}
            style={styles.input}
          />
        </View>
      </View>
      <Section
        title="Categories"
        data={categories}
        loading={loading}
        renderItem={({item, index}) => <Category category={item} key={index} />}
      />
      <Section
        title="Some random meals for you"
        data={randomMeals}
        loading={isRandomMealsLoading}
        renderItem={({item, index}) => (
          <Meal meal={item} onPress={() => setSelectedMeal(item)} key={index} />
        )}
      />
      {Boolean(selectedMeal) && (
        <BottomSheet
          ref={bottomSheetRef}
          index={1}
          backgroundStyle={{backgroundColor: Colors.black}}
          snapPoints={snapPoints}
          handleIndicatorStyle={{display: 'none'}}
          animateOnMount
          onChange={onBottomSheetChange}
          onClose={() => setSelectedMeal(undefined)}
          enablePanDownToClose={true}>
          <ScrollView contentContainerStyle={styles.bottomSheetContent}>
            <Image
              src={selectedMeal?.strMealThumb}
              style={styles.image}
              resizeMode="cover"
            />
            <Text style={styles.selectedMealName}>{selectedMeal?.strMeal}</Text>
            <Text
              style={{
                ...styles.brandText,
                marginBottom: 5,
                color: Colors.secondaryColor,
                fontSize: 16,
              }}>
              Ingredients
            </Text>
            {[...Array(20)].map((val, index) => {
              let ingredient =
                selectedMeal![`strIngredient${index + 1}` as keyof MealType];
              return Boolean(ingredient) ? (
                <Text style={styles.strIngredient} key={index}>
                  {`${index + 1}) `}
                  {ingredient}
                </Text>
              ) : (
                <></>
              );
            })}
            <Text onPress={onYouTubePress} style={styles.youtubeLink}>
              Watch on YouTube
            </Text>
          </ScrollView>
        </BottomSheet>
      )}
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  header: {
    flexDirection: 'column',
    padding: 10,
  },
  container: {
    backgroundColor: Colors.backgroundColor,
    flex: 1,
  },
  headerText: {
    color: Colors.textColor,
    fontSize: 16,
    marginVertical: 3,
    letterSpacing: 0.5,
    fontWeight: '600',
  },
  brandText: {
    color: Colors.primaryColor,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
  searchSection: {
    marginTop: 15,
    gap: 5,
    backgroundColor: Colors.backgroundColor,
  },
  input: {
    borderWidth: 2,
    borderStyle: 'solid',
    borderColor: Colors.primaryColor,
    paddingVertical: 8,
    paddingHorizontal: 5,
    borderRadius: 6,
    color: Colors.white,
  },
  image: {
    width: '100%',
    height: 250,
    borderRadius: 20,
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
});
