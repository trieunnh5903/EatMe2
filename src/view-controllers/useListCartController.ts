import {useNavigation} from '@react-navigation/native';
import {ListCartScreenProp} from '../types/navigation.type';
import useInvoiceViewModel from '../view-models/useInvoiceViewModel';

const useListCartController = () => {
  const navigation = useNavigation<ListCartScreenProp['navigation']>();
  const {allIds, byId} = useInvoiceViewModel();
  const listInvoices = allIds.map(id => byId[id]);
  const onBackPress = () => navigation.goBack();
  return {
    onBackPress,
    listInvoices,
  };
};
export default useListCartController;
