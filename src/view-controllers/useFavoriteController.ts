import {useNavigation} from '@react-navigation/native';
import {FoodObject} from '../types/types';
import {FavoriteScreenProp} from '../navigation/types';
import {useShopViewModel} from '../view-models/useShopViewModel';

const useFavoriteController = () => {
  const navigation = useNavigation<FavoriteScreenProp['navigation']>();
  const onFoodItemPress = (foodItem: FoodObject) =>
    navigation.navigate('DetailShop', {foodItem});

  const {removeFromFavoriteList, favoriteList} = useShopViewModel();

  return {
    removeFromFavoriteList,
    favoriteList,
    onFoodItemPress,
  };
};

export default useFavoriteController;
