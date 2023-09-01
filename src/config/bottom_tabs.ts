// import {Cart, Favourite, Home, Notification, Profile, Search} from '../screens';
import icons from './icons';

const bottom_tabs = [
  {
    id: 1,
    name: 'Trang chủ',
    // component: Home,
    icon: icons.home,
    icon_fill: icons.home_fill,
  },
  {
    id: 2,
    name: 'Tìm kiếm',
    // component: Search,
    icon: icons.search,
    icon_fill: icons.search,
  },
  {
    id: 3,
    name: 'Giỏ hàng',
    // component: Cart,
    icon: icons.cart,
    icon_fill: icons.cart_fill,
  },
  {
    id: 4,
    name: 'Yêu thích',
    // component: Favourite,
    icon: icons.favourite,
    icon_fill: icons.favourite_fill,
  },
  {
    id: 5,
    name: 'Cá nhân',
    // component: Profile,
    icon: icons.profile,
    icon_fill: icons.profile_fill,
  },
];

export default bottom_tabs;
