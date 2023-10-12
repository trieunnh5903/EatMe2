import {useNavigation} from '@react-navigation/native';
import {Shop} from '../types/types';
import {FavoriteScreenProp} from '../types/navigation.type';
import {useShopViewModel} from '../view-models/useShopViewModel';

const useFavoriteController = () => {
  console.log('useFavoriteController');
  const navigation = useNavigation<FavoriteScreenProp['navigation']>();
  const onFoodItemPress = (foodItem: Shop) =>
    navigation.navigate('DetailShop', {foodItem});

  const {removeFromFavoriteList, favoriteList} = useShopViewModel();

  return {
    removeFromFavoriteList,
    favoriteList,
    onFoodItemPress,
  };
};

export default useFavoriteController;
