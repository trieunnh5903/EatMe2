import useFoodModel from '../models/useFoodModel';

const useFoodViewModel = () => {
  const {getFoodById} = useFoodModel();
  return {
    getFoodById,
  };
};

export default useFoodViewModel;
