/* eslint-disable react-native/no-inline-styles */
import {
  Image,
  StyleSheet,
  ScrollView,
  Text,
  View,
  ActivityIndicator,
  Pressable,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {COLORS, SIZES, FONTS, icons} from '../config';
import {Break, ButtonIcon, ButtonText} from '../components';
import {TextInput, TouchableOpacity} from 'react-native-gesture-handler';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import convertToVND from '../utils/convertToVND';
import {Shadow} from 'react-native-shadow-2';
import {Chip} from 'react-native-paper';
import {CheckoutScreenProp} from '../types/navigation.type';
import {useAppSelector} from '../redux/store';
import {FlashList} from '@shopify/flash-list';
import {useSelectCartById} from '../redux/hooks';
import {SafeAreaView} from 'react-native-safe-area-context';

const HEADER_HEIGHT = 50;
const CheckoutScreen = ({navigation, route}: CheckoutScreenProp) => {
  const [loading, setLoading] = useState(true);
  const idRestaurant = route.params.restaurantId;
  const restaurant = useAppSelector(
    state => state.restaurant.byId[idRestaurant],
  );
  const cartList = useSelectCartById(idRestaurant);
  console.log(cartList);
  const onBackPress = () => navigation.goBack();
  const onChangeAddressPress = () =>
    navigation.navigate('EnterAddressScreen', {enableGoogleMap: true});
  const triangleWidth = 10; // Độ rộng tam giác
  const trianglesCount = Math.floor(SIZES.width / triangleWidth);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false); // Khi hoàn thành, ẩn Activity Indicator
    }, 0);
  }, []);

  const onAddFoodPress = () => {
    // navigation.navigate('DetailRestaurant', {restaurant});
  };

  const onFoodPress = (_food: any) => {
    // navigation.navigate('DetailFood', {foodItem: food});
  };
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: COLORS.white,
        flexDirection: 'column',
      }}>
      {loading ? (
        <View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
          <ActivityIndicator size="large" color={COLORS.primary} />
        </View>
      ) : (
        <>
          {/* header */}
          <View
            style={{
              height: HEADER_HEIGHT,
              alignItems: 'center',
              flexDirection: 'row',
              justifyContent: 'space-between',
              borderColor: COLORS.lightGray2,
              borderBottomWidth: 1,
            }}>
            <ButtonIcon
              onPress={onBackPress}
              containerStyle={{
                paddingHorizontal: SIZES.padding,
                height: '100%',
              }}
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
          {/* end header */}
          {/* address */}
          <ScrollView>
            <View
              style={{
                flexDirection: 'row',
                padding: SIZES.padding,
              }}>
              <Image
                source={{
                  uri: 'https://play-lh.googleusercontent.com/8uMTbCdy6B93EGM5p6tfOVWnkDpee5ZOVYfaBgsWciG77nxZEpjltRtaOTxsI52x8Q=s256-rw',
                }}
                style={{width: 60, height: 60, borderRadius: SIZES.radius}}
              />
              <View style={{flex: 1, marginLeft: SIZES.padding}}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <Text style={[FONTS.body_large, {color: COLORS.blackText}]}>
                    Giao bởi tài xế
                  </Text>
                </View>

                <TouchableOpacity
                  onPress={onChangeAddressPress}
                  style={{flexDirection: 'row', marginTop: SIZES.spacing}}>
                  <View style={{flex: 1}}>
                    <Text
                      style={[
                        FONTS.headline_small,
                        {color: COLORS.blackText, fontWeight: 'bold'},
                      ]}>
                      Nhà
                    </Text>
                    <Text
                      style={[FONTS.body_large, {color: COLORS.gray}]}
                      numberOfLines={1}>
                      214/66 Nguyễn Onah, Phường 17, Gò Vấp, Hồ Chí Minh
                    </Text>
                  </View>
                  <Feather
                    name="chevron-right"
                    size={32}
                    color={COLORS.black}
                  />
                </TouchableOpacity>
                <TouchableOpacity>
                  <Text
                    style={[
                      FONTS.body_large,
                      {color: COLORS.gray, marginTop: SIZES.spacing},
                    ]}>
                    + Thêm vào tòa nhà, tầng, số phòng
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            <View
              style={{
                padding: SIZES.padding,
                backgroundColor: COLORS.primary2(0.1),
              }}>
              <Text style={[FONTS.title_medium, {color: COLORS.blackText}]}>
                <Feather name="map-pin" size={16} color={COLORS.black} /> Bạn có
                chắc địa chỉ giao hàng chính xác ?
              </Text>
              <Text style={[FONTS.body_large, {color: COLORS.blackText}]}>
                Địa chỉ giao hàng có vẻ xa với vị trí hiện tại của bạn.
              </Text>
            </View>
            {/* end address */}

            {/* cart */}
            <View style={{padding: SIZES.padding}}>
              <Text style={[FONTS.label_large, {color: COLORS.gray}]}>
                Đơn hàng của bạn
              </Text>
              <View>
                {cartList.map(food => {
                  return (
                    <TouchableOpacity
                      onPress={() => onFoodPress(food)}
                      key={food.id}
                      style={styles.itemContainer}>
                      {/* content */}
                      <View style={{flex: 1, flexDirection: 'row'}}>
                        <View
                          style={{
                            height: '100%',
                            paddingVertical: 4,
                            paddingRight: SIZES.base,
                          }}>
                          <Text
                            style={[FONTS.label_large, {color: COLORS.gray}]}>
                            {food.quantity}x
                          </Text>
                        </View>
                        <View style={{flex: 1, marginRight: SIZES.base}}>
                          <Text style={styles.itemName}>{food.name}</Text>
                          <Text
                            style={{
                              color: COLORS.darkGray,
                              ...FONTS.body_medium,
                            }}>
                            {food.options?.map((item, index) => {
                              const lastIndex = food.options?.length;
                              if (lastIndex) {
                                if (index === lastIndex - 1) {
                                  return item.option;
                                }
                              }
                              return item.option + ', ';
                            })}
                            {food.toppings && food.toppings.length > 0 && ', '}
                            {food.toppings?.map((item, index) => {
                              const lastIndex = food.toppings?.length;
                              if (lastIndex) {
                                if (index === lastIndex - 1) {
                                  return item.name;
                                }
                              }
                              return item.name + ', ';
                            })}
                          </Text>
                        </View>
                        <View style={styles.quantityWrapper}>
                          <Text style={styles.totalPrice}>
                            {convertToVND(food.price * food.quantity)}
                          </Text>
                          <TouchableOpacity style={{marginLeft: SIZES.base}}>
                            <Ionicons
                              name="close-circle-sharp"
                              color={COLORS.gray3}
                              size={24}
                            />
                          </TouchableOpacity>
                        </View>
                      </View>
                    </TouchableOpacity>
                  );
                })}
              </View>

              <View
                style={{
                  paddingHorizontal: SIZES.padding,
                  marginTop: SIZES.padding,
                }}>
                <TouchableOpacity onPress={onAddFoodPress}>
                  <Text style={[FONTS.label_large, {color: COLORS.primary}]}>
                    + Thêm món
                  </Text>
                </TouchableOpacity>
                <View style={styles.rectangle}>
                  <View style={styles.triangle} />
                  <Text style={[FONTS.title_medium, {color: COLORS.primary}]}>
                    Tiết kiệm 3.0000đ với đơn giá từ 15.000đ
                  </Text>
                </View>
              </View>
            </View>

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
                data={restaurant.bestSeller}
                renderItem={({item}) => {
                  return (
                    <Pressable
                      style={{
                        elevation: 1,
                        borderRadius: SIZES.radius,
                        width: SIZES.width * 0.7,
                        marginRight: 20,
                        flexDirection: 'row',
                      }}>
                      <Image
                        source={{uri: item.image}}
                        style={{
                          borderTopLeftRadius: SIZES.radius,
                          borderBottomLeftRadius: SIZES.radius,
                          height: SIZES.width * 0.3,
                          width: SIZES.width * 0.25,
                        }}
                      />
                      <View
                        style={{
                          height: '100%',
                          flex: 1,
                          padding: SIZES.spacing,
                        }}>
                        <Text
                          style={[
                            FONTS.label_large,
                            {color: COLORS.blackText},
                          ]}>
                          {item.name}
                        </Text>
                        <View
                          style={{
                            flex: 1,
                            alignItems: 'flex-end',
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                          }}>
                          <Text
                            style={[
                              FONTS.label_large,
                              {color: COLORS.blackText},
                            ]}>
                            {convertToVND(item.price)}
                          </Text>
                          <TouchableOpacity
                            style={{
                              width: 32,
                              height: 32,
                              borderRadius: 32,
                              backgroundColor: COLORS.primary,
                              justifyContent: 'center',
                              alignItems: 'center',
                            }}>
                            <Image
                              source={icons.add_wght700}
                              style={{width: 20, height: 20}}
                              tintColor={COLORS.white}
                            />
                          </TouchableOpacity>
                        </View>
                      </View>
                    </Pressable>
                  );
                }}
              />
            </View>

            <Break height={1} />
            <View style={{padding: SIZES.padding, flexDirection: 'row'}}>
              <Ionicons name="document-text-outline" size={32} />
              <TextInput
                cursorColor={COLORS.primary}
                multiline
                style={[
                  FONTS.body_large,
                  {
                    color: COLORS.gray,
                    marginLeft: SIZES.spacing,
                    flex: 1,
                  },
                ]}
                placeholder="Bạn có gì muốn nhắn tới nhà hàng không"
              />
            </View>

            <Break />
            <View
              style={{
                padding: SIZES.padding,
                justifyContent: 'space-between',
                flex: 1,
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Image source={icons.coin} style={{height: 45, width: 45}} />
              <View>
                <Text style={[FONTS.title_medium, {color: COLORS.black}]}>
                  Dùng xu để được giảm giá nha
                </Text>
                <Text style={[FONTS.body_large, {color: COLORS.gray}]}>
                  Bạn đang có 0 xu
                </Text>
              </View>
              <TouchableOpacity
                style={{
                  alignSelf: 'flex-end',
                  justifyContent: 'center',
                  height: '100%',
                  padding: SIZES.spacing,
                }}>
                <Text style={[FONTS.title_medium, {color: COLORS.primary}]}>
                  Dùng xu
                </Text>
              </TouchableOpacity>
            </View>
            {/* end cart */}
            <Break />

            {/* total price */}
            <View style={{padding: SIZES.padding}}>
              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text style={[FONTS.body_large, {color: COLORS.blackText}]}>
                  Tạm tính (1 món)
                </Text>
                <Text style={[FONTS.body_large, {color: COLORS.blackText}]}>
                  {convertToVND(30000)}
                </Text>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  marginTop: SIZES.base,
                  justifyContent: 'space-between',
                }}>
                <Text style={[FONTS.body_large, {color: COLORS.blackText}]}>
                  Phí áp dung: <Text style={[FONTS.title_medium]}>0.5km</Text>
                </Text>
                <Text style={[FONTS.body_large, {color: COLORS.blackText}]}>
                  {convertToVND(23000)}
                </Text>
              </View>
            </View>

            {/* voucher */}
            <View style={{flexDirection: 'row'}}>
              {Array.from({length: trianglesCount}, (_, index) => (
                <View key={index} style={styles.sawtooth} />
              ))}
            </View>

            <ScrollView
              showsHorizontalScrollIndicator={false}
              snapToInterval={SIZES.width * 0.9}
              horizontal
              contentContainerStyle={{
                padding: SIZES.padding,
                gap: SIZES.padding,
                flexDirection: 'row',
                alignItems: 'center',
                backgroundColor: COLORS.lightGray2,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  height: '100%',
                }}>
                <View
                  style={{
                    height: '100%',
                    width: SIZES.width * 0.6,
                    padding: SIZES.spacing,
                    backgroundColor: COLORS.lightGray1,
                    borderRadius: SIZES.radius,
                    borderLeftColor: COLORS.gray2,
                    justifyContent: 'center',
                    borderLeftWidth: SIZES.spacing,
                    borderTopRightRadius: SIZES.padding,
                    borderBottomRightRadius: SIZES.padding,
                  }}>
                  <Text style={[FONTS.title_medium, {color: COLORS.gray}]}>
                    SAIGONA6
                  </Text>
                  <Text
                    style={[
                      FONTS.title_large,
                      {color: COLORS.gray, fontWeight: 'bold'},
                    ]}>
                    Khao 10K đơn từ 120K
                  </Text>
                  <Text style={[FONTS.title_medium, {color: COLORS.gray}]}>
                    HSD: 31.10.2023
                  </Text>
                </View>
                <View
                  style={{
                    width: SIZES.width * 0.25,
                    height: '100%',
                    backgroundColor: COLORS.lightGray1,
                    borderRadius: SIZES.radius,
                    borderTopLeftRadius: SIZES.padding,
                    borderBottomLeftRadius: SIZES.padding,
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderLeftWidth: 1,
                    borderColor: COLORS.gray2,
                    borderStyle: 'dashed',
                  }}>
                  <TouchableOpacity>
                    <Text
                      style={[
                        FONTS.title_large,
                        {
                          color: COLORS.gray,
                          fontWeight: 'bold',
                        },
                      ]}>
                      Chọn
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  height: '100%',
                }}>
                <View
                  style={{
                    height: '100%',
                    width: SIZES.width * 0.6,
                    padding: SIZES.spacing,
                    backgroundColor: COLORS.lightGray1,
                    borderRadius: SIZES.radius,
                    borderLeftColor: COLORS.gray2,
                    justifyContent: 'center',
                    borderLeftWidth: SIZES.spacing,
                    borderTopRightRadius: SIZES.padding,
                    borderBottomRightRadius: SIZES.padding,
                  }}>
                  <Text style={[FONTS.title_medium, {color: COLORS.gray}]}>
                    SAIGONA6
                  </Text>
                  <Text
                    style={[
                      FONTS.title_large,
                      {color: COLORS.gray, fontWeight: 'bold'},
                    ]}>
                    Khao 10K đơn từ 120K
                  </Text>
                  <Text style={[FONTS.title_medium, {color: COLORS.gray}]}>
                    HSD: 31.10.2023
                  </Text>
                </View>
                <View
                  style={{
                    width: SIZES.width * 0.25,
                    height: '100%',
                    backgroundColor: COLORS.lightGray1,
                    borderRadius: SIZES.radius,
                    borderTopLeftRadius: SIZES.padding,
                    borderBottomLeftRadius: SIZES.padding,
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <TouchableOpacity>
                    <Text
                      style={[
                        FONTS.title_large,
                        {
                          color: COLORS.gray,
                          fontWeight: 'bold',
                        },
                      ]}>
                      Chọn
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  height: '100%',
                }}>
                <View
                  style={{
                    height: '100%',
                    width: SIZES.width * 0.6,
                    padding: SIZES.spacing,
                    backgroundColor: COLORS.lightGray1,
                    borderRadius: SIZES.radius,
                    borderLeftColor: COLORS.gray2,
                    justifyContent: 'center',
                    borderLeftWidth: SIZES.spacing,
                    borderTopRightRadius: SIZES.padding,
                    borderBottomRightRadius: SIZES.padding,
                  }}>
                  <Text style={[FONTS.title_medium, {color: COLORS.gray}]}>
                    SAIGONA6
                  </Text>
                  <Text
                    style={[
                      FONTS.title_large,
                      {color: COLORS.gray, fontWeight: 'bold'},
                    ]}>
                    Khao 10K đơn từ 120K
                  </Text>
                  <Text style={[FONTS.title_medium, {color: COLORS.gray}]}>
                    HSD: 31.10.2023
                  </Text>
                </View>
                <View
                  style={{
                    width: SIZES.width * 0.25,
                    height: '100%',
                    backgroundColor: COLORS.lightGray1,
                    borderRadius: SIZES.radius,
                    borderTopLeftRadius: SIZES.padding,
                    borderBottomLeftRadius: SIZES.padding,
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <TouchableOpacity>
                    <Text
                      style={[
                        FONTS.title_large,
                        {
                          color: COLORS.gray,
                          fontWeight: 'bold',
                        },
                      ]}>
                      Chọn
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </ScrollView>
            {/* end total price */}
            {/* tip */}
            <View style={{padding: SIZES.padding}}>
              <Text style={[FONTS.title_medium, {color: COLORS.blackText}]}>
                Tip thêm cho tài xế
              </Text>
              <Text style={[FONTS.body_large, {color: COLORS.gray}]}>
                Tài xế sẽ nhận 100% tiền tip từ bạn
              </Text>
              <View
                style={{
                  marginTop: SIZES.spacing,
                  width: '100%',
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                <View
                  style={{
                    width: '60%',
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    gap: 10,
                  }}>
                  {tips.map(tip => {
                    return (
                      <Chip
                        rippleColor={COLORS.primary2(0.1)}
                        key={tip.value}
                        style={{
                          padding: 2,
                          borderRadius: SIZES.padding,
                          alignSelf: 'flex-start',
                          borderColor: COLORS.gray3,
                        }}
                        onPress={() => console.log('first')}
                        avatar={<Image source={tip.icon} />}
                        mode="outlined">
                        <Text>{tip.value}</Text>
                      </Chip>
                    );
                  })}

                  <Chip
                    rippleColor={COLORS.primary2(0.1)}
                    style={{
                      padding: 2,
                      borderRadius: SIZES.padding,
                      alignSelf: 'flex-start',
                      borderColor: COLORS.gray3,
                    }}
                    onPress={() => console.log('first')}
                    mode="outlined">
                    <Text>Nhập số khác</Text>
                  </Chip>
                </View>
                <Image
                  style={{
                    width: SIZES.width * 0.3,
                    height: SIZES.width * 0.3,
                  }}
                  source={{
                    uri: 'https://thientu.vn/userfiles/files/huong-dan-video-call-voi-baemin.png',
                  }}
                />
              </View>
            </View>
            {/* end tip */}
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
                      {convertToVND(53000)}
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

const tips = [
  {
    icon: icons.cafe,
    value: '15.000',
  },
  {
    icon: icons.bottle_plastic,
    value: '5.000',
  },
  {
    icon: icons.hot_dog,
    value: '20.000',
  },
  {
    icon: icons.soda,
    value: '10.000',
  },
];

const styles = StyleSheet.create({
  sawtooth: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftWidth: 10, // Độ rộng cạnh trái
    borderRightWidth: 10, // Độ rộng cạnh phải
    borderBottomWidth: 10, // Độ rộng cạnh dưới (chiều cao)
    borderLeftColor: 'transparent', // Màu cạnh trái
    borderRightColor: 'transparent', // Màu cạnh phải
    borderBottomColor: COLORS.lightGray2, // Màu cạnh dưới
    marginBottom: -1,
  },

  rectangle: {
    justifyContent: 'center',
    padding: SIZES.spacing,
    marginTop: 12,
    borderRadius: SIZES.radius,
    backgroundColor: COLORS.primary2(0.1),
  },
  triangle: {
    position: 'absolute',
    top: -12,
    left: '10%',
    width: 0,
    height: 0,
    borderLeftWidth: 12,
    borderRightWidth: 12,
    borderBottomWidth: 12,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: COLORS.primary2(0.1),
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
