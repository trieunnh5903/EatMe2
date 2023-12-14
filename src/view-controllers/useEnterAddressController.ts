import {useRef, useState} from 'react';
import LottieView from 'lottie-react-native';
import {useNavigation} from '@react-navigation/native';
import {EnterAddressScreenProps} from '../types/navigation.type';
import {Region} from 'react-native-maps';
// import {useAppSelector} from '../redux/store';

const useEnterAddressController = (enableGoogleMap: boolean) => {
  const navigation = useNavigation<EnterAddressScreenProps['navigation']>();
  const [showGoogleMap, setShowGoogleMap] = useState(enableGoogleMap);
  const [keyAddress, setKeyAddress] = useState('');
  // const {address} = useAppSelector(state => state.user);
  const animationRef = useRef<LottieView>(null);
  const [region, setRegion] = useState({
    latitude: 10.8356522,
    longitude: 106.6769978,
    latitudeDelta: 0.005,
    longitudeDelta: 0.005,
  });
  const onBackPress = () => {
    return navigation.goBack();
  };

  const onToggleGoogleMapPress = () => setShowGoogleMap(!showGoogleMap);
  const onDeleteKeywordPress = () => setKeyAddress('');
  const onChangeTextKeyword = (value: string) => setKeyAddress(value);
  const onRegionChangeComplete = (newRegion: Region) => {
    setRegion(newRegion);
    animationRef.current?.play();
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
    keyAddress,
  };
};

export default useEnterAddressController;
