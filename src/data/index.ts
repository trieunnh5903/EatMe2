import {images} from '../config';
import icons from '../config/icons';

const myProfile = {
  id: 1,
  name: 'Hai Trieu',
  profile_image:
    'https://plus.unsplash.com/premium_photo-1671581559476-10b8a92ffb77?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
  address: '214/66/7 Nguyễn Oanh',
};

const onboarding_screens = [
  {
    id: 1,
    backgroundImage: images.on_boarding_bg1,
    bannerImage: require('../assets/images/on_boarding/favourite_food.png'),
    title: 'Chọn một món ăn yêu thích',
    description:
      'Khi bạn đặt hàng Eatme, chúng tôi sẽ kết nối bạn với phiếu giảm giá độc quyền, ưu đãi đặc biệt và phần thưởng',
  },
  {
    id: 2,
    backgroundImage: images.on_boarding_bg1,
    bannerImage: require('../assets/images/on_boarding/hot_delivery.png'),
    title: 'Giao hàng đến tận nhà',
    description:
      'Chúng tôi đặt món ăn nhanh hơn, đơn giản và miễn phí - bất kể bạn đặt hàng trực tuyến hay tiền mặt',
  },
  {
    id: 3,
    backgroundImage: images.on_boarding_bg1,
    bannerImage: require('../assets/images/on_boarding/great_food.png'),
    title: 'Những món ăn tuyệt vời',
    description:
      'Bạn sẽ nhận được những món ăn tuyệt vời trong vòng vài giờ. Và nhận tín dụng giao hàng miễn phí cho mỗi đơn hàng.',
  },
];
const delivery_time = [
  {
    id: 1,
    label: '10 Mins',
  },
  {
    id: 2,
    label: '20 Mins',
  },
  {
    id: 3,
    label: '30 Mins',
  },
];

const ratings = [
  {
    id: 1,
    label: 1,
  },
  {
    id: 2,
    label: 2,
  },
  {
    id: 3,
    label: 3,
  },
  {
    id: 4,
    label: 4,
  },
  {
    id: 5,
    label: 5,
  },
];

const tags = [
  {
    id: 1,
    label: 'Burger',
  },
  {
    id: 2,
    label: 'Fast Food',
  },
  {
    id: 3,
    label: 'Pizza',
  },
  {
    id: 4,
    label: 'Asian',
  },
  {
    id: 5,
    label: 'Dessert',
  },
  {
    id: 6,
    label: 'Breakfast',
  },
  {
    id: 7,
    label: 'Vegetable',
  },
  {
    id: 8,
    label: 'Taccos',
  },
];

const categories = [
  {
    id: 1,
    name: 'Bánh mì',
    icon: icons.baguette,
  },
  {
    id: 2,
    name: 'Đồ uống',
    icon: icons.cola,
  },
  {
    id: 3,
    name: 'Cơm',
    icon: icons.rice,
  },
  {
    id: 4,
    name: 'Bánh quy',
    icon: icons.cookies,
  },
  {
    id: 5,
    name: 'Hamburger',
    icon: icons.hamburger,
  },
  {
    id: 6,
    name: 'Hot Dog',
    icon: icons.hot_dog,
  },
  {
    id: 7,
    name: 'Mcdonald',
    icon: icons.mcdonald_french_fries,
  },
  {
    id: 8,
    name: 'Mì',
    icon: icons.noodles,
  },
  {
    id: 9,
    name: 'Pizza',
    icon: icons.pizza,
  },
];

const hamburger = {
  id: 1,
  name: 'Hamburger',
  description: 'Chicken patty hamburger',
  categories: [1, 2],
  price: 15.99,
  calories: 78,
  isFavourite: true,
  image:
    'https://raw.githubusercontent.com/byprogrammers/LCRN16-food-delivery-app-lite-starter/master/assets/dummyData/hamburger.png',
};

const hamburger2 = {
  id: 22,
  name: 'Hamburger',
  description: 'Chicken patty hamburger',
  categories: [1, 2],
  price: 15.99,
  calories: 78,
  isFavourite: true,
  image:
    'https://raw.githubusercontent.com/byprogrammers/LCRN16-food-delivery-app-lite-starter/master/assets/dummyData/hamburger.png',
};

const hotTacos = {
  id: 2,
  name: 'Hot Tacos',
  description: 'Mexican tortilla & tacos',
  categories: [1, 3],
  price: 10.99,
  calories: 78,
  isFavourite: false,
  image:
    'https://raw.githubusercontent.com/byprogrammers/LCRN16-food-delivery-app-lite-starter/master/assets/dummyData/hot_tacos.png',
};

const hotTacos2 = {
  id: 23,
  name: 'Hot Tacos',
  description: 'Mexican tortilla & tacos',
  categories: [1, 3],
  price: 10.99,
  calories: 78,
  isFavourite: false,
  image:
    'https://raw.githubusercontent.com/byprogrammers/LCRN16-food-delivery-app-lite-starter/master/assets/dummyData/hot_tacos.png',
};

