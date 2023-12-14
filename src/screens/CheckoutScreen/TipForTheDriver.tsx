import {StyleSheet, Image, Text, View} from 'react-native';
import React from 'react';
import {Chip} from 'react-native-paper';
import {SIZES, COLORS, FONTS, icons} from '../../config';
import convertToVND from '../../utils/convertToVND';

interface TipForTheDriverProps {
  selectedTip: number;
  onTipPress: (tip: number) => void;
}
const TipForTheDriver: React.FC<TipForTheDriverProps> = ({
  onTipPress,
  selectedTip,
}) => {
  return (
    <View style={{padding: SIZES.padding}}>
      <Text style={[FONTS.title_medium, {color: COLORS.blackText}]}>
        Tip thêm cho tài xế
      </Text>
      <Text style={[FONTS.body_large, {color: COLORS.gray}]}>
        Tài xế sẽ nhận 100% tiền tip từ bạn
      </Text>
      <View style={styles.tipWrapper}>
        <View style={styles.tipGroup}>
          {tips.map(tip => {
            return (
              <Chip
                rippleColor={COLORS.secondary}
                key={tip.value}
                style={[
                  styles.tip,
                  {
                    backgroundColor:
                      selectedTip === tip.value ? COLORS.secondary : undefined,
                  },
                ]}
                onPress={() => onTipPress(Number(tip.value))}
                avatar={<Image source={tip.icon} />}
                mode="outlined">
                <Text>{convertToVND(tip.value)}</Text>
              </Chip>
            );
          })}

          <Chip
            rippleColor={COLORS.secondary}
            style={styles.tip}
            onPress={() => console.log('first')}
            mode="outlined">
            <Text>Nhập số khác</Text>
          </Chip>
        </View>
        <Image
          style={{
            width: SIZES.width * 0.24,
            height: SIZES.width * 0.24,
          }}
          source={{
            uri: 'https://thientu.vn/userfiles/files/huong-dan-video-call-voi-baemin.png',
          }}
        />
      </View>
    </View>
  );
};
const tips = [
  {
    icon: icons.cafe,
    value: 15000,
  },
  {
    icon: icons.bottle_plastic,
    value: 5000,
  },
  {
    icon: icons.hot_dog,
    value: 20000,
  },
  {
    icon: icons.soda,
    value: 10000,
  },
];
export default TipForTheDriver;

const styles = StyleSheet.create({
  tip: {
    padding: 2,
    borderRadius: SIZES.padding,
    alignSelf: 'flex-start',
    borderColor: COLORS.gray3,
  },

  tipGroup: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  tipWrapper: {
    marginTop: SIZES.spacing,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
