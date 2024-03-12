import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {COLORS, SIZES, FONTS, icons} from '../../theme';
import {ButtonIcon, QuantityInput} from '../../components';
import convertToVND from '../../utils/convertToVND';
import {RestaurantTopping, RestaurantToppings} from '../../types/types';

interface ListFooterComponentProps {
  toppings: RestaurantToppings;
  selectedTopping: RestaurantTopping[];
  quantityTopping: number;
  onIncreaseToppingPress: (name: string, price: number) => void;
  onDecreaseToppingPress: (name: string) => void;
}

const ListFooterComponent: React.FC<ListFooterComponentProps> = ({
  toppings,
  selectedTopping,
  quantityTopping,
  onIncreaseToppingPress,
  onDecreaseToppingPress,
}) => {
  const maximum = toppings.maximum;
  return (
    <View style={{paddingBottom: SIZES.height * 0.1}}>
      {/* topping header */}
      <View style={styles.toppingHeader}>
        <Text style={styles.labelText}>{toppings.title}</Text>
        <Text
          style={[
            styles.subLabelText,
            {color: COLORS.primary, marginVertical: SIZES.base},
          ]}>
          {'Chọn tối đa ' + maximum}
        </Text>
      </View>

      {/* render topping */}
      {toppings.data.map((item: {name: string; price: number}) => {
        const currentItem = selectedTopping?.find(
          toppingItem => toppingItem.name === item.name,
        );
        const isMaximum = quantityTopping >= maximum;
        const textColor =
          isMaximum && (currentItem?.quantity || 0) > 0 === false
            ? COLORS.lightGray1
            : COLORS.blackText;

        return (
          <View key={item.name} style={styles.toppingBody}>
            {currentItem?.quantity === undefined ||
            // quantity
            currentItem?.quantity === 0 ? (
              <ButtonIcon
                disabled={isMaximum}
                onPress={() => onIncreaseToppingPress(item.name, item.price)}
                containerStyle={[
                  styles.iconQuantityInputContainer,
                  {
                    backgroundColor: isMaximum
                      ? COLORS.lightPrimary_05
                      : COLORS.lightPrimary,
                  },
                ]}
                icon={icons.add_wght700}
                iconStyle={[
                  styles.iconQuantityInput,
                  {
                    tintColor: isMaximum ? COLORS.lightGray1 : COLORS.primary,
                  },
                ]}
              />
            ) : (
              <QuantityInput
                iconLeft={icons.remove_wght700}
                iconRight={icons.add_wght700}
                onAddPress={() => onIncreaseToppingPress(item.name, item.price)}
                disableRight={isMaximum}
                iconRightStyle={{
                  tintColor: isMaximum ? COLORS.lightGray1 : COLORS.primary,
                }}
                onRemovePress={() => onDecreaseToppingPress(item.name)}
                labelStyle={[styles.labelQuantityInput]}
                iconContainerStyle={styles.iconQuantityInputContainer}
                quantity={currentItem.quantity}
                iconStyle={styles.iconQuantityInput}
              />
            )}
            {/* end quantity */}

            {/* name */}
            <View style={styles.toppingTextWrapper}>
              <Text
                style={{
                  color: textColor,
                  fontWeight:
                    currentItem?.quantity || 0 > 0 ? 'bold' : 'normal',
                }}>
                {item.name}
              </Text>
              <Text style={{color: textColor, ...FONTS.body_medium}}>
                {convertToVND(item.price)}
              </Text>
            </View>
          </View>
        );
      })}
    </View>
  );
};

export default ListFooterComponent;

const styles = StyleSheet.create({
  subLabelText: {color: COLORS.primary, ...FONTS.body_small},
  labelQuantityInput: {
    color: COLORS.blackText,
    ...FONTS.label_large,
    marginHorizontal: 15,
  },
  labelText: {color: COLORS.blackText, ...FONTS.label_large},

  iconQuantityInput: {
    width: 16,
    height: 16,
    tintColor: COLORS.primary,
  },
  iconQuantityInputContainer: {
    height: 32,
    width: 32,
    backgroundColor: COLORS.lightPrimary,
    borderRadius: SIZES.base,
    paddingHorizontal: SIZES.base,
  },
  toppingHeader: {
    padding: SIZES.padding,
    paddingBottom: 0,
    backgroundColor: COLORS.lightPrimary,
  },
  toppingBody: {
    backgroundColor: COLORS.white,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: COLORS.lightGray2,
    padding: SIZES.padding,
  },
  toppingTextWrapper: {
    marginLeft: SIZES.spacing,
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 1,
  },
});
