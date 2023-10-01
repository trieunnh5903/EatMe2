import {changeLoginSate} from '../redux/slice/user.slice';
import {useAppDispatch, useAppSelector} from '../redux/store';

const useUserViewModel = () => {
  const userState = useAppSelector(state => state.user);
  const dispatch = useAppDispatch();
  const changeStateToLogged = () => {
    return dispatch(changeLoginSate(true));
  };

  const changeStateToLogout = () => {
    dispatch(changeLoginSate(false));
  };
  return {
    userState,
    changeStateToLogged,
    changeStateToLogout,
  };
};

export default useUserViewModel;
