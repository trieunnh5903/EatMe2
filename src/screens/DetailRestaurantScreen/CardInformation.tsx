import {StyleSheet, Image, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {Feather, Ionicons} from '../../utils';
import {SIZES, COLORS, FONTS, icons} from '../../config';

interface CardInformationProps {
  name: string;
  address: string;
}
const CardInformation = ({address, name}: CardInformationProps) => {
  return (
    <View style={{margin: 2 * SIZES.spacing}}>
      <View style={styles.mainInformation}>
        <TouchableOpacity style={styles.btnInfo}>
          <Ionicons
            name="information-circle-outline"
            size={24}
            color={COLORS.black}
          />
        </TouchableOpacity>
        <View style={styles.partnerWrapper}>
          <Image
            source={icons.verified}
            style={{width: 20, height: 20}}
            resizeMode="contain"
          />
          <Text
            style={[
              {color: COLORS.primary, marginLeft: SIZES.base},
              FONTS.label_large,
            ]}>
            ĐỐI TÁC CỦA BAEMIN
          </Text>
        </View>
        <Text style={[FONTS.title_large, styles.foodName]}>{name}</Text>
        <Text
          numberOfLines={1}
          style={{
            color: COLORS.darkGray,
            marginBottom: SIZES.base,
            ...FONTS.title_medium,
          }}>
          0.3km •<Text style={FONTS.body_large}>{address}</Text>
        </Text>
      </View>

      {/* sub info */}
      <View style={styles.subInfo}>
        <View style={styles.timeDeliveryWrapper}>
          <Feather
            name="clock"
            size={24}
            color={COLORS.black}
            style={{marginRight: 10}}
          />
          <View>
            <Text
              style={{
                color: COLORS.blackText,
                ...FONTS.title_medium,
              }}>
              Giao hàng tiêu chuẩn
            </Text>
            <Text
              style={{
                color: COLORS.blackText,
                ...FONTS.body_large,
              }}>
              Dự kiến giao hàng lúc 18:30
            </Text>
          </View>
        </View>
        <TouchableOpacity>
          <Text style={{color: COLORS.primary, ...FONTS.label_large}}>
            Thay đổi
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.voucher}>
        <View style={styles.voucherWrapper}>
          <Feather
            name="gift"
            size={24}
            color={COLORS.black}
            style={{marginRight: 10}}
          />
          <Text numberOfLines={1} style={styles.textVoucher}>
            Nhập "BANMOI" giảm 40k trên giá món
          </Text>
        </View>
        <TouchableOpacity>
          <Text style={{color: COLORS.primary, ...FONTS.label_large}}>
            Xem thêm
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.voucher}>
        <View style={styles.invoiceGroup}>
          <Feather
            name="users"
            size={24}
            color={COLORS.black}
            style={{marginRight: 10}}
          />
          <Text style={{color: COLORS.blackText, ...FONTS.label_large}}>
            Đơn nhóm
          </Text>
        </View>

        <TouchableOpacity>
          <Text style={{color: COLORS.primary, ...FONTS.label_large}}>
            Tạo đơn
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CardInformation;

const styles = StyleSheet.create({
  mainInformation: {
    backgroundColor: COLORS.white,
    alignItems: 'center',
    marginTop: -60,
    paddingVertical: SIZES.spacing,
    paddingHorizontal: SIZES.spacing * 2,
    borderRadius: SIZES.radius,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,

    elevation: 1,
  },

  textVoucher: {
    flex: 1,
    color: COLORS.blackText,
    ...FONTS.label_large,
  },

  foodName: {
    fontSize: 28,
    color: COLORS.blackText,
    fontWeight: 'bold',
    marginTop: SIZES.base,
    textAlign: 'center',
    marginBottom: SIZES.base,
  },

  subInfo: {
    marginTop: SIZES.padding,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  voucherWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
    flex: 1,
  },

  invoiceGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
    flex: 1,
  },

  btnInfo: {
    position: 'absolute',
    right: 10,
    top: -16,
    backgroundColor: COLORS.white,
    padding: 5,
    borderRadius: 50,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
  },
  partnerWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: SIZES.base,
  },

  timeDeliveryWrapper: {
    flexDirection: 'row',
    marginRight: 16,
    flex: 1,
    alignItems: 'center',
  },

  voucher: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: SIZES.spacing,
  },
});
