import {useState} from 'react';
import {useSeachFoodByNameViewModel} from '../view-models/useFoodViewModel';
import {FoodObject} from '../types/types';
import {useNavigation} from '@react-navigation/native';
import {SreachScreenProp} from '../navigation/types';
const useSearchController = () => {
  const [keyword, setKeyword] = useState('');
  const navigation = useNavigation<SreachScreenProp['navigation']>();
  const {data} = useSeachFoodByNameViewModel(keyword);

  const onChangeTextSeach = (text: string) => setKeyword(text);
  const onDeletePress = () => setKeyword('');
  const onFoodItemPress = (item: FoodObject) =>
    navigation.navigate('DetailShop', {
      foodItem: item,
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
