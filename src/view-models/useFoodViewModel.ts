import useFoodModel from '../models/useFoodModel';

const useFoodViewModel = () => {
  console.log('useFoodViewModel');
  const {getFoodById} = useFoodModel();
  return {
    getFoodById,
  };
};

export default useFoodViewModel;
