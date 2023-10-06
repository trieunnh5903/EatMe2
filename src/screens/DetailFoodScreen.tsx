import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import React from 'react';
import {COLORS, FONTS, SIZES, icons} from '../config';
import {ButtonIcon, QuantityInput, RadioButtonGroup} from '../components';
import {DetailFoodNavigationProps} from '../types/navigation.type';
import convertToVND from '../utils/convertToVND';
import Animated from 'react-native-reanimated';
import useDetailFoodController from '../view-controllers/useDetailFoodController';

const HEADER_HEIGHT = 50;
const DetailFoodScreen = ({route}: DetailFoodNavigationProps) => {
  const {foodItem} = route.params;
  const {
    onAddToCartPress,
    options,
    toppingData,
    bgColorIconClose,
    onAddPress,
    quantity,
    onBackPress,
    onRemovePress,
    headerAnimatedStyle,
    totalPrice,
    topping,
    canAddToCart,
    selectedOption,
    onIncreasePress,
    onDecreasePress,
    onScroll,
    tintColorIconClose,
    quantityTopping,
    setSelectedOption,
  } = useDetailFoodController(foodItem);
  const AnimatedTouchableOpacity =
    Animated.createAnimatedComponent(TouchableOpacity);
  return (
    <SafeAreaView style={styles.container}>
      <AnimatedTouchableOpacity
        onPress={onBackPress}
        style={[styles.buttonBackWrapper, bgColorIconClose]}>
        <Animated.Image
          source={icons.close}
          style={[styles.icon, tintColorIconClose]}
        />
      </AnimatedTouchableOpacity>

      <Animated.View style={[styles.headerContainer, headerAnimatedStyle]}>
        <Text style={{color: COLORS.blackText, ...FONTS.label_large}}>
          {foodItem.name}
        </Text>
      </Animated.View>

      <View style={styles.imageFood}>
        <Image
          source={{
            uri: foodItem.image,
          }}
          style={{width: '100%', height: '100%'}}
        />
      </View>

      <FlatList
        ListHeaderComponent={
          <View style={{backgroundColor: COLORS.white, padding: SIZES.padding}}>
            <View style={styles.nameWrapper}>
              <Text style={styles.name}>{foodItem.name}</Text>
              <Text style={styles.mainPrice}>
                {convertToVND(foodItem.price)}
              </Text>
            </View>

            <Text style={[styles.description]}>
              Bao gồm: hộp, muỗng, đũa mang về
            </Text>

            <TouchableOpacity style={{flexDirection: 'row'}}>
              <Image
                source={icons.note}
                style={styles.iconNote}
                resizeMode="contain"
              />
              <Text style={styles.note}>
                Bạn có muốn nhắn gì đến cửa hàng không
              </Text>
            </TouchableOpacity>
          </View>
        }
        onScroll={event => onScroll(event)}
        contentContainerStyle={{
          paddingTop: SIZES.height * 0.3 - HEADER_HEIGHT,
        }}
        showsVerticalScrollIndicator={true}
        data={options}
        renderItem={({item}) => (
          <View style={{backgroundColor: COLORS.white}}>
            <View style={styles.titleWrapper}>
              <Text style={styles.labelText}>{item.title}</Text>
              <Text
                style={[
                  styles.subLabelText,
                  {color: COLORS.primary, marginVertical: SIZES.base},
                ]}>
                Chọn ít nhất 1 mục
              </Text>
            </View>
            <RadioButtonGroup
              selectedOption={selectedOption}
              setSelectedOption={setSelectedOption}
              data={item}
            />
          </View>
        )}
        ListFooterComponent={
          toppingData && (
            <View style={{paddingBottom: SIZES.height * 0.1}}>
              <View style={styles.toppingHeader}>
                <Text style={styles.labelText}>{toppingData.title}</Text>

                <Text
                  style={[
                    styles.subLabelText,
                    {color: COLORS.gray, marginVertical: SIZES.base},
                  ]}>
                  {'Chọn tối đa ' + toppingData.maximum}
                </Text>
              </View>

              {toppingData.data.map((item: {name: string; price: number}) => {
                const currentItem = topping?.find(
                  toppingItem => toppingItem.name === item.name,
                );
                const maximum = toppingData.maximum;
                const isMaximum = quantityTopping >= maximum;
                const textColor =
                  isMaximum && (currentItem?.quantity || 0) > 0 === false
                    ? COLORS.lightGray1
                    : COLORS.blackText;

                return (
                  <View key={item.name} style={styles.toppingBody}>
                    {currentItem?.quantity === undefined ||
                    currentItem?.quantity === 0 ? (
                      <ButtonIcon
                        disabled={isMaximum}
                        onPress={() =>
                          onIncreasePress(item.name, item.price, undefined)
                        }
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
                            tintColor: isMaximum
                              ? COLORS.lightGray1
                              : COLORS.primary,
                          },
                        ]}
                      />
                    ) : (
                      <QuantityInput
                        maximumQuantity={maximum}
                        iconLeft={icons.remove_wght700}
                        iconRight={icons.add_wght700}
                        onAddPress={() =>
                          onIncreasePress(
                            item.name,
                            item.price,
                            currentItem.quantity,
                          )
                        }
                        onRemovePress={() =>
                          onDecreasePress(item.name, currentItem.quantity)
                        }
                        labelStyle={[styles.labelQuantityInput]}
                        iconContainerStyle={styles.iconQuantityInputContainer}
                        quantity={currentItem.quantity}
                        iconStyle={styles.iconQuantityInput}
                      />
                    )}

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
          )
        }
      />
      <View style={styles.toppingFooter}>
        <QuantityInput
          minimumQuantity={1}
          maximumQuantity={15}
          iconLeft={icons.remove_wght700}
          iconRight={icons.add_wght700}
          onAddPress={onAddPress}
          onRemovePress={onRemovePress}
          labelStyle={styles.labelQuantityInput}
          iconContainerStyle={styles.iconQuantityInputContainer}
          quantity={quantity}
          iconStyle={styles.iconQuantityInput}
        />
        <TouchableOpacity
          disabled={!canAddToCart}
          onPress={() => onAddToCartPress()}
          style={[
            {
              backgroundColor: canAddToCart ? COLORS.primary : COLORS.gray3,
            },
            styles.btnAddToCartWrapper,
          ]}>
          {canAddToCart ? (
            <>
              <Text style={{color: COLORS.white, ...FONTS.title_medium}}>
                Thêm
              </Text>
              <View style={styles.dot} />
              <Text style={{color: COLORS.white, ...FONTS.title_medium}}>
                {convertToVND(totalPrice())}
              </Text>
            </>
          ) : (
            <Text style={{color: COLORS.white, ...FONTS.title_medium}}>
              Chọn thông tin
            </Text>
          )}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default DetailFoodScreen;

const styles = StyleSheet.create({
  mainText: {color: COLORS.blackText, ...FONTS.body_large},
  labelText: {color: COLORS.blackText, ...FONTS.label_large},
  subLabelText: {color: COLORS.primary, ...FONTS.body_small},
  toppingHeader: {
    padding: SIZES.padding,
    paddingBottom: 0,
    backgroundColor: COLORS.lightPrimary,
  },
  toppingTextWrapper: {
    marginLeft: SIZES.spacing,
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 1,
  },

  note: {
    color: COLORS.gray,
    ...FONTS.body_large,
    marginLeft: SIZES.base,
    marginRight: SIZES.padding,
  },
  description: {
    color: COLORS.gray,
    ...FONTS.body_medium,
    marginBottom: SIZES.padding,
  },

  btnAddToCartWrapper: {
    flex: 1,
    marginLeft: 3 * SIZES.spacing,
    height: 60,
    borderRadius: SIZES.radius,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  nameWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  dot: {
    width: 3,
    height: 3,
    borderRadius: 20,
    backgroundColor: COLORS.white,
    marginHorizontal: SIZES.base,
  },
  titleWrapper: {
    padding: SIZES.padding,
    paddingBottom: 0,
    backgroundColor: COLORS.lightPrimary,
  },
  name: {
    width: '70%',
    color: COLORS.blackText,
    ...FONTS.headline_medium,
    fontWeight: 'bold',
  },
  toppingFooter: {
    height: SIZES.height * 0.15,
    borderColor: COLORS.lightGray2,
    borderTopWidth: 1,
    justifyContent: 'center',
    flexDirection: 'row',
    paddingHorizontal: SIZES.padding,
    alignItems: 'center',
  },
  toppingBody: {
    backgroundColor: COLORS.white,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: COLORS.lightGray1,
    padding: SIZES.padding,
  },

  labelQuantityInput: {
    color: COLORS.blackText,
    ...FONTS.label_large,
    marginHorizontal: 15,
  },
  headerContainer: {
    zIndex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    height: HEADER_HEIGHT,
  },

  iconQuantityInputContainer: {
    height: 32,
    width: 32,
    backgroundColor: COLORS.lightPrimary,
    borderRadius: SIZES.base,
    paddingHorizontal: SIZES.base,
  },

  iconNote: {
    width: 24,
    height: 24,
    tintColor: COLORS.black,
  },
  iconQuantityInput: {
    width: 16,
    height: 16,
    tintColor: COLORS.primary,
  },

  buttonBackWrapper: {
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2,
    backgroundColor: COLORS.transparentBlack7,
    borderRadius: 40,
    top: 9,
    left: 10,
    position: 'absolute',
  },

  textPrice: {
    color: COLORS.primary,
    ...FONTS.title_medium,
  },

  mainPrice: {
    textAlign: 'center',
    width: '30%',
    color: COLORS.blackText,
    ...FONTS.title_large,
  },

  imageFood: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: 'red',
    height: SIZES.height * 0.3,
  },

  icon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
    tintColor: COLORS.white,
  },

  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
});
