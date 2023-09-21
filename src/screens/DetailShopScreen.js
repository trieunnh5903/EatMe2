import {
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  View,
  ImageBackground,
} from 'react-native';
import React, {useState, useRef, useCallback} from 'react';
import {COLORS, SIZES, FONTS, icons} from '../config';
import {nanoid} from '@reduxjs/toolkit';
import {Shadow} from 'react-native-shadow-2';
import convertToVND from '../utils/convertToVND';
import {Break, HeaderCustom, VerticalFoodCard} from '../components';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
const HEADERHEIGHT = 106;
const DetailShopScreen = ({navigation, route}) => {
  const {foodItem} = route.params;
  const [data, setData] = useState(DATA);
  const [highLightList, setHighLightList] = useState(highLightData);
  const [currentMenuItem, setCurrentMenuItem] = useState(data[0]?.label);
  const menuListRef = useRef(null);
  const detailMenuRef = useRef(null);
  const scrollY = useSharedValue(0);
  const viewabilityConfigCallbackPairs = useRef([{onViewableItemsChanged}]);

  const onMenuListPress = useCallback((label, index) => {
    detailMenuRef.current?.scrollToIndex({
      index: index,
      animated: true,
    });

    menuListRef.current?.scrollToIndex({
      index: index,
      animated: true,
    });
  }, []);

  const renderMenuItem = ({item, index}) => {
    const textColor =
      currentMenuItem === item.label ? COLORS.white : COLORS.blackText;

    const backgroundColor =
      currentMenuItem === item.label ? COLORS.primary : COLORS.white;
    return (
      <ButtonMenu
        backgroundColor={backgroundColor}
        label={item.label}
        onPress={() => {
          onMenuListPress(item.label, index);
        }}
        textColor={textColor}
      />
    );
  };

  console.log('onViewableItemsChanged');
  const onViewableItemsChanged = useRef(({viewableItems, changed}) => {
    const firstItem = viewableItems[0];
    if (firstItem) {
      menuListRef.current?.scrollToIndex({
        index: firstItem.index,
        animated: true,
      });
      setCurrentMenuItem(firstItem.item.label);
    }
  });

  const onListScroll = useAnimatedScrollHandler({
    onScroll: event => {
      scrollY.value = event.contentOffset.y;
    },
  });

  const headerStyle = useAnimatedStyle(() => {
    const height = interpolate(
      scrollY.value,
      [0, SIZES.height * 0.5],
      [-HEADERHEIGHT, 0],
      Extrapolate.CLAMP,
    );
    const opacity = interpolate(
      scrollY.value,
      [0, SIZES.height * 0.5],
      [0, 1],
      Extrapolate.CLAMP,
    );

    return {
      opacity,
      marginTop: height,
    };
  });

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
                style={{width: '85%'}}
                placeholderTextColor={COLORS.gray}
                cursorColor={COLORS.gray}
                placeholder={`Tìm món tại ${foodItem.name}`}
              />
            </TouchableOpacity>

            <TouchableOpacity
              // onPress={() => handleToggleFavorite()}
              style={[styles.buttonFavoriteWrapper, {alignItems: 'center'}]}>
              <Image source={icons.favourite} style={[styles.icon]} />
            </TouchableOpacity>
          </View>
          <FlatList
            ref={menuListRef}
            horizontal
            contentContainerStyle={styles.menuListContentContainer}
            showsHorizontalScrollIndicator={false}
            keyExtractor={item => item.label}
            data={data}
            renderItem={renderMenuItem}
          />
        </Shadow>
      </Animated.View>

      <Animated.FlatList
        ListHeaderComponent={
          <View>
            <RenderHeader navigation={navigation} foodItem={foodItem} />
            <RenderInformationFood foodItem={foodItem} />
            <RenderListHighLight
              highLightList={highLightList}
              navigation={navigation}
            />
          </View>
        }
        onScroll={onListScroll}
        ref={detailMenuRef}
        data={data}
        onViewableItemsChanged={onViewableItemsChanged.current}
        onEndReachedThreshold={0.2}
        renderItem={({item}) => <FlastListItem item={item} />}
      />
    </SafeAreaView>
  );
};

const RenderHeader = ({foodItem, navigation}) => {
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
            onPress={() => navigation.goBack()}>
            <Image
              source={icons.arrow_back}
              style={[styles.icon, {tintColor: COLORS.black}]}
            />
          </TouchableOpacity>
        }
        rightComponent={
          <TouchableOpacity
            // onPress={() => handleToggleFavorite()}
            style={[styles.buttonNavWrapper, {alignItems: 'center'}]}>
            <Image
              source={icons.favourite}
              style={[styles.icon, {tintColor: COLORS.black}]}
            />
          </TouchableOpacity>
        }
      />
    </ImageBackground>
  );
};

