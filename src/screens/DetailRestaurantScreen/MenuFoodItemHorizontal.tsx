import {StyleSheet, Image, TouchableOpacity, Text, View} from 'react-native';
import React, {memo} from 'react';
import {SIZES, COLORS, FONTS} from '../../config';
import {Food, FoodRedux, MenuFood} from '../../types/types';
import convertToVND from '../../utils/convertToVND';
import {Break} from '../../components';

interface MenuFoodItemHorizontailProps {
  foodItem: MenuFood;
  onFoodItemPress: (item: Food) => void;
  cart: FoodRedux[] | undefined;
}
const MenuFoodItemHorizontail: React.FC<MenuFoodItemHorizontailProps> = memo(
  ({foodItem, cart, onFoodItemPress}) => {
    const lastIndex = foodItem.foods.length - 1;
    return (
      <View
        style={{
          width: SIZES.width,
          paddingVertical: SIZES.spacing,
          backgroundColor: COLORS.white,
        }}>
        <Text style={styles.categoryWrapper}>{foodItem.label}</Text>
        <View>
          {foodItem.foods.map((item, index) => {
            const foodChecked = cart?.find(food => food.name === item.name);
            const backgroundColor = foodChecked ? COLORS.primary : COLORS.white;
            const fontWeight = foodChecked ? 'bold' : 'normal';
            return (
              <TouchableOpacity
                onPress={() => {
                  onFoodItemPress(item);
                }}
                key={item.id}
                style={{width: '100%'}}>
                <View style={styles.foodItemWrapper}>
                  <View
                    style={[
                      {backgroundColor: backgroundColor},
                      styles.lineVertical,
                    ]}
                  />
                  <View style={styles.foodInfoWrapper}>
                    <Text
                      numberOfLines={2}
                      style={[
                        FONTS.body_large,
                        {color: COLORS.blackText, fontWeight},
                      ]}>
                      {foodChecked?.quantity && (
                        <Text style={{color: COLORS.primary}}>
                          {foodChecked?.quantity}x{' '}
                        </Text>
                      )}
                      {item.name}
                    </Text>
                    <Text style={[{color: COLORS.gray, ...FONTS.body_medium}]}>
                      {item.description}
                    </Text>
                    <Text
                      style={[{color: COLORS.blackText, ...FONTS.body_medium}]}>
                      {convertToVND(item.price)}
                    </Text>
                  </View>
                  <Image
                    source={{uri: item.image}}
                    style={{
                      width: SIZES.width * 0.2,
                      height: SIZES.width * 0.2,
                      borderRadius: SIZES.radius,
                      marginVertical: SIZES.padding,
                      marginRight: SIZES.padding,
                    }}
                  />
                </View>
                {index !== lastIndex && <Break height={1} />}
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    );
  },
);

export default MenuFoodItemHorizontail;

const styles = StyleSheet.create({
  lineVertical: {
    height: '100%',
    width: 6,
  },
  foodInfoWrapper: {
    marginVertical: SIZES.padding,
    flex: 1,
    marginLeft: SIZES.padding - 6,
    justifyContent: 'space-between',
  },
  foodItemWrapper: {
    flexDirection: 'row',
    paddingLeft: 0,
  },
  categoryWrapper: {
    color: COLORS.blackText,
    padding: SIZES.padding,
    ...FONTS.title_large,
    fontWeight: 'bold',
  },
});
