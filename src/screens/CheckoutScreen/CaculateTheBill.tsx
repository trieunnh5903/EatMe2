import {
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Text,
  View,
} from 'react-native';
import React from 'react';
import {SIZES, FONTS, COLORS} from '../../theme';
import convertToVND from '../../utils/convertToVND';

interface CaculateTheBillProps {
  foodQuantity: number;
  totalFoodPrice: number;
}
const CaculateTheBill: React.FC<CaculateTheBillProps> = ({
  foodQuantity,
  totalFoodPrice,
}) => {
  const triangleWidth = 10; // Độ rộng tam giác
  const trianglesCount = Math.floor(SIZES.width / triangleWidth);
  return (
    <>
      {/* total price */}
      <View style={{padding: SIZES.padding}}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text style={[FONTS.body_large, {color: COLORS.blackText}]}>
            Tạm tính ({foodQuantity} món)
          </Text>
          <Text style={[FONTS.body_large, {color: COLORS.blackText}]}>
            {convertToVND(totalFoodPrice)}
          </Text>
        </View>

        <View style={styles.fee}>
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
        contentContainerStyle={styles.listVoucherContainer}>
        <View style={styles.voucher}>
          <View style={styles.voucherLeft}>
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
          <View style={styles.voucherRight}>
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

        <View style={styles.voucher}>
          <View style={styles.voucherLeft}>
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
          <View style={styles.voucherRight}>
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

        <View style={styles.voucher}>
          <View style={styles.voucherLeft}>
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
          <View style={styles.voucherRight}>
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
    </>
  );
};

export default CaculateTheBill;

const styles = StyleSheet.create({
  fee: {
    flexDirection: 'row',
    marginTop: SIZES.base,
    justifyContent: 'space-between',
  },

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

  voucherLeft: {
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
  },

  voucher: {
    flexDirection: 'row',
    alignItems: 'center',
    height: '100%',
  },

  listVoucherContainer: {
    padding: SIZES.padding,
    gap: SIZES.padding,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.lightGray2,
  },

  voucherRight: {
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
  },
});
