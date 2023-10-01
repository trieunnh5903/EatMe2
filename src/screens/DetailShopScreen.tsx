import {
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ImageBackground,
  GestureResponderEvent,
  ColorValue,
} from 'react-native';
import React from 'react';
import {COLORS, SIZES, FONTS, icons} from '../config';
import {Shadow} from 'react-native-shadow-2';
import convertToVND from '../utils/convertToVND';
import {Break, HeaderCustom, VerticalFoodCard} from '../components';
import Animated from 'react-native-reanimated';
import {FoodObject} from '../types/types';
import {DetailShopNavigationProps} from '../types/navigation.type';
import useDetailShopController from '../view-controllers/useDetailShopController';

interface HeaderProp {
  foodItem: FoodObject;
  handleToggleFavorite: () => void;
  isFavorite: boolean;
  onBackPress: (event: GestureResponderEvent) => void;
}
interface ButtonMenuProp {
  onPress: (event: GestureResponderEvent) => void;
  backgroundColor: ColorValue;
  textColor: ColorValue;
  label: string;
}
interface ShopItem {
  label: string;
  data: {
    name: string;
    id: string;
    description: string;
    price: number;
    image: string;
  }[];
}
const HEADERHEIGHT = 110;
const DetailShopScreen = ({navigation, route}: DetailShopNavigationProps) => {
  const {foodItem} = route.params;
  const {
    onFoodItemPress,
    headerStyle,
    onBackPress,
    menuListRef,
    allFood,
    detailMenuRef,
    onListScroll,
    onViewableItemsChanged,
    onMenuListPress,
    hightLightFood,
    currentMenuItem,
    isFavorite,
    handleToggleFavorite,
  } = useDetailShopController(foodItem);

  return (
    <SafeAreaView style={styles.container}>
      <Animated.View style={[styles.headerWrapper, headerStyle]}>
        <Shadow>
          <View style={styles.headerContainer}>
            <TouchableOpacity
              style={styles.buttonBackWrapper}
              onPress={() => navigation.goBack()}>
              <Image source={icons.arrow_back} style={styles.icon} />
            </TouchableOpacity>

            <TouchableOpacity style={styles.searchContainer}>
              <Image source={icons.search} style={styles.iconSearch} />
              <TextInput
                style={{width: '85%', color: COLORS.blackText}}
                placeholderTextColor={COLORS.gray}
                cursorColor={COLORS.gray}
                placeholder={`Tìm món tại ${foodItem.name}`}
              />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => handleToggleFavorite()}
              style={[styles.buttonFavoriteWrapper, {alignItems: 'center'}]}>
              <Image
                source={isFavorite ? icons.favourite_fill : icons.favourite}
                style={[
                  styles.icon,
                  {tintColor: isFavorite ? COLORS.primary : COLORS.black},
                ]}
              />
            </TouchableOpacity>
          </View>
          <FlatList
            ref={menuListRef}
            horizontal
            contentContainerStyle={styles.menuListContentContainer}
            showsHorizontalScrollIndicator={false}
            keyExtractor={item => item.label}
            data={allFood}
            renderItem={({item, index}) => {
              const textColor =
                currentMenuItem === item.label
                  ? COLORS.white
                  : COLORS.blackText;

              const backgroundColor =
                currentMenuItem === item.label ? COLORS.primary : COLORS.white;
              return (
                <ButtonMenu
                  backgroundColor={backgroundColor}
                  label={item.label}
                  onPress={() => {
                    onMenuListPress(index);
                  }}
                  textColor={textColor}
                />
              );
            }}
          />
        </Shadow>
      </Animated.View>

      <Animated.FlatList
        ListHeaderComponent={
          <View>
            <RenderHeader
              foodItem={foodItem}
              handleToggleFavorite={() => handleToggleFavorite()}
              isFavorite={isFavorite}
              onBackPress={onBackPress}
            />
            <RenderInformationFood foodItem={foodItem} />
            <RenderListHighLight
              highLightList={hightLightFood}
              onFoodItemPress={onFoodItemPress}
            />
          </View>
        }
        onScroll={onListScroll}
        ref={detailMenuRef}
        data={allFood}
        viewabilityConfig={{
          minimumViewTime: 100,
          itemVisiblePercentThreshold: 50,
        }}
        onViewableItemsChanged={onViewableItemsChanged.current}
        onEndReachedThreshold={0.2}
        renderItem={({item}) => (
          <FlastListItem item={item} onFoodItemPress={onFoodItemPress} />
        )}
      />
    </SafeAreaView>
  );
};

