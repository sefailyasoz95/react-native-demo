import {
  Image,
  NativeSyntheticEvent,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TextInputEndEditingEventData,
  View,
} from 'react-native';
import React, {useEffect, useMemo, useRef, useState} from 'react';
import {Colors} from '../Utils/constants';
import {useAppDispatch, useAppSelector} from '../Redux/store/store';
import {getCategoryList, getRandomMeals} from '../Redux/actions/actions';
import Category from '../Components/Category';
import Section from '../Components/Section';
import Meal from '../Components/Meal';
import {AppStackParams, MealType} from '../Utils/types';
import BottomSheet from '@gorhom/bottom-sheet';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RouteProp} from '@react-navigation/native';
import useYouTube from '../Hooks/useYouTube';

type Props = {
  navigation: NativeStackNavigationProp<AppStackParams, 'HomeScreen'>;
  route: RouteProp<AppStackParams, 'HomeScreen'>;
};

const HomeScreen = ({navigation, route}: Props) => {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ['1%', '85%'], []);
  const {openYouTubeLink} = useYouTube();
  const onYouTubePress = async () => {
    openYouTubeLink(selectedMeal!.strYoutube);
  };
  const [selectedMeal, setSelectedMeal] = useState<MealType>();
  const {loading, categories, randomMeals, isRandomMealsLoading, meal} =
    useAppSelector(state => state.global);

  const handleSearch = (
    event: NativeSyntheticEvent<TextInputEndEditingEventData>,
  ) => {
    navigation.navigate('SearchResultScreen', {
      searchValue: event.nativeEvent.text,
    });
  };
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
            placeholderTextColor={'#7d7d7d'}
            style={styles.input}
            enterKeyHint="search"
            onEndEditing={handleSearch}
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
              onPress={onYouTubePress}
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

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.backgroundColor,
    flex: 1,
  },
  header: {
    flexDirection: 'column',
    padding: 10,
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
});
