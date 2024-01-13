import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Colors} from '../Utils/constants';
import {useAppDispatch, useAppSelector} from '../Redux/store/store';
import {getCategoryList} from '../Redux/actions/actions';
import Category from '../Components/Category';

type Props = {};

const HomeScreen = (props: Props) => {
  const [searchValue, setSearchValue] = useState<string>();
  const onChangeText = (value: string) => {
    setSearchValue(value);
  };
  const {loading, categories} = useAppSelector(state => state.global);
  const dispatch = useAppDispatch();
  useEffect(() => {
    categories.length === 0 && dispatch(getCategoryList());
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
            placeholder="Enter some ingredients"
            onChangeText={onChangeText}
            placeholderTextColor={'#7d7d7d'}
            style={styles.input}
          />
        </View>
      </View>
      <View style={styles.categories}>
        <Text style={[styles.brandText, styles.categoriesTitle]}>
          Categories
        </Text>
        <FlatList
          data={categories}
          renderItem={({item, index}) => (
            <Category category={item} key={index} />
          )}
          horizontal
          style={styles.flatlist}
        />
      </View>
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
  categories: {
    paddingLeft: 10,
    paddingVertical: 10,
  },
  flatlist: {},
  categoriesTitle: {
    fontSize: 17,
  },
});
