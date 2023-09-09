import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
} from 'react-native';
import React, {useCallback, useState} from 'react';
import {COLORS, FONTS, SIZES, icons} from '../../config';
import {ButtonIcon, HeaderCustom} from '../../components';
import {FoodObject} from '../types';
import {useAppDispatch, useAppSelector} from '../../utils/hooks';
import {removeFromFavorite} from '../../redux/slice/user.slice';
import {FavoriteScreenProp} from '../../navigation/types';

const Favourite = ({navigation}: FavoriteScreenProp) => {
  const dispatch = useAppDispatch();
  const favoriteList = useAppSelector(state => state.user.favorite);
  const onRemovePress = (itemToRemove: FoodObject) => {
    dispatch(removeFromFavorite(itemToRemove));
  };
  const FoodItem = ({item, index}: {item: FoodObject; index: number}) => (
    <View style={styles.itemContainer}>
      {/* image */}
      <Image
        style={styles.itemImage}
        source={{
          uri: item.image,
        }}
      />
      {/* content */}
      <View style={{flex: 1}}>
        <Text style={[FONTS.title_medium, {color: COLORS.blackText}]}>
          {item.name}
        </Text>
        <Text
          numberOfLines={1}
          style={[FONTS.body_medium, {color: COLORS.darkGray2}]}>
          {item.description}
        </Text>
        <TouchableOpacity
          onPress={() => navigation.navigate('DetailFood', {foodItem: item})}
          style={styles.btnDetail}>
          <Text
            style={{
              color: COLORS.darkGray,
              ...FONTS.label_medium,
            }}>
            Xem chi tiết
          </Text>
          <Image
            source={icons.down_arrow}
            style={{width: 18, height: 18, tintColor: COLORS.black}}
          />
        </TouchableOpacity>
      </View>
      {/* btn favourite */}
      <TouchableOpacity
        onPress={() => onRemovePress(item)}
        style={styles.btnFavorite}>
        <Image source={icons.favourite_fill} style={styles.btnFavoriteRemove} />
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <HeaderCustom title={'Yêu thích'} />
      {favoriteList.length ? (
        <FlatList
          data={favoriteList}
          keyExtractor={(item, index) => `${index}`}
          showsVerticalScrollIndicator={false}
          renderItem={({item, index}) => {
            return <FoodItem item={item} index={index} />;
          }}
        />
      ) : (
        <View style={styles.emptyText}>
          <Text
            style={{
              color: COLORS.black,
              ...FONTS.headline_small,
            }}>
            Danh sách của bạn trống
          </Text>
        </View>
      )}
    </SafeAreaView>
  );
};

export default Favourite;

const styles = StyleSheet.create({
  itemImage: {
    width: SIZES.width * 0.25,
    height: SIZES.width * 0.25,
    borderRadius: SIZES.radius,
    marginRight: SIZES.spacing,
  },

  emptyText: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnDetail: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
  },
  btnFavorite: {
    padding: SIZES.base,
    backgroundColor: COLORS.lightGray2,
    borderRadius: 100,
    marginLeft: SIZES.base,
  },
  btnFavoriteRemove: {
    width: 24,
    height: 24,
    tintColor: COLORS.primary,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: SIZES.padding,
    borderBottomWidth: 1,
    borderColor: COLORS.lightGray2,
    backgroundColor: COLORS.white,
    height: 150,
  },

  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
});
