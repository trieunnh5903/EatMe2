import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {COLORS, SIZES, FONTS} from '../../config';
import convertToVND from '../../utils/convertToVND';
import {ShopOption, ShopOptionGroup} from '../../types/types';

interface RadioGroupProp {
  selectedOption: ShopOption[];
  setSelectedOption: React.Dispatch<React.SetStateAction<ShopOption[]>>;
  data: ShopOptionGroup;
}
const RadioButtonGroup: React.FC<RadioGroupProp> = ({
  data,
  selectedOption,
  setSelectedOption,
}) => {
  const handleOptionSelect = (item: ShopOption) => {
    if (
      selectedOption.some(selectedItem => selectedItem.title === item.title)
    ) {
      // Nếu đã tồn tại, cập nhật selectedOption
      const updatedOptions = selectedOption.map(selectedItem => {
        if (selectedItem.title === item.title) {
          return item;
        }
        return selectedItem;
      });
      setSelectedOption(updatedOptions);
    } else {
      // Nếu item chưa tồn tại, thêm nó vào selectedOption
      setSelectedOption([...selectedOption, item]);
    }
  };
  return (
    <View>
      {data.optionGroup.map((item, index) => {
        const isSelected = selectedOption?.some(i => i.option === item.option);
        return (
          <TouchableOpacity
            key={index}
            style={styles.radioWrapper}
            onPress={() =>
              handleOptionSelect({
                title: data.title,
                option: item.option,
                price: item.price,
              })
            }>
            <View
              style={[
                {
                  borderColor: isSelected ? COLORS.primary : COLORS.lightGray1,
                },
                styles.circleSelect,
              ]}>
              {isSelected && <View style={styles.circleSelected} />}
            </View>
            <View style={styles.textWrapper}>
              <Text
                style={[
                  {fontWeight: isSelected ? 'bold' : 'normal'},
                  styles.label,
                ]}>
                {item.option}
              </Text>
              <Text style={{color: COLORS.blackText, ...FONTS.body_medium}}>
                {convertToVND(item.price)}
              </Text>
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default RadioButtonGroup;

const styles = StyleSheet.create({
  label: {
    color: COLORS.blackText,
    ...FONTS.body_medium,
  },
  textWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 1,
  },

  circleSelect: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },

  circleSelected: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: COLORS.primary,
  },
  radioWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: COLORS.lightGray2,
    padding: SIZES.padding,
  },
});
