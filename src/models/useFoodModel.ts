import {nanoid} from '@reduxjs/toolkit';

const useFoodModel = () => {
  const getFoodById = (foodId: string) => {
    const food = FOOD_DATA.find(item => item.id === foodId);
    return food;
  };
  return {
    getFoodById,
  };
};

export default useFoodModel;
export const FOOD_DATA = [
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
    id: nanoid(),
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
    name: 'Bún bò - chả',
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
    name: 'Bún bò - chả',
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
    name: 'Bún bò - chả',
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
    name: 'Bún bò - chả',
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
    name: 'Bún bò - chả',
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
    name: 'Bún bò - chả',
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
    name: 'Bún bò - chả',
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
    name: 'Bún bò - chả',
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
    name: 'Bún bò - chả',
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