const RenderHeader: React.FC<HeaderProp> = ({
  foodItem,
  handleToggleFavorite,
  isFavorite,
  onBackPress,
}) => {
  return (
    <ImageBackground
      style={{height: SIZES.height * 0.3}}
      source={{uri: foodItem.image}}>
      <HeaderCustom
        containerStyle={{
          marginVertical: SIZES.spacing,
          paddingHorizontal: SIZES.padding,
        }}
        leftComponent={
          <TouchableOpacity
            style={styles.buttonNavWrapper}
            onPress={onBackPress}>
            <Image
              source={icons.arrow_back}
              style={[styles.icon, {tintColor: COLORS.black}]}
            />
          </TouchableOpacity>
        }
        rightComponent={
          <TouchableOpacity
            onPress={() => handleToggleFavorite()}
            style={[styles.buttonNavWrapper, {alignItems: 'center'}]}>
            <Image
              source={isFavorite ? icons.favourite_fill : icons.favourite}
              style={[
                styles.icon,
                {tintColor: isFavorite ? COLORS.primary : COLORS.black},
              ]}
            />
          </TouchableOpacity>
        }
      />
    </ImageBackground>
  );
};

const RenderInformationFood = ({foodItem}: {foodItem: FoodObject}) => {
  return (
    <View style={{margin: 2 * SIZES.spacing}}>
      {/* thông tin chính */}
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Image
          source={icons.verified}
          style={{width: 24, height: 24}}
          resizeMode="contain"
        />
        <Text
          style={[
            {color: COLORS.blackText, marginLeft: SIZES.base},
            FONTS.label_large,
          ]}>
          Đã xác thực
        </Text>
      </View>
      <Text style={[FONTS.title_large, styles.foodName]}>{foodItem.name}</Text>
      <Text style={{color: COLORS.blackText, ...FONTS.body_large}}>
        0.3km - {foodItem.description}
      </Text>
      {/* thông tin phụ */}
      <View style={styles.subInfo}>
        <View>
          <Text style={{color: COLORS.blackText, ...FONTS.title_medium}}>
            Giao hàng tiêu chuẩn
          </Text>
          <Text style={{color: COLORS.blackText, ...FONTS.body_large}}>
            Dự kiến giao hàng lúc 18:30
          </Text>
        </View>
        <TouchableOpacity>
          <Text style={{color: COLORS.primary, ...FONTS.label_large}}>
            Thay đổi
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.voucher}>
        <Text style={{color: COLORS.blackText, ...FONTS.body_medium}}>
          Nhập "BANMOI" giảm 40k trên giá món
        </Text>
        <TouchableOpacity>
          <Text style={{color: COLORS.primary, ...FONTS.label_large}}>
            Thay đổi
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const RenderListHighLight = ({
  highLightList,
  onFoodItemPress,
}: {
  highLightList: FoodObject[];
  onFoodItemPress: (item: FoodObject) => void;
}) => {
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
      ItemSeparatorComponent={() => (
        <View style={{height: 2 * SIZES.spacing}} />
      )}
      data={highLightList}
      keyExtractor={item => item.id}
      renderItem={({item}) => {
        return (
          <VerticalFoodCard
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

const ButtonMenu: React.FC<ButtonMenuProp> = ({
  onPress,
  backgroundColor,
  textColor,
  label,
}) => (
  <TouchableOpacity
    onPress={onPress}
    style={[styles.menuItem, {backgroundColor: backgroundColor}]}>
    <Text style={[{color: textColor}, FONTS.label_large]}>{label}</Text>
  </TouchableOpacity>
);

const FlastListItem = ({
  item: categoryItem,
  onFoodItemPress,
}: {
  item: ShopItem;
  onFoodItemPress: (item: FoodObject) => void;
}) => {
  const lastIndex = categoryItem.data.length - 1;
  return (
    <View
      style={{
        width: SIZES.width,
        paddingVertical: SIZES.spacing,
      }}>
      <Text style={styles.categoryWrapper}>{categoryItem.label}</Text>
      <View>
        {categoryItem.data.map((item, index) => (
          <TouchableOpacity
            onPress={() => {
              onFoodItemPress(item);
            }}
            key={item.id}
            style={{width: '100%'}}>
            <View style={styles.foodItemWrapper}>
              <View style={{flex: 1, justifyContent: 'space-between'}}>
                <Text style={[{color: COLORS.blackText}, FONTS.title_medium]}>
                  {item.name}
                </Text>
                <Text style={[{color: COLORS.gray}]}>{item.description}</Text>
                <Text>{convertToVND(item.price)}</Text>
              </View>
              <Image
                source={{uri: item.image}}
                style={{
                  width: SIZES.width * 0.2,
                  height: SIZES.width * 0.2,
                  borderRadius: SIZES.radius,
                }}
              />
            </View>
            {index !== lastIndex && <Break height={1} />}
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};
export default DetailShopScreen;

const styles = StyleSheet.create({
  subInfo: {
    marginTop: SIZES.padding,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerWrapper: {
    backgroundColor: COLORS.white,
    height: HEADERHEIGHT,
  },
  voucher: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: SIZES.spacing,
  },

  buttonNavWrapper: {
    borderRadius: 100,
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: SIZES.radius,
    backgroundColor: COLORS.lightGray2,
  },
  menuListContentContainer: {
    paddingLeft: SIZES.spacing,
    alignItems: 'flex-start',
    gap: 10,
    marginVertical: SIZES.radius,
  },
  menuItem: {
    borderRadius: 20,
    padding: 8,
  },
  menuList: {
    width: SIZES.width,
  },
  foodItemWrapper: {flexDirection: 'row', padding: SIZES.padding},
  categoryWrapper: {
    color: COLORS.blackText,
    padding: SIZES.padding,
    ...FONTS.title_large,
    fontWeight: 'bold',
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 10,
    backgroundColor: COLORS.white,
  },

  iconHeaderWrapper: {
    backgroundColor: COLORS.transparentBlack7,
    width: 40,
    height: 40,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },

  foodName: {
    fontSize: 28,
    color: COLORS.blackText,
    fontWeight: 'bold',
    marginTop: SIZES.base,
  },
  headerContainer: {
    width: SIZES.width,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: SIZES.radius,
    backgroundColor: COLORS.white,
  },

  buttonBackWrapper: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
  },

  textPrice: {
    color: COLORS.primary,
    ...FONTS.title_medium,
  },

  buttonFavoriteWrapper: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
  },
  deliveryWrapper: {
    flexDirection: 'row',
    marginTop: SIZES.base,
  },

  quantityIconContainer: {
    backgroundColor: COLORS.primary,
    borderRadius: 100,
    marginHorizontal: SIZES.radius,
  },

  imageFoodWrapper: {justifyContent: 'center', alignItems: 'center'},

  labelFooter: {
    color: COLORS.white,
    ...FONTS.title_medium,
    fontWeight: 'bold',
  },

  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    height: 46,
    backgroundColor: COLORS.lightGray2,
    paddingHorizontal: 12,
    borderRadius: SIZES.padding,
    alignItems: 'center',
  },

  foodTitle: {
    marginTop: 4 * SIZES.spacing,
  },

  quantityIcon: {
    width: 36,
    height: 36,
    tintColor: COLORS.white,
  },

  quantityContainer: {
    backgroundColor: COLORS.primary,
    borderRadius: 2 * SIZES.radius,
    height: 50,
    alignSelf: 'center',
    position: 'absolute',
    top: -25,
  },

  quantityLabel: {
    color: COLORS.white,
    marginHorizontal: 5,
    ...FONTS.title_large,
    fontWeight: 'bold',
  },

  readLess: {
    color: COLORS.primary,
    ...FONTS.body_large,
    fontWeight: 'bold',
  },

  readMore: {
    color: COLORS.primary,
    ...FONTS.body_large,
    fontWeight: 'bold',
  },

  infoFoodWrapper: {
    flex: 1,
    paddingHorizontal: SIZES.padding,
    backgroundColor: COLORS.white,
  },

  buttonFooter: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    marginTop: SIZES.radius,
    marginBottom: SIZES.radius,
    marginHorizontal: SIZES.padding,
    height: 50,
    borderRadius: SIZES.radius,
    backgroundColor: COLORS.primary,
  },

  textTitle: {
    color: COLORS.blackText,
    ...FONTS.headline_medium,
    fontWeight: 'bold',
  },
  textAddress: {
    color: COLORS.blackText,
    ...FONTS.body_medium,
    marginBottom: SIZES.spacing,
  },

  imageFood: {
    height: 100,
    width: SIZES.width * 1.3,
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingHorizontal: SIZES.width * 0.17,
    paddingTop: SIZES.spacing,
  },

  icon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
    tintColor: COLORS.primary,
  },

  iconSearch: {
    width: 24,
    height: 24,
    marginRight: SIZES.spacing,
    resizeMode: 'contain',
    tintColor: COLORS.gray2,
  },

  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
});
