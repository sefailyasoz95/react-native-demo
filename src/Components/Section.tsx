import {FlatList, ListRenderItem, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Colors, DEVICE_WIDTH} from '../Utils/constants';

type Props = {
  title: string;
  renderItem: ListRenderItem<any>;
  data: any[];
  loading: boolean;
};

const Section = ({renderItem, title, data, loading}: Props) => {
  return (
    <View style={styles.categories}>
      <Text style={styles.categoriesTitle}>{title}</Text>
      <FlatList
        data={data}
        renderItem={renderItem}
        horizontal
        showsHorizontalScrollIndicator={false}
        snapToInterval={DEVICE_WIDTH * 0.35 + 10}
        ListEmptyComponent={() => (
          <View
            style={{
              width: DEVICE_WIDTH,
            }}>
            {loading && data.length === 0 ? (
              <Text style={styles.listEmptyComponent}>Loading...</Text>
            ) : (
              <Text style={styles.listEmptyComponent}>No item to show!</Text>
            )}
          </View>
        )}
      />
    </View>
  );
};

export default Section;

const styles = StyleSheet.create({
  categories: {
    paddingLeft: 10,
    paddingVertical: 10,
  },

  categoriesTitle: {
    fontSize: 17,
    color: Colors.primaryColor,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
  listEmptyComponent: {
    alignSelf: 'center',
    color: Colors.white,
    fontWeight: 'bold',
    fontSize: 20,
    marginTop: 15,
  },
});
