import {useInfiniteQuery, useQuery} from '@tanstack/react-query';
import {
  fetchAllShops,
  fetchPolpularShop,
  fetchSearchResults,
} from '../services/restaurant.service';
import {FOOD_DATA} from './useFoodModel';

export const useShopModel = () => {
  console.log('useShopModel');
  const getShopByIdModel = (_shopId: string) => {
    return DATA;
  };

  const useGetShopNearBy = () => {
    const result = useInfiniteQuery({
      queryKey: ['shopNearBy'],
      queryFn: fetchAllShops,
      getNextPageParam: (_lastPage, allPage) => {
        return allPage.length + 1;
      },
    });
    return result;
  };

  const useGetPopularShop = () => {
    const result = useInfiniteQuery({
      queryKey: ['shopPopular'],
      queryFn: fetchPolpularShop,
      getNextPageParam: (_lastPage, allPage) => {
        return allPage.length + 1;
      },
    });
    return result;
  };

  const useSeachShopByName = (keyword: string) => {
    const result = useQuery({
      queryKey: ['search', keyword],
      queryFn: async () => {
        const data = await fetchSearchResults(keyword);
        return data;
      },
      enabled: !!keyword,
    });

    return result;
  };

  return {
    getShopByIdModel,
    useGetPopularShop,
    useGetShopNearBy,
    useSeachShopByName,
  };
};

