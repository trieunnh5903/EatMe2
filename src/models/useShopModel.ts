import {nanoid} from '@reduxjs/toolkit';

const useShopModel = () => {
  return DATA;
};
export default useShopModel;

const DATA = {
  hightLight: [
    {
      id: nanoid(),
      name: 'Zangzang Food - Gà Tươi Ủ Muối Cầu Kỳ',
      price: 20000,
      description: '226 Lê Đức Thọ, P. 6, Gò Vấp, TP. HCM',
      image:
        'https://images.foody.vn/res/g117/1163373/prof/s460x300/foody-upload-api-foody-mobile-fi-365302c3-230320112903.jpeg',
    },
    {
      id: nanoid(),
      name: 'Mì Trộn Park Kim Thang - Phạm Văn Đồng',
      price: 20000,
      description: '259 Phạm Văn Đồng, P.1, Gò Vấp, TP. HCM',
      image:
        'https://images.foody.vn/res/g108/1076096/prof/s460x300/foody-upload-api-foody-mobile-36-e6f8587b-230729083030.jpeg',
    },
    {
      id: nanoid(),
      name: 'Bún Thịt Nướng Dì 7 & Cơm Tấm, Lẩu - Khu Phố 2A',
      price: 20000,
      description:
        '1779/21/6 Khu Phố 2A, Quốc Lộ 1A, P. Tân Thới Hiệp, Quận 12, TP. HCM',
      image:
        'https://images.foody.vn/res/g105/1043305/prof/s480x300/foody-upload-api-foody-mobile-89039049_10754428753-200820145636.jpg',
    },
    {
      id: nanoid(),
      name: 'Thành Đạt - Hủ Tiếu Nam Vang - 22C Nguyễn Hữu Cầu',
      price: 20000,
      description: 'Thành Đạt - Hủ Tiếu Nam Vang - 22C Nguyễn Hữu Cầu',
      image:
        'https://images.foody.vn/res/g112/1114707/prof/s460x300/foody-upload-api-foody-mobile-un-de857048-211105141117.jpeg',
    },
  ],

  data: [
    {
      label: 'Khuyến mãi',
      data: [
        {
          name: 'Bún bò - chả',
          id: nanoid(),
          description: 'Bao gồm: hộp, muỗng, đũa mang về',
          price: 31000,
          image:
            'https://images.foody.vn/res/g2/11349/prof/s408x200/image-3111762a-200910114155.jpeg',
        },
        {
          name: 'Bún bò - chả',
          id: nanoid(),
          description: 'Bao gồm: hộp, muỗng, đũa mang về',
          price: 31000,
          image:
            'https://images.foody.vn/res/g2/11349/prof/s408x200/image-3111762a-200910114155.jpeg',
        },
        {
          name: 'Bún bò - chả',
          id: nanoid(),
          description: 'Bao gồm: hộp, muỗng, đũa mang về',
          price: 31000,
          image:
            'https://images.foody.vn/res/g2/11349/prof/s408x200/image-3111762a-200910114155.jpeg',
        },
        {
          name: 'Bún bò - chả',
          id: nanoid(),
          description: 'Bao gồm: hộp, muỗng, đũa mang về',
          price: 31000,
          image:
            'https://images.foody.vn/res/g2/11349/prof/s408x200/image-3111762a-200910114155.jpeg',
        },
        {
          name: 'Bún bò - chả',
          id: nanoid(),
          description: 'Bao gồm: hộp, muỗng, đũa mang về',
          price: 31000,
          image:
            'https://images.foody.vn/res/g2/11349/prof/s408x200/image-3111762a-200910114155.jpeg',
        },
      ],
    },
    {
      label: 'Thực đơn',
      data: [
        {
          name: 'Bún bò - chả',
          id: nanoid(),
          description: 'Bao gồm: hộp, muỗng, đũa mang về',
          price: 31000,
          image:
            'https://images.foody.vn/res/g2/11349/prof/s408x200/image-3111762a-200910114155.jpeg',
        },
        {
          name: 'Bún bò - chả',
          id: nanoid(),
          description: 'Bao gồm: hộp, muỗng, đũa mang về',
          price: 31000,
          image:
            'https://images.foody.vn/res/g2/11349/prof/s408x200/image-3111762a-200910114155.jpeg',
        },
        {
          name: 'Bún bò - chả',
          id: nanoid(),
          description: 'Bao gồm: hộp, muỗng, đũa mang về',
          price: 31000,
          image:
            'https://images.foody.vn/res/g2/11349/prof/s408x200/image-3111762a-200910114155.jpeg',
        },
        {
          name: 'Bún bò - chả',
          id: nanoid(),
          description: 'Bao gồm: hộp, muỗng, đũa mang về',
          price: 31000,
          image:
            'https://images.foody.vn/res/g2/11349/prof/s408x200/image-3111762a-200910114155.jpeg',
        },
        {
          name: 'Bún bò - chả',
          id: nanoid(),
          description: 'Bao gồm: hộp, muỗng, đũa mang về',
          price: 31000,
          image:
            'https://images.foody.vn/res/g2/11349/prof/s408x200/image-3111762a-200910114155.jpeg',
        },
      ],
    },
    {
      label: 'Chọn thêm',
      data: [
        {
          name: 'Bún bò - chả',
          id: nanoid(),
          description: 'Bao gồm: hộp, muỗng, đũa mang về',
          price: 31000,
          image:
            'https://images.foody.vn/res/g2/11349/prof/s408x200/image-3111762a-200910114155.jpeg',
        },
        {
          name: 'Bún bò - chả',
          id: nanoid(),
          description: 'Bao gồm: hộp, muỗng, đũa mang về',
          price: 31000,
          image:
            'https://images.foody.vn/res/g2/11349/prof/s408x200/image-3111762a-200910114155.jpeg',
        },
        {
          name: 'Bún bò - chả',
          id: nanoid(),
          description: 'Bao gồm: hộp, muỗng, đũa mang về',
          price: 31000,
          image:
            'https://images.foody.vn/res/g2/11349/prof/s408x200/image-3111762a-200910114155.jpeg',
        },
        {
          name: 'Bún bò - chả',
          id: nanoid(),
          description: 'Bao gồm: hộp, muỗng, đũa mang về',
          price: 31000,
          image:
            'https://images.foody.vn/res/g2/11349/prof/s408x200/image-3111762a-200910114155.jpeg',
        },
        {
          name: 'Bún bò - chả',
          id: nanoid(),
          description: 'Bao gồm: hộp, muỗng, đũa mang về',
          price: 31000,
          image:
            'https://images.foody.vn/res/g2/11349/prof/s408x200/image-3111762a-200910114155.jpeg',
        },
      ],
    },
    {
      label: 'Đồ uống',
      data: [
        {
          name: 'Bún bò - chả',
          id: nanoid(),
          description: 'Bao gồm: hộp, muỗng, đũa mang về',
          price: 31000,
          image:
            'https://images.foody.vn/res/g2/11349/prof/s408x200/image-3111762a-200910114155.jpeg',
        },
        {
          name: 'Bún bò - chả',
          id: nanoid(),
          description: 'Bao gồm: hộp, muỗng, đũa mang về',
          price: 31000,
          image:
            'https://images.foody.vn/res/g2/11349/prof/s408x200/image-3111762a-200910114155.jpeg',
        },
        {
          name: 'Bún bò - chả',
          id: nanoid(),
          description: 'Bao gồm: hộp, muỗng, đũa mang về',
          price: 31000,
          image:
            'https://images.foody.vn/res/g2/11349/prof/s408x200/image-3111762a-200910114155.jpeg',
        },
        {
          name: 'Bún bò - chả',
          id: nanoid(),
          description: 'Bao gồm: hộp, muỗng, đũa mang về',
          price: 31000,
          image:
            'https://images.foody.vn/res/g2/11349/prof/s408x200/image-3111762a-200910114155.jpeg',
        },
        {
          name: 'Bún bò - chả',
          id: nanoid(),
          description: 'Bao gồm: hộp, muỗng, đũa mang về',
          price: 31000,
          image:
            'https://images.foody.vn/res/g2/11349/prof/s408x200/image-3111762a-200910114155.jpeg',
        },
      ],
    },
  ],
};
