import {useRef, useState} from 'react';
import {useAppSelector} from '../utils/hooks';
import LottieView from 'lottie-react-native';
import {useNavigation} from '@react-navigation/native';
import {EnterAddressScreenProps} from '../navigation/types';
import {Region} from 'react-native-maps';
import {ToastAndroid} from 'react-native';

const useEnterAddressController = (enableGoogleMap: boolean) => {
  const navigation = useNavigation<EnterAddressScreenProps['navigation']>();
  const [showGoogleMap, setShowGoogleMap] = useState(enableGoogleMap);
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

  const onToggleGoogleMapPress = () => setShowGoogleMap(!showGoogleMap);
  const onDeleteKeywordPress = () => setKeyAddress('');
  const onChangeTextKeyword = (value: string) => setKeyAddress(value);
  const onRegionChangeComplete = (newRegion: Region) => {
    setRegion(newRegion);
    animationRef.current?.play();
    ToastAndroid.show(region.latitude + '', 5000);
  };
  return {
    showGoogleMap,
    region,
    animationRef,
    onChangeTextKeyword,
    onRegionChangeComplete,
    onDeleteKeywordPress,
    onToggleGoogleMapPress,
    onBackPress,
    address,
    keyAddress,
  };
};

export default useEnterAddressController;
