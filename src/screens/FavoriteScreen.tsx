import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
} from 'react-native';
import React from 'react';
import {COLORS, FONTS, SIZES, icons} from '../config';
import {HeaderCustom} from '../components';
import useFavoriteController from '../view-controllers/useFavoriteController';

const Favourite = () => {
  const {
    favoriteList,
    onFoodItemPress,
    removeFromFavoriteList: onRemovePress,
  } = useFavoriteController();

  return (
    <SafeAreaView style={styles.container}>
      <HeaderCustom title={'Yêu thích'} />
      {favoriteList.length ? (
        <FlatList
          data={favoriteList}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
          renderItem={({item}) => {
            return (
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
                    onPress={() => onFoodItemPress(item)}
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
                  <Image
                    source={icons.favourite_fill}
                    style={styles.btnFavoriteRemove}
                  />
                </TouchableOpacity>
              </View>
            );
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
