import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {COLORS, FONTS, SIZES} from '../../config';
import {FlatList} from 'react-native';
import {VerticalFoodCard} from '../../components';
import {Food, FoodRedux} from '../../types/types';

interface ListHightLightPops {
  bestSeller: Food[];
  onFoodItemPress: (food: Food) => void;
  cart: FoodRedux[];
}
const ListHightLight = ({
  bestSeller,
  onFoodItemPress,
  cart,
}: ListHightLightPops) => {
  return (
    <FlatList
      ListHeaderComponent={
        <Text style={styles.categoryWrapper}>Không thể bỏ qua</Text>
      }
      numColumns={2}
      columnWrapperStyle={{
        marginHorizontal: 2 * SIZES.spacing,
        gap: 2 * SIZES.spacing,
      }}
      // eslint-disable-next-line react/no-unstable-nested-components
      ItemSeparatorComponent={() => (
        <View style={{height: 2 * SIZES.spacing}} />
      )}
      data={bestSeller}
      keyExtractor={item => item.id}
      renderItem={({item}) => {
        const foodChecked = cart?.find(food => food.name === item.name);
        return (
          <VerticalFoodCard
            foodChecked={foodChecked}
            onPress={() => onFoodItemPress(item)}
            imageStyle={{
              height: (SIZES.width - 6 * SIZES.spacing) / 2,
              width: (SIZES.width - 6 * SIZES.spacing) / 2,
            }}
            containerStyle={{flex: 1}}
            item={item}
          />
        );
      }}
    />
  );
};

export default ListHightLight;

const styles = StyleSheet.create({
  categoryWrapper: {
    color: COLORS.blackText,
    padding: SIZES.padding,
    ...FONTS.title_large,
    fontWeight: 'bold',
  },
});
