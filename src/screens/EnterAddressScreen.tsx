import {
  Image,
  StyleSheet,
  TouchableOpacity,
  Text,
  ToastAndroid,
  View,
} from 'react-native';
import React, {useRef, useState} from 'react';
import {COLORS, SIZES, FONTS, icons} from '../config';
import {Break, ButtonText, HeaderCustom} from '../components';
import {EnterAddressScreenProps} from '../navigation/types';
import SearchInput from '../components/SearchInput';
import {FlashList} from '@shopify/flash-list';
import {useAppSelector} from '../utils/hooks';
import MapView from 'react-native-maps';
import LottieView from 'lottie-react-native';
import lottie from '../config/lottie';

// interface AddressProps {
//   name: string;
//   location: string;
// }

const EnterAddressScreen = ({navigation}: EnterAddressScreenProps) => {
  const [showGoogleMap, setShowGoogleMap] = useState(false);
  const [keyAddress, setKeyAddress] = useState('');
  const {address} = useAppSelector(state => state.user);
  const animationRef = useRef<LottieView>(null);
  const [region, setRegion] = useState({
    latitude: 10.8356522,
    longitude: 106.6769978,
    latitudeDelta: 0.005,
    longitudeDelta: 0.005,
  });
  const onBackPress = () => {
    if (showGoogleMap === false) {
      return navigation.goBack();
    } else {
      setShowGoogleMap(false);
    }
  };

  return (
    <View style={styles.container}>
      {/* header */}
      <HeaderCustom
        leftComponent={
          <TouchableOpacity onPress={onBackPress}>
            <Image source={icons.arrow_back} style={styles.iconHeader} />
          </TouchableOpacity>
        }
        rightComponent={
          <TouchableOpacity onPress={() => setShowGoogleMap(!showGoogleMap)}>
            <Image source={icons.map} style={styles.iconHeader} />
          </TouchableOpacity>
        }
        title={'Nhập địa chỉ'}
        containerStyle={{paddingHorizontal: SIZES.spacing}}
      />

      {showGoogleMap === false ? (
        <View style={{flex: 1, paddingHorizontal: SIZES.spacing}}>
          <SearchInput
            keyword={keyAddress}
            onDeletePress={() => setKeyAddress('')}
            onChangeText={value => setKeyAddress(value)}
            placeholder="Địa điểm hiện tại của bạn ở đâu"
          />

          {/* my address */}
          <View style={styles.myAddressWrapper}>
            <Text style={styles.textTitle}>Địa chỉ của tôi</Text>
            <TouchableOpacity>
              <Text style={styles.textEdit}>Chỉnh sửa</Text>
            </TouchableOpacity>
          </View>
          <FlashList
            data={address}
            keyExtractor={item => item.name}
            estimatedItemSize={70}
            ListEmptyComponent={<View />}
            ItemSeparatorComponent={() => <Break height={2} />}
            ListFooterComponent={
              <TouchableOpacity style={styles.listFooter}>
                <Image source={icons.add_wght700} style={styles.icon} />
                <Text style={styles.textAdd}>Thêm địa chỉ</Text>
              </TouchableOpacity>
            }
            renderItem={({item}) => {
              return (
                <View style={styles.addressItem}>
                  <Image
                    style={{width: 30, height: 30}}
                    source={icons.location}
                  />
                  <View style={{marginLeft: SIZES.spacing}}>
                    <Text
                      style={{color: COLORS.blackText, ...FONTS.label_large}}
                      numberOfLines={1}>
                      {item.name}
                    </Text>
                    <Text
                      style={{
                        color: COLORS.blackText,
                        marginTop: SIZES.base,
                        ...FONTS.body_medium,
                      }}
                      numberOfLines={1}>
                      {item.location}
                    </Text>
                  </View>
                </View>
              );
            }}
          />
        </View>
      ) : (
        <View style={{flex: 1}}>
          <View style={{flex: 1}}>
            <MapView
              style={{flex: 1}}
              onRegionChangeComplete={newRegion => {
                setRegion(newRegion);
                animationRef.current?.play();
                ToastAndroid.show(region.latitude + '', 5000);
              }}
              initialRegion={region}
            />
            <View pointerEvents="none" style={styles.iconMarkerWrapper}>
              <LottieView
                ref={animationRef}
                style={{width: 48, height: 48}}
                source={lottie.location_pin}
                autoPlay={true}
                loop={false}
              />
            </View>
          </View>
          <View style={{padding: SIZES.padding}}>
            <Text
              style={{
                marginBottom: SIZES.spacing,
                color: COLORS.gray,
                ...FONTS.label_large,
              }}>
              Địa điểm đã chọn
            </Text>
            <Text style={styles.textRoad}>214/66 Nguyễn Oanh</Text>
            <Text
              numberOfLines={1}
              style={{color: COLORS.gray, ...FONTS.label_large}}>
              Nguyễn Oanh, phường 17, Gò Vấp, Thành phố Hồ Chí Minh
            </Text>
            <ButtonText
              label="Xác nhận"
              containerStyle={styles.btnSubmit}
              labelStyle={styles.textSubmit}
            />
          </View>
        </View>
      )}
    </View>
  );
};

export default EnterAddressScreen;

const styles = StyleSheet.create({
  addressItem: {
    paddingVertical: SIZES.spacing,
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconMarkerWrapper: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  textSubmit: {
    color: COLORS.white,
    ...FONTS.title_large,
    fontWeight: 'bold',
  },
  btnSubmit: {
    marginTop: SIZES.spacing * 4,
    backgroundColor: COLORS.primary,
    height: 55,
    borderRadius: SIZES.radius,
  },
  textRoad: {
    color: COLORS.blackText,
    ...FONTS.title_large,
    fontWeight: 'bold',
  },
  listFooter: {
    alignItems: 'center',
    flexDirection: 'row',
    height: 50,
  },

  textAdd: {
    marginLeft: SIZES.spacing,
    color: COLORS.primary,
    ...FONTS.label_large,
  },

  myAddressWrapper: {
    marginTop: 2 * SIZES.spacing,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  textTitle: {
    color: COLORS.blackText,
    ...FONTS.label_large,
  },

  textEdit: {
    color: COLORS.primary,
    ...FONTS.label_large,
  },

  icon: {
    width: 24,
    height: 24,
    tintColor: COLORS.primary,
  },

  iconHeader: {
    width: 30,
    height: 30,
    tintColor: COLORS.black,
  },

  headerRight: {
    width: 30,
    height: 30,
  },

  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
});
