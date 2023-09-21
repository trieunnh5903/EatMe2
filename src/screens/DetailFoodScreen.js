import {
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState, useRef, useLayoutEffect} from 'react';
import {COLORS, SIZES, FONTS, icons} from '../config';
import {nanoid} from '@reduxjs/toolkit';
import {Shadow} from 'react-native-shadow-2';
import {FlashList} from '@shopify/flash-list';
import convertToVND from '../utils/convertToVND';
import {Break} from '../components';
const DetailFoodScreen = ({navigation, route}) => {
  const {foodItem} = route.params;
  const [data, setData] = useState(DATA);
  const [currentMenuItem, setCurrentMenuItem] = useState(data[0]?.label);
  const menuListRef = useRef(null);
  const detailMenuRef = useRef(null);

  const onMenuListPress = (label, index) => {
    detailMenuRef.current?.scrollToIndex({
      index: index,
      animated: true,
    });

    menuListRef.current?.scrollToIndex({
      index: index,
      animated: true,
    });
    // setCurrentMenuItem(label);
  };

  const onViewableItemsChanged = ({viewableItems}) => {
    if (viewableItems.length === 1) {
      const firstItem = viewableItems[0];
      if (firstItem !== null) {
        menuListRef.current?.scrollToIndex({
          index: firstItem.index,
          animated: true,
        });
        setCurrentMenuItem(firstItem.item.label);
        // setIndex(firstItem.index);
      }
    }
  };
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

  return (
    <SafeAreaView style={styles.container}>
      <Shadow style={[styles.menuList]}>
        <View style={styles.headerContainer}>
          {/* btn back */}
          <TouchableOpacity
            style={styles.buttonBackWrapper}
            onPress={() => navigation.goBack()}>
            <Image source={icons.arrow_back} style={styles.icon} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.searchContainer}>
            {/* icon */}
            <Image source={icons.search} style={styles.iconSearch} />
            <TextInput
              style={{width: '85%'}}
              placeholderTextColor={COLORS.gray}
              cursorColor={COLORS.gray}
              placeholder={`Tìm món tại ${foodItem.name}`}
            />
            {/* text input */}
          </TouchableOpacity>

          {/* btn favorite */}
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
      <FlashList
        ListHeaderComponent={<View style={{height: 500}} />}
        onViewableItemsChanged={onViewableItemsChanged}
        ref={detailMenuRef}
        data={data}
        estimatedItemSize={SIZES.width}
        onEndReachedThreshold={0.2}
        renderItem={({item}) => <FlastListItem item={item} />}
      />
    </SafeAreaView>
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
                style={{width: SIZES.width * 0.2, height: SIZES.width * 0.2}}
              />
            </View>
            {index !== lastIndex && <Break height={1} />}
          </View>
        ))}
      </View>
    </View>
  );
};
export default DetailFoodScreen;

const styles = StyleSheet.create({
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

  headerContainer: {
    width: SIZES.width,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: SIZES.radius,
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
    label: 'Không thể bỏ lở',
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
