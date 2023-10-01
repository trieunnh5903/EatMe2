import {useNavigation} from '@react-navigation/native';
import {useRef, useState} from 'react';
import {FlatList} from 'react-native';
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
} from 'react-native-reanimated';
import {OnBoardingNavigationProps} from '../types/navigation.type';

const useOnboardingController = () => {
  const navigation = useNavigation<OnBoardingNavigationProps['navigation']>();
  const flastListRef = useRef<Animated.FlatList<any> & FlatList>(null);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const scrollX = useRef(useSharedValue<number>(0)).current;

  const onNextPress = () => {
    if (currentIndex < 2) {
      let nextIndex = currentIndex + 1;
      setCurrentIndex(nextIndex);
      if (flastListRef?.current) {
        flastListRef?.current.scrollToIndex({index: nextIndex, animated: true});
      }
    } else {
      navigation.navigate('Login');
    }
  };

  const onScroll = useAnimatedScrollHandler(event => {
    scrollX.value = event.contentOffset.x;
  });

  const handleViewableItemsChanged = useRef(
    ({viewableItems}: {viewableItems: any}) => {
      if (viewableItems.length > 0) {
        const firstVisibleItem = viewableItems[0];
        setCurrentIndex(firstVisibleItem.index);
      }
    },
  );

  const onSkipPress = () => navigation.navigate('Login');
  return {
    onSkipPress,
    flastListRef,
    currentIndex,
    onNextPress,
    onScroll,
    scrollX,
    handleViewableItemsChanged,
  };
};

export default useOnboardingController;
