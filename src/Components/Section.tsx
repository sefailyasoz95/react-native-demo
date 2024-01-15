import {FlatList, ListRenderItem, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Colors, DEVICE_WIDTH} from '../Utils/constants';
import Loading from './Loading';

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
        testID="section-flatlist"
        horizontal
        showsHorizontalScrollIndicator={false}
        snapToInterval={DEVICE_WIDTH * 0.35 + 10}
        ListEmptyComponent={() => (
          <View
            style={{
              width: DEVICE_WIDTH,
            }}>
            {loading && data.length === 0 ? (
              <Loading />
            ) : (
              <Text testID="no-item" style={styles.listEmptyComponent}>
                No item to show!
              </Text>
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
    width: 100,
  },
});