const DATA = {
  hightLight: [
    FOOD_DATA[0],
    FOOD_DATA[1],
    FOOD_DATA[2],
    FOOD_DATA[3],
    // {
    //   id: nanoid(),
    //   name: 'Cơm dương châu đùi mắm tỏi',
    //   price: 69000,
    //   description: 'Bao gồm: hộp, muỗng, đũa mang về',
    //   image:
    //     'https://images.foody.vn/res/g2/11349/s460x300/2a4778de-db37-4a23-9315-468e514a-8adc8f7d-201109124532.jpeg',
    // },
    // {
    //   id: nanoid(),
    //   name: 'Cơm gà hấp muối',
    //   price: 55000,
    //   description: 'Bao gồm: hộp, muỗng, đũa mang về',
    //   image:
    //     'https://images.foody.vn/res/g2/11349/s400x400/10fd85e2-4bbf-4d7c-862b-7563022c-cd365cde-201109124621.jpeg',
    // },
    // {
    //   id: nanoid(),
    //   name: 'Cơm gà chiên mắm tỏi',
    //   price: 55000,
    //   description: 'Bao gồm: hộp, muỗng, đũa mang về',

    //   image:
    //     'https://images.foody.vn/res/g2/11349/s400x400/ef94ceab-cd98-4ee9-af03-a6febffe-deaad5dd-201109124708.jpeg',
    // },
    // {
    //   id: nanoid(),
    //   name: 'Cơm gà xối mỡ',
    //   price: 55000,
    //   description: 'Bao gồm: hộp, muỗng, đũa mang về',
    //   image:
    //     'https://images.foody.vn/res/g2/11349/s400x400/ef94ceab-cd98-4ee9-af03-a6febffe-deaad5dd-201109124708.jpeg',
    // },
  ],

  // options: [
  //   {
  //     title: 'Size',
  //     optionGroup: [
  //       {option: 'Lớn', price: 5000},
  //       {option: 'Nhỏ', price: 0},
  //     ],
  //   },
  //   {
  //     title: 'Chọn sốt',
  //     optionGroup: [
  //       {option: 'Sốt mayonnaise', price: 0},
  //       {option: 'Sốt bò', price: 0},
  //     ],
  //   },
  //   {
  //     title: 'Chọn độ cay',
  //     optionGroup: [
  //       {option: 'Không cay', price: 2000},
  //       {option: 'Cay ít', price: 0},
  //       {option: 'Siêu cay', price: 0},
  //     ],
  //   },
  // ],

  // topping: {
  //   title: 'Topping',
  //   maximum: 5,
  //   data: [
  //     {
  //       name: 'Sốt bò',
  //       price: 7000,
  //     },
  //     {
  //       name: 'Sốt bò không cay',
  //       price: 7000,
  //     },
  //     {
  //       name: 'Sốt bơ cay',
  //       price: 7000,
  //     },
  //     {
  //       name: 'Muối tôm Tây Ninh (hũ sốt)',
  //       price: 7000,
  //     },
  //     {
  //       name: 'Trứng cút (3 trứng)',
  //       price: 7000,
  //     },
  //   ],
  // },

  data: [
    {
      label: 'Khuyến mãi',
      data: FOOD_DATA.slice(4),
      // data: [
      //   {
      //     name: 'Bún bò - chả',
      //     id: nanoid(),
      //     description: 'Bao gồm: hộp, muỗng, đũa mang về',
      //     price: 31000,
      //     image:
      //       'https://images.foody.vn/res/g2/11349/prof/s408x200/image-3111762a-200910114155.jpeg',
      //   },
      //   {
      //     name: 'Bún bò - chả',
      //     id: nanoid(),
      //     description: 'Bao gồm: hộp, muỗng, đũa mang về',
      //     price: 31000,
      //     image:
      //       'https://images.foody.vn/res/g2/11349/prof/s408x200/image-3111762a-200910114155.jpeg',
      //   },
      //   {
      //     name: 'Bún bò - chả',
      //     id: nanoid(),
      //     description: 'Bao gồm: hộp, muỗng, đũa mang về',
      //     price: 31000,
      //     image:
      //       'https://images.foody.vn/res/g2/11349/prof/s408x200/image-3111762a-200910114155.jpeg',
      //   },
      //   {
      //     name: 'Bún bò - chả',
      //     id: nanoid(),
      //     description: 'Bao gồm: hộp, muỗng, đũa mang về',
      //     price: 31000,
      //     image:
      //       'https://images.foody.vn/res/g2/11349/prof/s408x200/image-3111762a-200910114155.jpeg',
      //   },
      //   {
      //     name: 'Bún bò - chả',
      //     id: nanoid(),
      //     description: 'Bao gồm: hộp, muỗng, đũa mang về',
      //     price: 31000,
      //     image:
      //       'https://images.foody.vn/res/g2/11349/prof/s408x200/image-3111762a-200910114155.jpeg',
      //   },
      // ],
    },
    {
      label: 'Thực đơn',
      data: FOOD_DATA.slice(4),
      // data: [
      //   {
      //     name: 'Bún bò - chả',
      //     id: nanoid(),
      //     description: 'Bao gồm: hộp, muỗng, đũa mang về',
      //     price: 31000,
      //     image:
      //       'https://images.foody.vn/res/g2/11349/prof/s408x200/image-3111762a-200910114155.jpeg',
      //   },
      //   {
      //     name: 'Bún bò - chả',
      //     id: nanoid(),
      //     description: 'Bao gồm: hộp, muỗng, đũa mang về',
      //     price: 31000,
      //     image:
      //       'https://images.foody.vn/res/g2/11349/prof/s408x200/image-3111762a-200910114155.jpeg',
      //   },
      //   {
      //     name: 'Bún bò - chả',
      //     id: nanoid(),
      //     description: 'Bao gồm: hộp, muỗng, đũa mang về',
      //     price: 31000,
      //     image:
      //       'https://images.foody.vn/res/g2/11349/prof/s408x200/image-3111762a-200910114155.jpeg',
      //   },
      //   {
      //     name: 'Bún bò - chả',
      //     id: nanoid(),
      //     description: 'Bao gồm: hộp, muỗng, đũa mang về',
      //     price: 31000,
      //     image:
      //       'https://images.foody.vn/res/g2/11349/prof/s408x200/image-3111762a-200910114155.jpeg',
      //   },
      //   {
      //     name: 'Bún bò - chả',
      //     id: nanoid(),
      //     description: 'Bao gồm: hộp, muỗng, đũa mang về',
      //     price: 31000,
      //     image:
      //       'https://images.foody.vn/res/g2/11349/prof/s408x200/image-3111762a-200910114155.jpeg',
      //   },
      // ],
    },
    {
      label: 'Chọn thêm',
      data: FOOD_DATA.slice(4),
      // data: [
      //   {
      //     name: 'Bún bò - chả',
      //     id: nanoid(),
      //     description: 'Bao gồm: hộp, muỗng, đũa mang về',
      //     price: 31000,
      //     image:
      //       'https://images.foody.vn/res/g2/11349/prof/s408x200/image-3111762a-200910114155.jpeg',
      //   },
      //   {
      //     name: 'Bún bò - chả',
      //     id: nanoid(),
      //     description: 'Bao gồm: hộp, muỗng, đũa mang về',
      //     price: 31000,
      //     image:
      //       'https://images.foody.vn/res/g2/11349/prof/s408x200/image-3111762a-200910114155.jpeg',
      //   },
      //   {
      //     name: 'Bún bò - chả',
      //     id: nanoid(),
      //     description: 'Bao gồm: hộp, muỗng, đũa mang về',
      //     price: 31000,
      //     image:
      //       'https://images.foody.vn/res/g2/11349/prof/s408x200/image-3111762a-200910114155.jpeg',
      //   },
      //   {
      //     name: 'Bún bò - chả',
      //     id: nanoid(),
      //     description: 'Bao gồm: hộp, muỗng, đũa mang về',
      //     price: 31000,
      //     image:
      //       'https://images.foody.vn/res/g2/11349/prof/s408x200/image-3111762a-200910114155.jpeg',
      //   },
      //   {
      //     name: 'Bún bò - chả',
      //     id: nanoid(),
      //     description: 'Bao gồm: hộp, muỗng, đũa mang về',
      //     price: 31000,
      //     image:
      //       'https://images.foody.vn/res/g2/11349/prof/s408x200/image-3111762a-200910114155.jpeg',
      //   },
      // ],
    },
    {
      label: 'Đồ uống',
      data: FOOD_DATA.slice(4),
      // data: [
      //   {
      //     name: 'Bún bò - chả',
      //     id: nanoid(),
      //     description: 'Bao gồm: hộp, muỗng, đũa mang về',
      //     price: 31000,
      //     image:
      //       'https://images.foody.vn/res/g2/11349/prof/s408x200/image-3111762a-200910114155.jpeg',
      //   },
      //   {
      //     name: 'Bún bò - chả',
      //     id: nanoid(),
      //     description: 'Bao gồm: hộp, muỗng, đũa mang về',
      //     price: 31000,
      //     image:
      //       'https://images.foody.vn/res/g2/11349/prof/s408x200/image-3111762a-200910114155.jpeg',
      //   },
      //   {
      //     name: 'Bún bò - chả',
      //     id: nanoid(),
      //     description: 'Bao gồm: hộp, muỗng, đũa mang về',
      //     price: 31000,
      //     image:
      //       'https://images.foody.vn/res/g2/11349/prof/s408x200/image-3111762a-200910114155.jpeg',
      //   },
      //   {
      //     name: 'Bún bò - chả',
      //     id: nanoid(),
      //     description: 'Bao gồm: hộp, muỗng, đũa mang về',
      //     price: 31000,
      //     image:
      //       'https://images.foody.vn/res/g2/11349/prof/s408x200/image-3111762a-200910114155.jpeg',
      //   },
      //   {
      //     name: 'Bún bò - chả',
      //     id: nanoid(),
      //     description: 'Bao gồm: hộp, muỗng, đũa mang về',
      //     price: 31000,
      //     image:
      //       'https://images.foody.vn/res/g2/11349/prof/s408x200/image-3111762a-200910114155.jpeg',
      //   },
      // ],
    },
  ],
};
