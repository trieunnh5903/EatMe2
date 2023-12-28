import {images} from '../config';
import icons from '../config/icons';
import {Feature} from '../types/types';

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

const carousel = [
  {
    id: 1,
    image: require('../assets/images/carousel/245461687_6421584127882936_8616706086375949053_n.jpg'),
  },
  {
    id: 2,
    image: require('../assets/images/carousel/257466827_6591435480897799_200356277778856780_n.jpg'),
  },
  {
    id: 3,
    image: require('../assets/images/carousel/313254607_139801202136523_5989647723442435288_n.jpg'),
  },
  {
    id: 4,
    image: require('../assets/images/carousel/317833643_148515781265065_7105665798406950119_n.jpg'),
  },
  {
    id: 5,
    image: require('../assets/images/carousel/319810799_509128661281138_690691115833937331_n.jpg'),
  },
  {
    id: 6,
    image: require('../assets/images/carousel/334973489_579498870873834_2900974212242390940_n.jpg'),
  },
  {
    id: 7,
    image: require('../assets/images/carousel/364711022_263810839735558_1463842356255445927_n.jpg'),
  },
  {
    id: 8,
    image: require('../assets/images/carousel/366513590_268805935902715_1550787352968725060_n.jpg'),
  },
  {
    id: 9,
    image: require('../assets/images/carousel/369732770_315148754601766_5147059661462710992_n.jpg'),
  },
  {
    id: 10,
    image: require('../assets/images/carousel/380891539_293960340053941_6303199240703349973_n.jpg'),
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
const FOODS_DATA = [
  {
    id: '1a7b8b84-6591-11ee-8c99-0242ac120002',
    name: 'Cơm dương châu đùi mắm tỏi',
    price: 69000,
    description: 'Bao gồm: hộp, muỗng, đũa mang về',
    image:
      'https://images.foody.vn/res/g2/11349/s460x300/2a4778de-db37-4a23-9315-468e514a-8adc8f7d-201109124532.jpeg',
    options: [
      {
        title: 'Size',
        optionGroup: [
          {option: 'Lớn', price: 5000},
          {option: 'Nhỏ', price: 0},
        ],
      },
      {
        title: 'Chọn sốt',
        optionGroup: [
          {option: 'Sốt mayonnaise', price: 0},
          {option: 'Sốt bò', price: 0},
        ],
      },
      {
        title: 'Chọn độ cay',
        optionGroup: [
          {option: 'Không cay', price: 2000},
          {option: 'Cay ít', price: 0},
          {option: 'Siêu cay', price: 0},
        ],
      },
    ],
    toppings: {
      title: 'Topping',
      maximum: 5,
      data: [
        {
          name: 'Sốt bò',
          price: 7000,
        },
        {
          name: 'Sốt bò không cay',
          price: 7000,
        },
        {
          name: 'Sốt bơ cay',
          price: 7000,
        },
        {
          name: 'Muối tôm Tây Ninh (hũ sốt)',
          price: 7000,
        },
        {
          name: 'Trứng cút (3 trứng)',
          price: 7000,
        },
      ],
    },
  },
  {
    id: '2061c8e2-6591-11ee-8c99-0242ac120002',
    name: 'Cơm gà hấp muối',
    price: 55000,
    description: 'Bao gồm: hộp, muỗng, đũa mang về',
    image:
      'https://images.foody.vn/res/g2/11349/s400x400/10fd85e2-4bbf-4d7c-862b-7563022c-cd365cde-201109124621.jpeg',
    options: [
      {
        title: 'Size',
        optionGroup: [
          {option: 'Lớn', price: 5000},
          {option: 'Nhỏ', price: 0},
        ],
      },
      {
        title: 'Chọn sốt',
        optionGroup: [
          {option: 'Sốt mayonnaise', price: 0},
          {option: 'Sốt bò', price: 0},
        ],
      },
      {
        title: 'Chọn độ cay',
        optionGroup: [
          {option: 'Không cay', price: 2000},
          {option: 'Cay ít', price: 0},
          {option: 'Siêu cay', price: 0},
        ],
      },
    ],
    toppings: {
      title: 'Topping',
      maximum: 5,
      data: [
        {
          name: 'Sốt bò',
          price: 7000,
        },
        {
          name: 'Sốt bò không cay',
          price: 7000,
        },
        {
          name: 'Sốt bơ cay',
          price: 7000,
        },
        {
          name: 'Muối tôm Tây Ninh (hũ sốt)',
          price: 7000,
        },
        {
          name: 'Trứng cút (3 trứng)',
          price: 7000,
        },
      ],
    },
  },
  {
    id: '2061c8e2-6591-11ee-8c99-0242ac12000u',
    name: 'Cơm gà chiên mắm tỏi',
    price: 55000,
    description: 'Bao gồm: hộp, muỗng, đũa mang về',

    image:
      'https://images.foody.vn/res/g2/11349/s400x400/ef94ceab-cd98-4ee9-af03-a6febffe-deaad5dd-201109124708.jpeg',
    options: [
      {
        title: 'Size',
        optionGroup: [
          {option: 'Lớn', price: 5000},
          {option: 'Nhỏ', price: 0},
        ],
      },
      {
        title: 'Chọn sốt',
        optionGroup: [
          {option: 'Sốt mayonnaise', price: 0},
          {option: 'Sốt bò', price: 0},
        ],
      },
      {
        title: 'Chọn độ cay',
        optionGroup: [
          {option: 'Không cay', price: 2000},
          {option: 'Cay ít', price: 0},
          {option: 'Siêu cay', price: 0},
        ],
      },
    ],
    toppings: {
      title: 'Topping',
      maximum: 5,
      data: [
        {
          name: 'Sốt bò',
          price: 7000,
        },
        {
          name: 'Sốt bò không cay',
          price: 7000,
        },
        {
          name: 'Sốt bơ cay',
          price: 7000,
        },
        {
          name: 'Muối tôm Tây Ninh (hũ sốt)',
          price: 7000,
        },
        {
          name: 'Trứng cút (3 trứng)',
          price: 7000,
        },
      ],
    },
  },
  {
    id: '27720890-6591-11ee-8c99-0242ac120002',
    name: 'Cơm gà xối mỡ',
    price: 55000,
    description: 'Bao gồm: hộp, muỗng, đũa mang về',
    image:
      'https://images.foody.vn/res/g2/11349/s400x400/ef94ceab-cd98-4ee9-af03-a6febffe-deaad5dd-201109124708.jpeg',
    options: [
      {
        title: 'Size',
        optionGroup: [
          {option: 'Lớn', price: 5000},
          {option: 'Nhỏ', price: 0},
        ],
      },
      {
        title: 'Chọn sốt',
        optionGroup: [
          {option: 'Sốt mayonnaise', price: 0},
          {option: 'Sốt bò', price: 0},
        ],
      },
      {
        title: 'Chọn độ cay',
        optionGroup: [
          {option: 'Không cay', price: 2000},
          {option: 'Cay ít', price: 0},
          {option: 'Siêu cay', price: 0},
        ],
      },
    ],
    toppings: {
      title: 'Topping',
      maximum: 5,
      data: [
        {
          name: 'Sốt bò',
          price: 7000,
        },
        {
          name: 'Sốt bò không cay',
          price: 7000,
        },
        {
          name: 'Sốt bơ cay',
          price: 7000,
        },
        {
          name: 'Muối tôm Tây Ninh (hũ sốt)',
          price: 7000,
        },
        {
          name: 'Trứng cút (3 trứng)',
          price: 7000,
        },
      ],
    },
  },
  {
    name: 'Bún bò - chả 1',
    id: '2db8c6e4-6591-11ee-8c99-0242ac120002',
    description: 'Bao gồm: hộp, muỗng, đũa mang về',
    price: 31000,
    image:
      'https://images.foody.vn/res/g2/11349/prof/s408x200/image-3111762a-200910114155.jpeg',
    options: [
      {
        title: 'Size',
        optionGroup: [
          {option: 'Lớn', price: 5000},
          {option: 'Nhỏ', price: 0},
        ],
      },
      {
        title: 'Chọn sốt',
        optionGroup: [
          {option: 'Sốt mayonnaise', price: 0},
          {option: 'Sốt bò', price: 0},
        ],
      },
      {
        title: 'Chọn độ cay',
        optionGroup: [
          {option: 'Không cay', price: 2000},
          {option: 'Cay ít', price: 0},
          {option: 'Siêu cay', price: 0},
        ],
      },
    ],
    toppings: {
      title: 'Topping',
      maximum: 5,
      data: [
        {
          name: 'Sốt bò',
          price: 7000,
        },
        {
          name: 'Sốt bò không cay',
          price: 7000,
        },
        {
          name: 'Sốt bơ cay',
          price: 7000,
        },
        {
          name: 'Muối tôm Tây Ninh (hũ sốt)',
          price: 7000,
        },
        {
          name: 'Trứng cút (3 trứng)',
          price: 7000,
        },
      ],
    },
  },
  {
    name: 'Bún bò - chả 2',
    id: '34eb8474-6591-11ee-8c99-0242ac120002',
    description: 'Bao gồm: hộp, muỗng, đũa mang về',
    price: 31000,
    image:
      'https://images.foody.vn/res/g2/11349/prof/s408x200/image-3111762a-200910114155.jpeg',
    options: [
      {
        title: 'Size',
        optionGroup: [
          {option: 'Lớn', price: 5000},
          {option: 'Nhỏ', price: 0},
        ],
      },
      {
        title: 'Chọn sốt',
        optionGroup: [
          {option: 'Sốt mayonnaise', price: 0},
          {option: 'Sốt bò', price: 0},
        ],
      },
      {
        title: 'Chọn độ cay',
        optionGroup: [
          {option: 'Không cay', price: 2000},
          {option: 'Cay ít', price: 0},
          {option: 'Siêu cay', price: 0},
        ],
      },
    ],
    toppings: {
      title: 'Topping',
      maximum: 5,
      data: [
        {
          name: 'Sốt bò',
          price: 7000,
        },
        {
          name: 'Sốt bò không cay',
          price: 7000,
        },
        {
          name: 'Sốt bơ cay',
          price: 7000,
        },
        {
          name: 'Muối tôm Tây Ninh (hũ sốt)',
          price: 7000,
        },
        {
          name: 'Trứng cút (3 trứng)',
          price: 7000,
        },
      ],
    },
  },
  {
    name: 'Bún bò - chả 3',
    id: '3b47a1ea-6591-11ee-8c99-0242ac120002',
    description: 'Bao gồm: hộp, muỗng, đũa mang về',
    price: 31000,
    image:
      'https://images.foody.vn/res/g2/11349/prof/s408x200/image-3111762a-200910114155.jpeg',
    options: [
      {
        title: 'Size',
        optionGroup: [
          {option: 'Lớn', price: 5000},
          {option: 'Nhỏ', price: 0},
        ],
      },
      {
        title: 'Chọn sốt',
        optionGroup: [
          {option: 'Sốt mayonnaise', price: 0},
          {option: 'Sốt bò', price: 0},
        ],
      },
      {
        title: 'Chọn độ cay',
        optionGroup: [
          {option: 'Không cay', price: 2000},
          {option: 'Cay ít', price: 0},
          {option: 'Siêu cay', price: 0},
        ],
      },
    ],
    toppings: {
      title: 'Topping',
      maximum: 5,
      data: [
        {
          name: 'Sốt bò',
          price: 7000,
        },
        {
          name: 'Sốt bò không cay',
          price: 7000,
        },
        {
          name: 'Sốt bơ cay',
          price: 7000,
        },
        {
          name: 'Muối tôm Tây Ninh (hũ sốt)',
          price: 7000,
        },
        {
          name: 'Trứng cút (3 trứng)',
          price: 7000,
        },
      ],
    },
  },
  {
    name: 'Bún bò - chả 4',
    id: '4139fbac-6591-11ee-8c99-0242ac120002',
    description: 'Bao gồm: hộp, muỗng, đũa mang về',
    price: 31000,
    image:
      'https://images.foody.vn/res/g2/11349/prof/s408x200/image-3111762a-200910114155.jpeg',
    options: [
      {
        title: 'Size',
        optionGroup: [
          {option: 'Lớn', price: 5000},
          {option: 'Nhỏ', price: 0},
        ],
      },
      {
        title: 'Chọn sốt',
        optionGroup: [
          {option: 'Sốt mayonnaise', price: 0},
          {option: 'Sốt bò', price: 0},
        ],
      },
      {
        title: 'Chọn độ cay',
        optionGroup: [
          {option: 'Không cay', price: 2000},
          {option: 'Cay ít', price: 0},
          {option: 'Siêu cay', price: 0},
        ],
      },
    ],
    toppings: {
      title: 'Topping',
      maximum: 5,
      data: [
        {
          name: 'Sốt bò',
          price: 7000,
        },
        {
          name: 'Sốt bò không cay',
          price: 7000,
        },
        {
          name: 'Sốt bơ cay',
          price: 7000,
        },
        {
          name: 'Muối tôm Tây Ninh (hũ sốt)',
          price: 7000,
        },
        {
          name: 'Trứng cút (3 trứng)',
          price: 7000,
        },
      ],
    },
  },
  {
    name: 'Bún bò - chả 5',
    id: '45a92334-6591-11ee-8c99-0242ac120002',
    description: 'Bao gồm: hộp, muỗng, đũa mang về',
    price: 31000,
    image:
      'https://images.foody.vn/res/g2/11349/prof/s408x200/image-3111762a-200910114155.jpeg',
    options: [
      {
        title: 'Size',
        optionGroup: [
          {option: 'Lớn', price: 5000},
          {option: 'Nhỏ', price: 0},
        ],
      },
      {
        title: 'Chọn sốt',
        optionGroup: [
          {option: 'Sốt mayonnaise', price: 0},
          {option: 'Sốt bò', price: 0},
        ],
      },
      {
        title: 'Chọn độ cay',
        optionGroup: [
          {option: 'Không cay', price: 2000},
          {option: 'Cay ít', price: 0},
          {option: 'Siêu cay', price: 0},
        ],
      },
    ],
    toppings: {
      title: 'Topping',
      maximum: 5,
      data: [
        {
          name: 'Sốt bò',
          price: 7000,
        },
        {
          name: 'Sốt bò không cay',
          price: 7000,
        },
        {
          name: 'Sốt bơ cay',
          price: 7000,
        },
        {
          name: 'Muối tôm Tây Ninh (hũ sốt)',
          price: 7000,
        },
        {
          name: 'Trứng cút (3 trứng)',
          price: 7000,
        },
      ],
    },
  },
  {
    name: 'Bún bò - chả 6',
    id: '81362aaa-6591-11ee-8c99-0242ac120002',
    description: 'Bao gồm: hộp, muỗng, đũa mang về',
    price: 31000,
    image:
      'https://images.foody.vn/res/g2/11349/prof/s408x200/image-3111762a-200910114155.jpeg',
    options: [
      {
        title: 'Size',
        optionGroup: [
          {option: 'Lớn', price: 5000},
          {option: 'Nhỏ', price: 0},
        ],
      },
      {
        title: 'Chọn sốt',
        optionGroup: [
          {option: 'Sốt mayonnaise', price: 0},
          {option: 'Sốt bò', price: 0},
        ],
      },
      {
        title: 'Chọn độ cay',
        optionGroup: [
          {option: 'Không cay', price: 2000},
          {option: 'Cay ít', price: 0},
          {option: 'Siêu cay', price: 0},
        ],
      },
    ],
    toppings: {
      title: 'Topping',
      maximum: 5,
      data: [
        {
          name: 'Sốt bò',
          price: 7000,
        },
        {
          name: 'Sốt bò không cay',
          price: 7000,
        },
        {
          name: 'Sốt bơ cay',
          price: 7000,
        },
        {
          name: 'Muối tôm Tây Ninh (hũ sốt)',
          price: 7000,
        },
        {
          name: 'Trứng cút (3 trứng)',
          price: 7000,
        },
      ],
    },
  },
  {
    name: 'Bún bò - chả 7',
    id: '86cd3918-6591-11ee-8c99-0242ac120002',
    description: 'Bao gồm: hộp, muỗng, đũa mang về',
    price: 31000,
    image:
      'https://images.foody.vn/res/g2/11349/prof/s408x200/image-3111762a-200910114155.jpeg',
    options: [
      {
        title: 'Size',
        optionGroup: [
          {option: 'Lớn', price: 5000},
          {option: 'Nhỏ', price: 0},
        ],
      },
      {
        title: 'Chọn sốt',
        optionGroup: [
          {option: 'Sốt mayonnaise', price: 0},
          {option: 'Sốt bò', price: 0},
        ],
      },
      {
        title: 'Chọn độ cay',
        optionGroup: [
          {option: 'Không cay', price: 2000},
          {option: 'Cay ít', price: 0},
          {option: 'Siêu cay', price: 0},
        ],
      },
    ],
    toppings: {
      title: 'Topping',
      maximum: 5,
      data: [
        {
          name: 'Sốt bò',
          price: 7000,
        },
        {
          name: 'Sốt bò không cay',
          price: 7000,
        },
        {
          name: 'Sốt bơ cay',
          price: 7000,
        },
        {
          name: 'Muối tôm Tây Ninh (hũ sốt)',
          price: 7000,
        },
        {
          name: 'Trứng cút (3 trứng)',
          price: 7000,
        },
      ],
    },
  },
  {
    name: 'Bún bò - chả 8',
    id: '8bb25012-6591-11ee-8c99-0242ac120002',
    description: 'Bao gồm: hộp, muỗng, đũa mang về',
    price: 31000,
    image:
      'https://images.foody.vn/res/g2/11349/prof/s408x200/image-3111762a-200910114155.jpeg',
    options: [
      {
        title: 'Size',
        optionGroup: [
          {option: 'Lớn', price: 5000},
          {option: 'Nhỏ', price: 0},
        ],
      },
      {
        title: 'Chọn sốt',
        optionGroup: [
          {option: 'Sốt mayonnaise', price: 0},
          {option: 'Sốt bò', price: 0},
        ],
      },
      {
        title: 'Chọn độ cay',
        optionGroup: [
          {option: 'Không cay', price: 2000},
          {option: 'Cay ít', price: 0},
          {option: 'Siêu cay', price: 0},
        ],
      },
    ],
    toppings: {
      title: 'Topping',
      maximum: 5,
      data: [
        {
          name: 'Sốt bò',
          price: 7000,
        },
        {
          name: 'Sốt bò không cay',
          price: 7000,
        },
        {
          name: 'Sốt bơ cay',
          price: 7000,
        },
        {
          name: 'Muối tôm Tây Ninh (hũ sốt)',
          price: 7000,
        },
        {
          name: 'Trứng cút (3 trứng)',
          price: 7000,
        },
      ],
    },
  },
  {
    name: 'Bún bò - chả 9',
    id: '904ddfa6-6591-11ee-8c99-0242ac120002',
    description: 'Bao gồm: hộp, muỗng, đũa mang về',
    price: 31000,
    image:
      'https://images.foody.vn/res/g2/11349/prof/s408x200/image-3111762a-200910114155.jpeg',
    options: [
      {
        title: 'Size',
        optionGroup: [
          {option: 'Lớn', price: 5000},
          {option: 'Nhỏ', price: 0},
        ],
      },
      {
        title: 'Chọn sốt',
        optionGroup: [
          {option: 'Sốt mayonnaise', price: 0},
          {option: 'Sốt bò', price: 0},
        ],
      },
      {
        title: 'Chọn độ cay',
        optionGroup: [
          {option: 'Không cay', price: 2000},
          {option: 'Cay ít', price: 0},
          {option: 'Siêu cay', price: 0},
        ],
      },
    ],
    toppings: {
      title: 'Topping',
      maximum: 5,
      data: [
        {
          name: 'Sốt bò',
          price: 7000,
        },
        {
          name: 'Sốt bò không cay',
          price: 7000,
        },
        {
          name: 'Sốt bơ cay',
          price: 7000,
        },
        {
          name: 'Muối tôm Tây Ninh (hũ sốt)',
          price: 7000,
        },
        {
          name: 'Trứng cút (3 trứng)',
          price: 7000,
        },
      ],
    },
  },
];

const popularRestaurant = [
  {
    id: '97b27cbe-658e-11ee-8c99-0242ac120002',
    name: 'Cơm Gà Xối Mỡ 142 - Ba Đình',
    address: '142 Ba Đình, P. 10, Quận 8, TP. HCM',
    image:
      'https://images.foody.vn/res/g2/11349/prof/s408x200/image-3111762a-200910114155.jpeg',
    allFoods: {
      bestSeller: [FOODS_DATA[0], FOODS_DATA[1], FOODS_DATA[2], FOODS_DATA[3]],
      menuFoods: [
        {
          label: 'Khuyến mãi',
          foods: FOODS_DATA.slice(4),
        },
        {
          label: 'Thực đơn',
          foods: FOODS_DATA.slice(4),
        },
        {
          label: 'Chọn thêm',
          foods: FOODS_DATA.slice(4),
        },
        {
          label: 'Đồ uống',
          foods: FOODS_DATA.slice(4),
        },
      ],
    },
  },
  {
    id: 'b086e31a-658e-11ee-8c99-0242ac120002',
    name: 'Tiên Tiên - Bún Thái Cay - Phan Văn Trị',
    address: '317B Phan Văn Trị, P. 2, Quận 5, TP. HCM',
    image:
      'https://images.foody.vn/res/g97/963183/prof/s480x300/image-f472b1f5-200910114135.jpeg',
    allFoods: {
      bestSeller: [FOODS_DATA[0], FOODS_DATA[1], FOODS_DATA[2], FOODS_DATA[3]],
      menuFoods: [
        {
          label: 'Khuyến mãi',
          foods: FOODS_DATA.slice(4),
        },
        {
          label: 'Thực đơn',
          foods: FOODS_DATA.slice(4),
        },
        {
          label: 'Chọn thêm',
          foods: FOODS_DATA.slice(4),
        },
        {
          label: 'Đồ uống',
          foods: FOODS_DATA.slice(4),
        },
      ],
    },
  },
  {
    id: 'b8319f74-658e-11ee-8c99-0242ac120002',
    name: 'Bún Bò Đất Thánh - Shop Online',
    address: '221/16 Đất Thánh, P. 6, Tân Bình, TP. HCM',
    image:
      'https://images.foody.vn/res/g103/1020115/prof/s460x300/foody-upload-api-foody-mobile-hmzz-200421103141.jpg',
    allFoods: {
      bestSeller: [FOODS_DATA[0], FOODS_DATA[1], FOODS_DATA[2], FOODS_DATA[3]],
      menuFoods: [
        {
          label: 'Khuyến mãi',
          foods: FOODS_DATA.slice(4),
        },
        {
          label: 'Thực đơn',
          foods: FOODS_DATA.slice(4),
        },
        {
          label: 'Chọn thêm',
          foods: FOODS_DATA.slice(4),
        },
        {
          label: 'Đồ uống',
          foods: FOODS_DATA.slice(4),
        },
      ],
    },
  },
  {
    id: 'c29ad052-658e-11ee-8c99-0242ac120002',
    name: 'Tocotoco - Chung Cư Richstar - 278 Hòa Bình',
    address: 'Chung Cư Richstar, 278 Hòa Bình, P. Hiệp Tân, Tân Phú, TP. HCM',
    image:
      'https://images.foody.vn/res/g96/956871/prof/s460x300/foody-upload-api-foody-mobile-toco-toco-191008095032.jpg',
    allFoods: {
      bestSeller: [FOODS_DATA[0], FOODS_DATA[1], FOODS_DATA[2], FOODS_DATA[3]],
      menuFoods: [
        {
          label: 'Khuyến mãi',
          foods: FOODS_DATA.slice(4),
        },
        {
          label: 'Thực đơn',
          foods: FOODS_DATA.slice(4),
        },
        {
          label: 'Chọn thêm',
          foods: FOODS_DATA.slice(4),
        },
        {
          label: 'Đồ uống',
          foods: FOODS_DATA.slice(4),
        },
      ],
    },
  },
  {
    id: 'cb626114-658e-11ee-8c99-0242ac120002',
    name: 'TocoToco Bubble Tea - Lê Văn Việt',
    address: '84 Lê Văn Việt, P. Hiệp Phú, Thành Phố Thủ Đức, TP. HCM',
    image:
      'https://images.foody.vn/res/g81/801344/prof/s640x400/image-9c40a4fe-210113164540.jpeg',
    allFoods: {
      bestSeller: [FOODS_DATA[0], FOODS_DATA[1], FOODS_DATA[2], FOODS_DATA[3]],
      menuFoods: [
        {
          label: 'Khuyến mãi',
          foods: FOODS_DATA.slice(4),
        },
        {
          label: 'Thực đơn',
          foods: FOODS_DATA.slice(4),
        },
        {
          label: 'Chọn thêm',
          foods: FOODS_DATA.slice(4),
        },
        {
          label: 'Đồ uống',
          foods: FOODS_DATA.slice(4),
        },
      ],
    },
  },
  {
    id: 'd42e99b6-658e-11ee-8c99-0242ac120002',
    name: 'Gà Ta Tường Vy - Cơm Gà, Cháo & Gỏi Gà - Nguyễn Văn Quá',
    allFoods: {
      bestSeller: [FOODS_DATA[0], FOODS_DATA[1], FOODS_DATA[2], FOODS_DATA[3]],
      menuFoods: [
        {
          label: 'Khuyến mãi',
          foods: FOODS_DATA.slice(4),
        },
        {
          label: 'Thực đơn',
          foods: FOODS_DATA.slice(4),
        },
        {
          label: 'Chọn thêm',
          foods: FOODS_DATA.slice(4),
        },
        {
          label: 'Đồ uống',
          foods: FOODS_DATA.slice(4),
        },
      ],
    },
    address: '661 Nguyễn Văn Quá, P. Đông Hưng Thuận, Quận 12, TP. HCM',
    image:
      'https://images.foody.vn/res/g81/801344/prof/s460x300/image-9c40a4fe-210113164540.jpeg',
  },
  {
    id: 'da7ca5c4-658e-11ee-8c99-0242ac120002',
    name: 'Anh Cường Bakery - Bánh Cua Phô Mai - Nguyễn Văn Lạc',
    allFoods: {
      bestSeller: [FOODS_DATA[0], FOODS_DATA[1], FOODS_DATA[2], FOODS_DATA[3]],
      menuFoods: [
        {
          label: 'Khuyến mãi',
          foods: FOODS_DATA.slice(4),
        },
        {
          label: 'Thực đơn',
          foods: FOODS_DATA.slice(4),
        },
        {
          label: 'Chọn thêm',
          foods: FOODS_DATA.slice(4),
        },
        {
          label: 'Đồ uống',
          foods: FOODS_DATA.slice(4),
        },
      ],
    },
    address: '32 Nguyễn Văn Lạc, P. 19, Bình Thạnh, TP. HCM',
    image:
      'https://images.foody.vn/res/g79/781832/prof/s460x300/foody-upload-api-foody-mobile-banhkembap1-jpg-181002153458.jpg',
  },
  {
    id: 'dfd61104-658e-11ee-8c99-0242ac120002',
    name: 'Tâm Ký II - Cơm Chiên & Nui Xào - Đường 50',
    allFoods: {
      bestSeller: [FOODS_DATA[0], FOODS_DATA[1], FOODS_DATA[2], FOODS_DATA[3]],
      menuFoods: [
        {
          label: 'Khuyến mãi',
          foods: FOODS_DATA.slice(4),
        },
        {
          label: 'Thực đơn',
          foods: FOODS_DATA.slice(4),
        },
        {
          label: 'Chọn thêm',
          foods: FOODS_DATA.slice(4),
        },
        {
          label: 'Đồ uống',
          foods: FOODS_DATA.slice(4),
        },
      ],
    },
    address: '10 Đường số 50, P. 5, Quận 4, Quận 4, TP. HCM',
    image:
      'https://images.foody.vn/res/g117/1163333/prof/s460x300/foody-upload-api-foody-mobile-ta-f8e92a47-230304194500.jpeg',
  },
  {
    id: 'e53760ee-658e-11ee-8c99-0242ac120002',
    name: 'Zangzang Food - Gà Tươi Ủ Muối Cầu Kỳ',
    allFoods: {
      bestSeller: [FOODS_DATA[0], FOODS_DATA[1], FOODS_DATA[2], FOODS_DATA[3]],
      menuFoods: [
        {
          label: 'Khuyến mãi',
          foods: FOODS_DATA.slice(4),
        },
        {
          label: 'Thực đơn',
          foods: FOODS_DATA.slice(4),
        },
        {
          label: 'Chọn thêm',
          foods: FOODS_DATA.slice(4),
        },
        {
          label: 'Đồ uống',
          foods: FOODS_DATA.slice(4),
        },
      ],
    },
    address: '226 Lê Đức Thọ, P. 6, Gò Vấp, TP. HCM',
    image:
      'https://images.foody.vn/res/g117/1163373/prof/s460x300/foody-upload-api-foody-mobile-fi-365302c3-230320112903.jpeg',
  },
  {
    id: 'ea8848ba-658e-11ee-8c99-0242ac120002',
    name: 'Mì Trộn Park Kim Thang - Phạm Văn Đồng',
    allFoods: {
      bestSeller: [FOODS_DATA[0], FOODS_DATA[1], FOODS_DATA[2], FOODS_DATA[3]],
      menuFoods: [
        {
          label: 'Khuyến mãi',
          foods: FOODS_DATA.slice(4),
        },
        {
          label: 'Thực đơn',
          foods: FOODS_DATA.slice(4),
        },
        {
          label: 'Chọn thêm',
          foods: FOODS_DATA.slice(4),
        },
        {
          label: 'Đồ uống',
          foods: FOODS_DATA.slice(4),
        },
      ],
    },
    address: '259 Phạm Văn Đồng, P.1, Gò Vấp, TP. HCM',
    image:
      'https://images.foody.vn/res/g108/1076096/prof/s460x300/foody-upload-api-foody-mobile-36-e6f8587b-230729083030.jpeg',
  },
];

const featureCategory: Feature[] = [
  {
    id: '1',
    title: 'Quán mới khao đến 50%',
    subtitle: 'Tổng hợp quán mới đang khao nóng dòn',
    restaurants: popularRestaurant,
  },
  {
    id: '2',
    title: 'Deal đa tầng - khao nước xịn đến 90K',
    restaurants: popularRestaurant,
    subtitle: 'Áp dụng từ 2 voucher mỗi đơn',
  },
  {
    id: '3',
    title: 'Deal đa tầng - khao ăn ngon đến 90K',
    restaurants: popularRestaurant,
    subtitle: 'Áp dụng từ 2 voucher mỗi đơn',
  },
];

const dummy_data = {
  featureCategory,
  mostSrearched,
  myProfile,
  categories,
  onboarding_screens,
  popularRestaurant,
  carousel,
};

export default dummy_data;
