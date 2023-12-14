import {
  StyleSheet,
  Image,
  TouchableOpacity,
  Pressable,
  Text,
  View,
} from 'react-native';
import React from 'react';
import {SIZES, FONTS, COLORS, icons} from '../../config';
import convertToVND from '../../utils/convertToVND';
import {FlashList} from '@shopify/flash-list';
import {Food} from '../../types/types';

interface ListRecommendProps {
  data: Food[];
}
const ListRecommend: React.FC<ListRecommendProps> = ({data}) => {
  return (
    <View style={{padding: SIZES.padding}}>
      <Text
        style={[
          FONTS.label_large,
          {color: COLORS.gray, marginBottom: SIZES.spacing},
        ]}>
        Chọn thêm món ngon nè
      </Text>
      <FlashList
        horizontal
        contentContainerStyle={{
          paddingVertical: 4,
        }}
        snapToInterval={SIZES.width * 0.7}
        showsHorizontalScrollIndicator={false}
        estimatedItemSize={SIZES.width * 0.2}
        data={data}
        renderItem={({item}) => {
          return (
            <Pressable>
              <View style={styles.foodItem}>
                <Image
                  source={{uri: item.image}}
                  style={{
                    borderTopLeftRadius: SIZES.radius,
                    borderBottomLeftRadius: SIZES.radius,
                    height: SIZES.width * 0.3,
                    width: SIZES.width * 0.25,
                  }}
                />
                <View style={styles.description}>
                  <Text style={[FONTS.label_large, {color: COLORS.blackText}]}>
                    {item.name}
                  </Text>
                  <View style={styles.spaceBetween}>
                    <Text
                      style={[FONTS.label_large, {color: COLORS.blackText}]}>
                      {convertToVND(item.price)}
                    </Text>
                    <TouchableOpacity style={styles.add}>
                      <Image
                        source={icons.add_wght700}
                        style={{width: 20, height: 20}}
                        tintColor={COLORS.white}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </Pressable>
          );
        }}
      />
    </View>
  );
};

export default ListRecommend;

const styles = StyleSheet.create({
  description: {
    borderTopRightRadius: SIZES.radius,
    borderBottomRightRadius: SIZES.radius,
    height: '100%',
    flex: 1,
    padding: SIZES.spacing,
    borderWidth: 1,
    borderColor: COLORS.lightGray1,
  },

  spaceBetween: {
    flex: 1,
    alignItems: 'flex-end',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  add: {
    width: 32,
    height: 32,
    borderRadius: 32,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  foodItem: {
    borderRadius: SIZES.radius,
    width: SIZES.width * 0.7,
    marginRight: 20,
    flexDirection: 'row',
  },
});
