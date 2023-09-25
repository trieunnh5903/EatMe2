import {useNavigation} from '@react-navigation/native';
import {ConfirmOtpNavigationProps} from '../navigation/types';
import {useState} from 'react';
import {
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';

const useConfirmOtpController = () => {
  const CELL_COUNT = 4;
  const navigation = useNavigation<ConfirmOtpNavigationProps['navigation']>();
  const [value, setValue] = useState('');
  const [timer, setTimer] = useState(60);
  const ref = useBlurOnFulfill({value, cellCount: CELL_COUNT});
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  let interval = () =>
    setInterval(() => {
      setTimer(preValue => {
        if (preValue > 0) {
          return preValue - 1;
        }
        return preValue;
      });
    }, 1000);

  const isEnableButton = () => {
    return value.length === CELL_COUNT;
  };

  const onResendPress = () => setTimer(60);
  const onChangeTextOtp = (text: string) => setValue(text);

  const onNextPress = () =>
    navigation.navigate('Main', {
      screen: 'Home',
    });

  return {
    onNextPress,
    onChangeTextOtp,
    onResendPress,
    CELL_COUNT,
    props,
    getCellOnLayoutHandler,
    value,
    timer,
    interval,
    ref,
    isEnableButton,
  };
};

export default useConfirmOtpController;
