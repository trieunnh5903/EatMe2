import {
  Image,
  StyleSheet,
  ScrollView,
  Text,
  View,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {COLORS, SIZES, FONTS, icons} from '../../config';
import {Break, ButtonIcon, ButtonText} from '../../components';
import {TextInput, TouchableOpacity} from 'react-native-gesture-handler';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import convertToVND from '../../utils/convertToVND';
import {Shadow} from 'react-native-shadow-2';
import {CheckoutScreenProp} from '../../types/navigation.type';
import {store, useAppSelector} from '../../redux/store';
import {
  getTotalFoodCount,
  getTotalFoodPriceOneInvoice,
  useSelectCartById,
} from '../../redux/hooks';
import {SafeAreaView} from 'react-native-safe-area-context';
import InformationAddress from './InformationAddress';
import ListFoodInCart from './ListFoodInCart';
import ListRecommend from './ListRecomend';
import CaculateTheBill from './CaculateTheBill';
import TipForTheDriver from './TipForTheDriver';
import {FoodRedux} from '../../types/types';

const HEADER_HEIGHT = 50;
const CheckoutScreen = ({navigation, route}: CheckoutScreenProp) => {
  const [loading, setLoading] = useState(true);
  const idRestaurant = route.params.restaurantId;
  const restaurant = useAppSelector(
    state => state.restaurant.byId[idRestaurant],
  );
  const cartList = useSelectCartById(idRestaurant);
  const totalFood = getTotalFoodCount(store.getState(), idRestaurant);
  const totalFoodPrice = getTotalFoodPriceOneInvoice(
    store.getState(),
    idRestaurant,
  );

  // event
  const onBackPress = () => navigation.goBack();
  const onChangeAddressPress = () =>
    navigation.navigate('EnterAddressScreen', {enableGoogleMap: true});
  const [selectedTip, setSelectedTip] = useState(0);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 0);
  }, []);

  const onAddMoreFoodPress = () => {
    navigation.push('DetailRestaurant', {restaurantId: idRestaurant});
  };

  const onTipPress = (tip: number) => {
    if (tip === selectedTip) {
      setSelectedTip(0);
    } else {
      setSelectedTip(tip);
    }
  };

  const onFoodItemPress = (food: FoodRedux) => {
    if (food.baseId) {
      navigation.navigate('DetailFood', {
        foodReduxId: food.id,
        foodId: food.baseId,
        restaurantId: idRestaurant,
      });
    }
  };
  // render
  const renderHeader = () => {
    return (
      <View style={styles.header}>
        <ButtonIcon
          onPress={onBackPress}
          containerStyle={styles.btnBack}
          icon={icons.arrow_back_w500}
          iconStyle={{width: 24, height: 24}}
        />
        <Text style={{color: COLORS.blackText, ...FONTS.title_medium}}>
          Trang thanh toán
        </Text>

        <View
          style={{
            marginHorizontal: SIZES.padding,
            width: 24,
          }}
        />
      </View>
    );
  };

  const totalPrice = totalFoodPrice + selectedTip + 23000;
  return (
    <SafeAreaView style={styles.container}>
      {loading ? (
        <View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
          <ActivityIndicator size="large" color={COLORS.primary} />
        </View>
      ) : (
        <>
          {/* header */}
          {renderHeader()}
          <ScrollView overScrollMode="never">
            {/* address */}
            <InformationAddress onChangeAddressPress={onChangeAddressPress} />

            {/* list food */}
            <ListFoodInCart
              cartList={cartList}
              onAddMoreFoodPress={onAddMoreFoodPress}
              onFoodItemPress={onFoodItemPress}
            />

            {/* recommmed food */}
            <ListRecommend data={restaurant.bestSeller} />

            {/* note */}
            <Break height={1} />
            <View style={{padding: SIZES.padding, flexDirection: 'row'}}>
              <Ionicons
                name="document-text-outline"
                size={32}
                color={COLORS.gray}
              />
              <TextInput
                cursorColor={COLORS.primary}
                multiline
                style={[FONTS.body_large, styles.note]}
                placeholderTextColor={COLORS.gray}
                placeholder="Bạn có gì muốn nhắn tới nhà hàng không"
              />
            </View>

            {/* use coin */}
            <Break />
            <View style={styles.useCoinWrapper}>
              <Image source={icons.coin} style={{height: 45, width: 45}} />
              <View style={{flex: 1}}>
                <Text style={[FONTS.title_medium, {color: COLORS.black}]}>
                  Dùng xu để được giảm giá nha
                </Text>
                <Text style={[FONTS.body_large, {color: COLORS.gray}]}>
                  Bạn đang có 0 xu
                </Text>
              </View>
              <TouchableOpacity>
                <Text style={[FONTS.title_medium, {color: COLORS.primary}]}>
                  Dùng xu
                </Text>
              </TouchableOpacity>
            </View>
            <Break />

            {/* Caculate The Bill */}
            <CaculateTheBill
              foodQuantity={totalFood}
              totalFoodPrice={totalFoodPrice}
            />

            {/* tip */}
            <TipForTheDriver
              onTipPress={onTipPress}
              selectedTip={selectedTip}
            />
          </ScrollView>
          {/* footer */}
          <View style={{flex: 1}} />
          <Shadow>
            <View
              style={{
                width: SIZES.width,
                padding: SIZES.padding,
              }}>
              <View>
                {/* row1 */}
                <View
                  style={{
                    width: '100%',
                    flexDirection: 'row',
                  }}>
                  <View style={{flex: 1}}>
                    <TouchableOpacity
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                      }}>
                      <Image
                        source={icons.zalo_pay}
                        style={{width: 24, height: 24}}
                      />
                      <Text
                        style={{
                          color: COLORS.blackText,
                          marginLeft: SIZES.base,
                          ...FONTS.label_large,
                        }}>
                        Vi Zalo Pay
                      </Text>
                      <Feather
                        name="chevron-up"
                        color={COLORS.black}
                        size={24}
                        style={{position: 'absolute', right: SIZES.padding}}
                      />
                    </TouchableOpacity>
                  </View>
                  <View
                    style={{width: 1, backgroundColor: COLORS.lightGray1}}
                  />
                  <ButtonText
                    containerStyle={{flex: 1}}
                    labelStyle={{color: COLORS.primary}}
                    label="THÊM COUPON"
                  />
                </View>
                {/* row 2 */}
                <View
                  style={{marginVertical: SIZES.padding, flexDirection: 'row'}}>
                  <View style={{flex: 1}}>
                    <Text style={[{color: COLORS.gray}, FONTS.label_large]}>
                      Tổng cộng
                    </Text>
                    <Text
                      style={[
                        FONTS.headline_small,
                        {color: COLORS.blackText, fontWeight: 'bold'},
                      ]}>
                      {convertToVND(totalPrice)}
                    </Text>
                  </View>

                  <ButtonText
                    containerStyle={{
                      width: '60%',
                      borderRadius: SIZES.radius,
                      backgroundColor: COLORS.primary,
                    }}
                    labelStyle={[FONTS.title_large, {color: COLORS.white}]}
                    label="Đặt hàng"
                  />
                </View>
              </View>
            </View>
          </Shadow>
        </>
      )}
    </SafeAreaView>
  );
};

export default CheckoutScreen;

const styles = StyleSheet.create({
  useCoinWrapper: {
    gap: 6,
    padding: SIZES.padding,
    justifyContent: 'space-between',
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },

  btnBack: {
    paddingHorizontal: SIZES.padding,
    height: '100%',
  },

  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    flexDirection: 'column',
  },

  header: {
    height: HEADER_HEIGHT,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderColor: COLORS.lightGray2,
    borderBottomWidth: 1,
  },

  note: {
    color: COLORS.gray,
    marginLeft: SIZES.spacing,
    flex: 1,
  },

  quantityWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SIZES.spacing,
    borderBottomWidth: 1,
    borderColor: COLORS.lightGray2,
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
});
