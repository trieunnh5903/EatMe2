import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {SIZES, FONTS, COLORS} from '../../config';
import {Ionicons} from '../../utils';
import convertToVND from '../../utils/convertToVND';
import {FoodRedux} from '../../types/types';

interface ListFoodInCart {
  cartList: FoodRedux[];
  onAddMoreFoodPress: () => void | undefined;
}
const ListFoodInCart: React.FC<ListFoodInCart> = ({
  cartList,
  onAddMoreFoodPress,
}) => {
  return (
    <View style={{padding: SIZES.padding}}>
      <Text style={[FONTS.label_large, {color: COLORS.gray}]}>
        Đơn hàng của bạn
      </Text>
      <View>
        {cartList.map(food => {
          return (
            <TouchableOpacity key={food.id} style={styles.itemContainer}>
              {/* content */}
              <View style={{flex: 1, flexDirection: 'row'}}>
                <View style={styles.quantity}>
                  <Text style={[FONTS.label_large, {color: COLORS.gray}]}>
                    {food.quantity}x
                  </Text>
                </View>
                <View style={{flex: 1, marginRight: SIZES.base}}>
                  <Text style={styles.itemName}>{food.name}</Text>
                  <Text
                    style={{
                      color: COLORS.darkGray,
                      ...FONTS.body_medium,
                    }}>
                    {food.options?.map((item, index) => {
                      const lastIndex = food.options?.length;
                      if (lastIndex) {
                        if (index === lastIndex - 1) {
                          return item.option;
                        }
                      }
                      return item.option + ', ';
                    })}
                    {food.toppings && food.toppings.length > 0 && ', '}
                    {food.toppings?.map((item, index) => {
                      const lastIndex = food.toppings?.length;
                      if (lastIndex) {
                        if (index === lastIndex - 1) {
                          return item.name;
                        }
                      }
                      return item.name + ', ';
                    })}
                  </Text>
                </View>
                <View style={styles.quantityWrapper}>
                  <Text style={styles.totalPrice}>
                    {convertToVND(food.price)}
                  </Text>
                  <TouchableOpacity style={{marginLeft: SIZES.base}}>
                    <Ionicons
                      name="close-circle-sharp"
                      color={COLORS.gray3}
                      size={24}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* add food  */}
      <View
        style={{
          paddingHorizontal: SIZES.padding,
          marginTop: SIZES.padding,
        }}>
        <TouchableOpacity onPress={onAddMoreFoodPress}>
          <Text
            style={[
              FONTS.label_large,
              {color: COLORS.primary, fontWeight: 'bold'},
            ]}>
            + Thêm món
          </Text>
        </TouchableOpacity>
        <View style={styles.tooltip}>
          <View style={styles.triangle} />
          <Text style={[FONTS.title_medium, {color: COLORS.orange}]}>
            Tiết kiệm 3.0000đ với đơn giá từ 15.000đ
          </Text>
        </View>
      </View>
    </View>
  );
};

export default ListFoodInCart;

const styles = StyleSheet.create({
  tooltip: {
    justifyContent: 'center',
    padding: SIZES.spacing,
    marginTop: 12,
    borderRadius: SIZES.radius,
    backgroundColor: COLORS.primary2(0.1),
  },
  triangle: {
    position: 'absolute',
    top: -12,
    left: '10%',
    width: 0,
    height: 0,
    borderLeftWidth: 12,
    borderRightWidth: 12,
    borderBottomWidth: 12,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: COLORS.primary2(0.1),
  },

  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SIZES.spacing,
    borderBottomWidth: 1,
    borderColor: COLORS.lightGray2,
  },
  quantity: {
    height: '100%',
    paddingVertical: 4,
    paddingRight: SIZES.base,
  },

  totalPrice: {
    color: COLORS.black,
    ...FONTS.body_large,
  },

  itemName: {
    color: COLORS.blackText,
    ...FONTS.body_large,
    fontWeight: '600',
  },
  quantityWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
