import {
  StyleSheet,
  Image,
  TouchableOpacity,
  GestureResponderEvent,
  Text,
  View,
} from 'react-native';
import React from 'react';
import {COLORS, FONTS, SIZES} from '../../config';
import {Feather} from '../../utils';

interface InformationAddressProps {
  onChangeAddressPress?: ((event: GestureResponderEvent) => void) | undefined;
}
const InformationAddress: React.FC<InformationAddressProps> = ({
  onChangeAddressPress,
}) => {
  return (
    <>
      <View style={styles.addressWrapper}>
        <Image
          source={{
            uri: 'https://play-lh.googleusercontent.com/8uMTbCdy6B93EGM5p6tfOVWnkDpee5ZOVYfaBgsWciG77nxZEpjltRtaOTxsI52x8Q=s256-rw',
          }}
          style={{width: 60, height: 60, borderRadius: SIZES.radius}}
        />
        <View style={{flex: 1, marginLeft: SIZES.padding}}>
          <View style={styles.infoWrapper}>
            <Text style={[FONTS.body_large, {color: COLORS.blackText}]}>
              Giao bởi tài xế
            </Text>
            <TouchableOpacity>
              <Text
                style={[
                  FONTS.title_medium,
                  {color: COLORS.primary, fontWeight: 'bold'},
                ]}>
                Thay đổi
              </Text>
            </TouchableOpacity>
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
                214/66 Nguyễn Oanh, Phường 17, Gò Vấp, Hồ Chí Minh
              </Text>
            </View>
            <Feather name="chevron-right" size={32} color={COLORS.black} />
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
          backgroundColor: COLORS.secondary,
        }}>
        <Text style={[FONTS.title_medium, {color: COLORS.blackText}]}>
          <Feather name="map-pin" size={16} color={COLORS.black} /> Bạn có chắc
          địa chỉ giao hàng chính xác ?
        </Text>
        <Text style={[FONTS.body_large, {color: COLORS.blackText}]}>
          Địa chỉ giao hàng có vẻ xa với vị trí hiện tại của bạn.
        </Text>
      </View>
    </>
  );
};

export default InformationAddress;

const styles = StyleSheet.create({
  infoWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  addressWrapper: {
    flexDirection: 'row',
    padding: SIZES.padding,
  },
});
