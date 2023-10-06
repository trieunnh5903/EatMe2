import {useState} from 'react';
import {Shop} from '../types/types';
import {useNavigation} from '@react-navigation/native';
import {SreachScreenProp} from '../types/navigation.type';
import {useShopViewModel} from '../view-models/useShopViewModel';
const useSearchController = () => {
  const [keyword, setKeyword] = useState('');
  const navigation = useNavigation<SreachScreenProp['navigation']>();
  const {useSeachShopByName} = useShopViewModel();
  const {data} = useSeachShopByName(keyword);
  const onChangeTextSeach = (text: string) => setKeyword(text);
  const onDeletePress = () => setKeyword('');
  const onFoodItemPress = (item: Shop) =>
    navigation.navigate('DetailShop', {
      shopInfo: item,
    });
  return {
    keyword,
    data,
    onChangeTextSeach,
    onDeletePress,
    onFoodItemPress,
  };
};

export default useSearchController;