const vegBiryani = {
  id: 3,
  name: 'Veg Biryani',
  description: 'Indian Vegetable Biryani',
  categories: [1, 2, 3],
  price: 10.99,
  calories: 78,
  isFavourite: true,
  image:
    'https://raw.githubusercontent.com/byprogrammers/LCRN16-food-delivery-app-lite-starter/master/assets/dummyData/veg_biryani.png',
};

const vegBiryani3 = {
  id: 33,
  name: 'Veg Biryani',
  description: 'Indian Vegetable Biryani',
  categories: [1, 2, 3],
  price: 10.99,
  calories: 78,
  isFavourite: true,
  image:
    'https://raw.githubusercontent.com/byprogrammers/LCRN16-food-delivery-app-lite-starter/master/assets/dummyData/veg_biryani.png',
};

const wrapSandwich = {
  id: 4,
  name: 'Wrap Sandwich',
  description: 'Grilled vegetables sandwich',
  categories: [1, 2],
  price: 10.99,
  calories: 78,
  isFavourite: true,
  image:
    'https://raw.githubusercontent.com/byprogrammers/LCRN16-food-delivery-app-lite-starter/master/assets/dummyData/wrap_sandwich.png',
};

const wrapSandwich4 = {
  id: 44,
  name: 'Wrap Sandwich',
  description: 'Grilled vegetables sandwich',
  categories: [1, 2],
  price: 10.99,
  calories: 78,
  isFavourite: true,
  image:
    'https://raw.githubusercontent.com/byprogrammers/LCRN16-food-delivery-app-lite-starter/master/assets/dummyData/wrap_sandwich.png',
};

const menu = [
  {
    id: 1,
    name: 'Featured',
    list: [hamburger, hotTacos, vegBiryani, hamburger2, hotTacos2, vegBiryani3],
  },
  {
    id: 2,
    name: 'Nearby you',
    list: [
      hamburger,
      vegBiryani,
      wrapSandwich,
      hamburger2,
      hotTacos2,
      vegBiryani3,
    ],
  },
  {
    id: 3,
    name: 'Popular',
    list: [
      hamburger,
      hotTacos,
      wrapSandwich,
      hamburger2,
      hotTacos2,
      vegBiryani3,
    ],
  },
  {
    id: 4,
    name: 'Newest',
    list: [hamburger, hotTacos, vegBiryani],
  },
  {
    id: 5,
    name: 'Trending',
    list: [hamburger, vegBiryani, wrapSandwich],
  },
  {
    id: 6,
    name: 'Recommended',
    list: [
      hamburger,
      hotTacos,
      wrapSandwich,
      hamburger2,
      hotTacos2,
      vegBiryani3,
    ],
  },
];

const myCart = [
  hamburger,
  hotTacos,
  vegBiryani,
  hamburger2,
  hotTacos2,
  vegBiryani3,
];

const myCard = [
  {
    id: 1,
    name: 'Zalo Pay',
    icon: icons.zalo_pay,
  },
];

const allCards = [
  {
    id: 1,
    name: 'Zalo Pay',
    icon: icons.zalo_pay,
  },
  {
    id: 3,
    name: 'Visa',
    icon: icons.visa,
  },
];

const carousel = [
  {
    id: 1,
    image:
      'https://images.foody.vn/delivery/collection/image-59e924ad-230215000717.png',
  },
  {
    id: 2,
    image:
      'https://images.foody.vn/delivery/collection/image-e3f6df2a-230104161348.png',
  },
  {
    id: 3,
    image: 'https://mms.img.susercontent.com/vn-11134512-7r98o-ll33mqgl4tl761',
  },
  {
    id: 4,
    image:
      'https://images.foody.vn/delivery/collection/image-f22ccbfc-230104161912.png',
  },
  {
    id: 5,
    image:
      'https://images.foody.vn/delivery/collection/image-44986962-230630135943.png',
  },
  {
    id: 6,
    image:
      'https://images.foody.vn/delivery/collection/image-e12ce9e6-220406074410.png',
  },
  {
    id: 7,
    image:
      'https://images.foody.vn/delivery/collection/image-67058639-230704180939.png',
  },
  {
    id: 8,
    image:
      'https://images.foody.vn/delivery/collection/image-59e924ad-230215000717.png',
  },
  {
    id: 9,
    image:
      'https://images.foody.vn/delivery/collection/image-0f612348-230215104336.png',
  },
  {
    id: 10,
    image:
      'https://images.foody.vn/delivery/collection/image-3b71bd4c-221230173415.png',
  },
];

const mostSrearched = [
  {id: 1, label: 'Cơm'},
  {id: 2, label: 'Bún'},
  {id: 3, label: 'Bánh mì'},
  {id: 4, label: 'Pizza'},
  {id: 5, label: 'Hamburger'},
  {id: 6, label: 'Bánh ngọt'},
  {id: 7, label: 'Coca'},
];
const data = {
  mostSrearched,
  myProfile,
  menu,
  categories,
  tags,
  ratings,
  delivery_time,
  onboarding_screens,
  hamburger,
  myCart,
  myCard,
  allCards,
  carousel,
};

export default data;