const RenderInformationFood = ({foodItem}) => {
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

const RenderListHighLight = ({highLightList, navigation}) => {
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
      ItemSeparatorComponent={<View style={{height: 2 * SIZES.spacing}} />}
      data={highLightList}
      keyExtractor={item => item.id}
      renderItem={({item}) => {
        return (
          <VerticalFoodCard
            onPress={() => {
              navigation.navigate('DetailFood', {
                foodItem: {...item, priceTotal: 0, quantity: 0},
              });
            }}
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

const ButtonMenu = ({onPress, backgroundColor, textColor, label}) => (
  <TouchableOpacity
    onPress={onPress}
    style={[styles.menuItem, {backgroundColor: backgroundColor}]}>
    <Text style={[{color: textColor}, FONTS.label_large]}>{label}</Text>
  </TouchableOpacity>
);

const FlastListItem = ({item: categoryItem}) => {
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
          <View key={item.id} style={{width: '100%'}}>
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
          </View>
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

const highLightData = [
  {
    id: nanoid(),
    name: 'Zangzang Food - Gà Tươi Ủ Muối Cầu Kỳ',
    price: 20000,
    description: '226 Lê Đức Thọ, P. 6, Gò Vấp, TP. HCM',
    image:
      'https://images.foody.vn/res/g117/1163373/prof/s460x300/foody-upload-api-foody-mobile-fi-365302c3-230320112903.jpeg',
    categoryId: 'LEMG',
    supplierID: 'SBPJ',
  },
  {
    id: nanoid(),
    name: 'Mì Trộn Park Kim Thang - Phạm Văn Đồng',
    price: 20000,
    description: '259 Phạm Văn Đồng, P.1, Gò Vấp, TP. HCM',
    image:
      'https://images.foody.vn/res/g108/1076096/prof/s460x300/foody-upload-api-foody-mobile-36-e6f8587b-230729083030.jpeg',
    supplierID: 'ZYSQ',
  },
  {
    id: nanoid(),
    name: 'Bún Thịt Nướng Dì 7 & Cơm Tấm, Lẩu - Khu Phố 2A',
    price: 20000,
    description:
      '1779/21/6 Khu Phố 2A, Quốc Lộ 1A, P. Tân Thới Hiệp, Quận 12, TP. HCM',
    image:
      'https://images.foody.vn/res/g105/1043305/prof/s480x300/foody-upload-api-foody-mobile-89039049_10754428753-200820145636.jpg',
    categoryId: 'MGQZ',
  },
  {
    id: nanoid(),
    name: 'Thành Đạt - Hủ Tiếu Nam Vang - 22C Nguyễn Hữu Cầu',
    price: 20000,
    description: 'Thành Đạt - Hủ Tiếu Nam Vang - 22C Nguyễn Hữu Cầu',
    image:
      'https://images.foody.vn/res/g112/1114707/prof/s460x300/foody-upload-api-foody-mobile-un-de857048-211105141117.jpeg',
    categoryId: 'AGGR',
    supplierID: 'MMCP',
  },
];

const DATA = [
  {
    label: 'Khuyến mãi',
    data: [
      {
        name: 'Bún bò - chả',
        id: nanoid(),
        description: 'Bao gồm: hộp, muỗng, đũa mang về',
        price: 31000,
        image:
          'https://images.foody.vn/res/g2/11349/prof/s408x200/image-3111762a-200910114155.jpeg',
      },
      {
        name: 'Bún bò - chả',
        id: nanoid(),
        description: 'Bao gồm: hộp, muỗng, đũa mang về',
        price: 31000,
        image:
          'https://images.foody.vn/res/g2/11349/prof/s408x200/image-3111762a-200910114155.jpeg',
      },
      {
        name: 'Bún bò - chả',
        id: nanoid(),
        description: 'Bao gồm: hộp, muỗng, đũa mang về',
        price: 31000,
        image:
          'https://images.foody.vn/res/g2/11349/prof/s408x200/image-3111762a-200910114155.jpeg',
      },
      {
        name: 'Bún bò - chả',
        id: nanoid(),
        description: 'Bao gồm: hộp, muỗng, đũa mang về',
        price: 31000,
        image:
          'https://images.foody.vn/res/g2/11349/prof/s408x200/image-3111762a-200910114155.jpeg',
      },
      {
        name: 'Bún bò - chả',
        id: nanoid(),
        description: 'Bao gồm: hộp, muỗng, đũa mang về',
        price: 31000,
        image:
          'https://images.foody.vn/res/g2/11349/prof/s408x200/image-3111762a-200910114155.jpeg',
      },
    ],
  },
  {
    label: 'Thực đơn',
    data: [
      {
        name: 'Bún bò - chả',
        id: nanoid(),
        description: 'Bao gồm: hộp, muỗng, đũa mang về',
        price: 31000,
        image:
          'https://images.foody.vn/res/g2/11349/prof/s408x200/image-3111762a-200910114155.jpeg',
      },
      {
        name: 'Bún bò - chả',
        id: nanoid(),
        description: 'Bao gồm: hộp, muỗng, đũa mang về',
        price: 31000,
        image:
          'https://images.foody.vn/res/g2/11349/prof/s408x200/image-3111762a-200910114155.jpeg',
      },
      {
        name: 'Bún bò - chả',
        id: nanoid(),
        description: 'Bao gồm: hộp, muỗng, đũa mang về',
        price: 31000,
        image:
          'https://images.foody.vn/res/g2/11349/prof/s408x200/image-3111762a-200910114155.jpeg',
      },
      {
        name: 'Bún bò - chả',
        id: nanoid(),
        description: 'Bao gồm: hộp, muỗng, đũa mang về',
        price: 31000,
        image:
          'https://images.foody.vn/res/g2/11349/prof/s408x200/image-3111762a-200910114155.jpeg',
      },
      {
        name: 'Bún bò - chả',
        id: nanoid(),
        description: 'Bao gồm: hộp, muỗng, đũa mang về',
        price: 31000,
        image:
          'https://images.foody.vn/res/g2/11349/prof/s408x200/image-3111762a-200910114155.jpeg',
      },
    ],
  },
  {
    label: 'Chọn thêm',
    data: [
      {
        name: 'Bún bò - chả',
        id: nanoid(),
        description: 'Bao gồm: hộp, muỗng, đũa mang về',
        price: 31000,
        image:
          'https://images.foody.vn/res/g2/11349/prof/s408x200/image-3111762a-200910114155.jpeg',
      },
      {
        name: 'Bún bò - chả',
        id: nanoid(),
        description: 'Bao gồm: hộp, muỗng, đũa mang về',
        price: 31000,
        image:
          'https://images.foody.vn/res/g2/11349/prof/s408x200/image-3111762a-200910114155.jpeg',
      },
      {
        name: 'Bún bò - chả',
        id: nanoid(),
        description: 'Bao gồm: hộp, muỗng, đũa mang về',
        price: 31000,
        image:
          'https://images.foody.vn/res/g2/11349/prof/s408x200/image-3111762a-200910114155.jpeg',
      },
      {
        name: 'Bún bò - chả',
        id: nanoid(),
        description: 'Bao gồm: hộp, muỗng, đũa mang về',
        price: 31000,
        image:
          'https://images.foody.vn/res/g2/11349/prof/s408x200/image-3111762a-200910114155.jpeg',
      },
      {
        name: 'Bún bò - chả',
        id: nanoid(),
        description: 'Bao gồm: hộp, muỗng, đũa mang về',
        price: 31000,
        image:
          'https://images.foody.vn/res/g2/11349/prof/s408x200/image-3111762a-200910114155.jpeg',
      },
    ],
  },
  {
    label: 'Đồ uống',
    data: [
      {
        name: 'Bún bò - chả',
        id: nanoid(),
        description: 'Bao gồm: hộp, muỗng, đũa mang về',
        price: 31000,
        image:
          'https://images.foody.vn/res/g2/11349/prof/s408x200/image-3111762a-200910114155.jpeg',
      },
      {
        name: 'Bún bò - chả',
        id: nanoid(),
        description: 'Bao gồm: hộp, muỗng, đũa mang về',
        price: 31000,
        image:
          'https://images.foody.vn/res/g2/11349/prof/s408x200/image-3111762a-200910114155.jpeg',
      },
      {
        name: 'Bún bò - chả',
        id: nanoid(),
        description: 'Bao gồm: hộp, muỗng, đũa mang về',
        price: 31000,
        image:
          'https://images.foody.vn/res/g2/11349/prof/s408x200/image-3111762a-200910114155.jpeg',
      },
      {
        name: 'Bún bò - chả',
        id: nanoid(),
        description: 'Bao gồm: hộp, muỗng, đũa mang về',
        price: 31000,
        image:
          'https://images.foody.vn/res/g2/11349/prof/s408x200/image-3111762a-200910114155.jpeg',
      },
      {
        name: 'Bún bò - chả',
        id: nanoid(),
        description: 'Bao gồm: hộp, muỗng, đũa mang về',
        price: 31000,
        image:
          'https://images.foody.vn/res/g2/11349/prof/s408x200/image-3111762a-200910114155.jpeg',
      },
    ],
  },
];
