import {Text, View} from 'react-native';
import React, {memo, useCallback, useEffect, useState} from 'react';
import {COLORS, FONTS} from '../config';
import Ionicons from 'react-native-vector-icons/Ionicons';
interface CountDownProps {
  time: number;
}
const CountDown: React.FC<CountDownProps> = ({time = 3600}) => {
  const [remainingTime, setRemainingTime] = useState(time);

  const updateTimer = useCallback(() => {
    if (remainingTime > 0) {
      setRemainingTime(remainingTime - 1);
    }
  }, [remainingTime]);

  useEffect(() => {
    const timer = setInterval(updateTimer, 1000);
    return () => {
      clearInterval(timer);
    };
  }, [remainingTime, updateTimer]);

  const hours = Math.floor(remainingTime / 3600);
  const minutes = Math.floor((remainingTime % 3600) / 60);
  const seconds = remainingTime % 60;
  return (
    <View style={{flexDirection: 'row', alignItems: 'center'}}>
      <Text
        style={{
          marginRight: 10,
          color: COLORS.orangeDark,
          ...FONTS.title_large,
          fontWeight: '900',
        }}>
        FLA
        <Ionicons name="flash" size={16} color={COLORS.orangeDark} />H SALE
      </Text>

      {/* count down */}
      <View style={{backgroundColor: COLORS.orangeDark, borderRadius: 4}}>
        <Text
          style={{
            marginHorizontal: 6,
            marginVertical: 2,
            color: COLORS.white,
            ...FONTS.title_large,
            fontWeight: 'bold',
          }}>
          {hours < 10 ? '0' + hours : hours}
        </Text>
      </View>
      <Text
        style={{
          marginHorizontal: 4,
          color: COLORS.orangeDark,
          ...FONTS.title_large,
          fontWeight: 'bold',
        }}>
        :
      </Text>
      <View style={{backgroundColor: COLORS.orangeDark, borderRadius: 4}}>
        <Text
          style={{
            marginHorizontal: 6,
            marginVertical: 2,
            color: COLORS.white,
            ...FONTS.title_large,
            fontWeight: 'bold',
          }}>
          {minutes < 10 ? '0' + minutes : minutes}
        </Text>
      </View>
      <Text
        style={{
          marginHorizontal: 4,
          color: COLORS.orangeDark,
          ...FONTS.title_large,
          fontWeight: 'bold',
        }}>
        :
      </Text>
      <View style={{backgroundColor: COLORS.orangeDark, borderRadius: 4}}>
        <Text
          style={{
            marginHorizontal: 6,
            marginVertical: 2,
            color: COLORS.white,
            ...FONTS.title_large,
            fontWeight: 'bold',
          }}>
          {seconds < 10 ? '0' + seconds : seconds}
        </Text>
      </View>
    </View>
  );
};

export default memo(CountDown);
