import axios from 'axios';
import {createServer} from 'miragejs';

export default function setUpMirage(environment: string | undefined) {
  createServer({
    environment,
    routes() {
      this.get('/restaurant/:id', (_schema, request) => {
        let restaurantId = request.params.id;
        const restaurant = restaurants.find(r => r.id === restaurantId) || {};
        return restaurant;
      });

      this.get('/food/:id', (_, request) => {
        const foodId = request.params.id;
        const food = FOODS_DATA.find(f => f.id === foodId) || {};
        return food;
      });

      this.get('/restaurant/all/:page', (_schema, request) => {
        let page = request.params.page;
        let offset: number = (Number(page) - 1) * 30;
        return restaurants.slice(offset, offset + 30);
      });

      this.get('/featureCategory', () => {
        return featureCategory;
      });

      this.post(
        'https://sb-openapi.zalopay.vn/v2/create',
        (_schema, request) => {
          let attrs = JSON.parse(request.requestBody);
          axios
            .post('https://sb-openapi.zalopay.vn/v2/create', {...attrs})
            .then(function (response) {
              console.log(response.data);
            })
            .catch(function (error) {
              console.log(error);
            });
          return featureCategory;
        },
      );
    },
  });
}

const FOODS_DATA = [
  {
    id: '1a7b8b84-6591-11eee-8c99-0242ac120002',
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
    id: '2061c8e2-65w91-11ee-8c99-0242ac120002',
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
    id: '2061c8e2-6591-11ere-8c99-0242ac12000u',
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

const MENU = [
  {
    name: 'Thực đơn 1',
    id: '2db86e4-6591-11ee-8c99-0242ac120002',
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
    name: 'Thực đơn 2',
    id: '34eb8474-6591-11ee-8c99-0242ac10002',
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
    name: 'Thực đơn 3',
    id: '3b47a1ea-6591-11ee-8c9-0242ac120002',
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
    name: 'Thực đơn 4',
    id: '4139fbac-6591-11ee-8c99-242ac120002',
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
    name: 'Thực đơn 5',
    id: '45a92334-659-11ee-8c99-0242ac120002',
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
    name: 'Thực đơn 6',
    id: '81362aaa-6591-11ee-8c99-0242c120002',
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
    name: 'Thực đơn 7',
    id: '86cd918-6591-11ee-8c99-0242ac120002',
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
    name: 'Thực đơn 8',
    id: '8bb25012-6591-11ee-8c99-0242ac10002',
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
    name: 'Thực đơn 9',
    id: '904ddfa6-651-11ee-8c99-0242ac120002',
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

const CHON_THEM = [
  {
    name: 'Chọn thêm 1',
    id: '2db86e4-6591-11ee-8c99-0242ac120002',
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
    name: 'Chọn thêm 2',
    id: '34eb8474-6591-11ee-8c99-0242ac10002',
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
    name: 'Chọn thêm 3',
    id: '3b47a1ea-6591-11ee-8c9-0242ac120002',
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
    name: 'Chọn thêm 4',
    id: '4139fbac-6591-11ee-8c99-242ac120002',
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
    name: 'Chọn thêm 5',
    id: '45a92334-659-11ee-8c99-0242ac120002',
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
    name: 'Chọn thêm 6',
    id: '81362aaa-6591-11ee-8c99-0242c120002',
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
    name: 'Chọn thêm 7',
    id: '86cd918-6591-11ee-8c99-0242ac120002',
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
    name: 'Chọn thêm 8',
    id: '8bb25012-6591-11ee-8c99-0242ac10002',
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
    name: 'Chọn thêm 9',
    id: '904ddfa6-651-11ee-8c99-0242ac120002',
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

const DO_UONG = [
  {
    name: 'Đồ uống 1',
    id: '2db86e4-6591-11ee-8c99-0242ac120002',
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
    name: 'Đồ uống 2',
    id: '34eb8474-6591-11ee-8c99-0242ac10002',
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
    name: 'Đồ uống 3',
    id: '3b47a1ea-6591-11ee-8c9-0242ac120002',
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
    name: 'Đồ uống 4',
    id: '4139fbac-6591-11ee-8c99-242ac120002',
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
    name: 'Đồ uống 5',
    id: '45a92334-659-11ee-8c99-0242ac120002',
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
    name: 'Đồ uống 6',
    id: '81362aaa-6591-11ee-8c99-0242c120002',
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
    name: 'Đồ uống 7',
    id: '86cd918-6591-11ee-8c99-0242ac120002',
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
    name: 'Đồ uống 8',
    id: '8bb25012-6591-11ee-8c99-0242ac10002',
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
    name: 'Đồ uống 9',
    id: '904ddfa6-651-11ee-8c99-0242ac120002',
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

const MON_MOI = [
  {
    name: 'Món mới 1',
    id: '32db86e4-6591-11ee-8c99-0242ac120002',
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
    name: 'Món mới 2',
    id: '334eb8474-6591-11ee-8c99-0242ac10002',
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
    name: 'Món mới 3',
    id: '33b47a1ea-6591-11ee-8c9-0242ac120002',
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
    name: 'Món mới 4',
    id: '34139fbac-6591-11ee-8c99-242ac120002',
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
    name: 'Món mới 5',
    id: '345a92334-659-11ee-8c99-0242ac120002',
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
    name: 'Món mới 6',
    id: '381362aaa-6591-11ee-8c99-0242c120002',
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
    name: 'Món mới 7',
    id: '386cd918-6591-11ee-8c99-0242ac120002',
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
    name: 'Món mới 8',
    id: '38bb25012-6591-11ee-8c99-0242ac10002',
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
    name: 'Món mới 9',
    id: '3904ddfa6-651-11ee-8c99-0242ac120002',
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

// home screen
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
          foods: MENU,
        },
        {
          label: 'Chọn thêm',
          foods: CHON_THEM,
        },
        {
          label: 'Đồ uống',
          foods: DO_UONG,
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
          foods: MENU,
        },
        {
          label: 'Chọn thêm',
          foods: CHON_THEM,
        },
        {
          label: 'Đồ uống',
          foods: DO_UONG,
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
          foods: MENU,
        },
        {
          label: 'Chọn thêm',
          foods: CHON_THEM,
        },
        {
          label: 'Đồ uống',
          foods: DO_UONG,
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
          foods: MENU,
        },
        {
          label: 'Chọn thêm',
          foods: CHON_THEM,
        },
        {
          label: 'Đồ uống',
          foods: DO_UONG,
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
          foods: MENU,
        },
        {
          label: 'Chọn thêm',
          foods: CHON_THEM,
        },
        {
          label: 'Đồ uống',
          foods: DO_UONG,
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
          foods: MENU,
        },
        {
          label: 'Chọn thêm',
          foods: CHON_THEM,
        },
        {
          label: 'Đồ uống',
          foods: DO_UONG,
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
          foods: MENU,
        },
        {
          label: 'Chọn thêm',
          foods: CHON_THEM,
        },
        {
          label: 'Đồ uống',
          foods: DO_UONG,
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
          foods: MENU,
        },
        {
          label: 'Chọn thêm',
          foods: CHON_THEM,
        },
        {
          label: 'Đồ uống',
          foods: DO_UONG,
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
          foods: MENU,
        },
        {
          label: 'Chọn thêm',
          foods: CHON_THEM,
        },
        {
          label: 'Đồ uống',
          foods: DO_UONG,
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
          foods: MENU,
        },
        {
          label: 'Chọn thêm',
          foods: CHON_THEM,
        },
        {
          label: 'Đồ uống',
          foods: DO_UONG,
        },
      ],
    },
    address: '259 Phạm Văn Đồng, P.1, Gò Vấp, TP. HCM',
    image:
      'https://images.foody.vn/res/g108/1076096/prof/s460x300/foody-upload-api-foody-mobile-36-e6f8587b-230729083030.jpeg',
  },
];

const featureCategory = [
  {
    id: 1,
    title: 'Quán mới khao đến 50%',
    subtitle: 'Tổng hợp quán mới đang khao nóng dòn',
    restaurants: popularRestaurant,
  },
  {
    id: 2,
    title: 'Deal đa tầng - khao nước xịn đến 90K',
    restaurants: popularRestaurant,
    subtitle: 'Áp dụng từ 2 voucher mỗi đơn',
  },
  {
    id: 3,
    title: 'Deal đa tầng - khao ăn ngon đến 90K',
    restaurants: popularRestaurant,
    subtitle: 'Áp dụng từ 2 voucher mỗi đơn',
  },
];

const restaurants = [
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
          foods: MENU,
        },
        {
          label: 'Chọn thêm',
          foods: CHON_THEM,
        },
        {
          label: 'Đồ uống',
          foods: DO_UONG,
        },
        {
          label: 'Món mới',
          foods: MON_MOI,
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
          foods: MENU,
        },
        {
          label: 'Chọn thêm',
          foods: CHON_THEM,
        },
        {
          label: 'Đồ uống',
          foods: DO_UONG,
        },
        {
          label: 'Món mới',
          foods: MON_MOI,
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
          foods: MENU,
        },
        {
          label: 'Chọn thêm',
          foods: CHON_THEM,
        },
        {
          label: 'Đồ uống',
          foods: DO_UONG,
        },
        {
          label: 'Món mới',
          foods: MON_MOI,
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
          foods: MENU,
        },
        {
          label: 'Chọn thêm',
          foods: CHON_THEM,
        },
        {
          label: 'Đồ uống',
          foods: DO_UONG,
        },
        {
          label: 'Món mới',
          foods: MON_MOI,
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
          foods: MENU,
        },
        {
          label: 'Chọn thêm',
          foods: CHON_THEM,
        },
        {
          label: 'Đồ uống',
          foods: DO_UONG,
        },
        {
          label: 'Món mới',
          foods: MON_MOI,
        },
      ],
    },
  },
  {
    id: 'd42e99b6-658e-11ee-8c99-0242ac120002',
    name: 'Gà Ta Tường Vy - Cơm Gà, Cháo & Gỏi Gà - Nguyễn Văn Quá',
    address: '661 Nguyễn Văn Quá, P. Đông Hưng Thuận, Quận 12, TP. HCM',
    image:
      'https://images.foody.vn/res/g81/801344/prof/s460x300/image-9c40a4fe-210113164540.jpeg',
    allFoods: {
      bestSeller: [FOODS_DATA[0], FOODS_DATA[1], FOODS_DATA[2], FOODS_DATA[3]],
      menuFoods: [
        {
          label: 'Khuyến mãi',
          foods: FOODS_DATA.slice(4),
        },
        {
          label: 'Thực đơn',
          foods: MENU,
        },
        {
          label: 'Chọn thêm',
          foods: CHON_THEM,
        },
        {
          label: 'Đồ uống',
          foods: DO_UONG,
        },
        {
          label: 'Món mới',
          foods: MON_MOI,
        },
      ],
    },
  },
  {
    id: 'da7ca5c4-658e-11ee-8c99-0242ac120002',
    name: 'Anh Cường Bakery - Bánh Cua Phô Mai - Nguyễn Văn Lạc',
    address: '32 Nguyễn Văn Lạc, P. 19, Bình Thạnh, TP. HCM',
    image:
      'https://images.foody.vn/res/g79/781832/prof/s460x300/foody-upload-api-foody-mobile-banhkembap1-jpg-181002153458.jpg',
  },
  {
    id: 'dfd61104-658e-11ee-8c99-0242ac120002',
    name: 'Tâm Ký II - Cơm Chiên & Nui Xào - Đường 50',
    address: '10 Đường số 50, P. 5, Quận 4, Quận 4, TP. HCM',
    image:
      'https://images.foody.vn/res/g117/1163333/prof/s460x300/foody-upload-api-foody-mobile-ta-f8e92a47-230304194500.jpeg',
    allFoods: {
      bestSeller: [FOODS_DATA[0], FOODS_DATA[1], FOODS_DATA[2], FOODS_DATA[3]],
      menuFoods: [
        {
          label: 'Khuyến mãi',
          foods: FOODS_DATA.slice(4),
        },
        {
          label: 'Thực đơn',
          foods: MENU,
        },
        {
          label: 'Chọn thêm',
          foods: CHON_THEM,
        },
        {
          label: 'Đồ uống',
          foods: DO_UONG,
        },
        {
          label: 'Món mới',
          foods: MON_MOI,
        },
      ],
    },
  },
  {
    id: 'e53760ee-658e-11ee-8c99-0242ac120002',
    name: 'Zangzang Food - Gà Tươi Ủ Muối Cầu Kỳ',
    address: '226 Lê Đức Thọ, P. 6, Gò Vấp, TP. HCM',
    image:
      'https://images.foody.vn/res/g117/1163373/prof/s460x300/foody-upload-api-foody-mobile-fi-365302c3-230320112903.jpeg',
    allFoods: {
      bestSeller: [FOODS_DATA[0], FOODS_DATA[1], FOODS_DATA[2], FOODS_DATA[3]],
      menuFoods: [
        {
          label: 'Khuyến mãi',
          foods: FOODS_DATA.slice(4),
        },
        {
          label: 'Thực đơn',
          foods: MENU,
        },
        {
          label: 'Chọn thêm',
          foods: CHON_THEM,
        },
        {
          label: 'Đồ uống',
          foods: DO_UONG,
        },
        {
          label: 'Món mới',
          foods: MON_MOI,
        },
      ],
    },
  },
  {
    id: 'ea8848ba-658e-11ee-8c99-0242ac120002',
    name: 'Mì Trộn Park Kim Thang - Phạm Văn Đồng',
    address: '259 Phạm Văn Đồng, P.1, Gò Vấp, TP. HCM',
    image:
      'https://images.foody.vn/res/g108/1076096/prof/s460x300/foody-upload-api-foody-mobile-36-e6f8587b-230729083030.jpeg',
    allFoods: {
      bestSeller: [FOODS_DATA[0], FOODS_DATA[1], FOODS_DATA[2], FOODS_DATA[3]],
      menuFoods: [
        {
          label: 'Khuyến mãi',
          foods: FOODS_DATA.slice(4),
        },
        {
          label: 'Thực đơn',
          foods: MENU,
        },
        {
          label: 'Chọn thêm',
          foods: CHON_THEM,
        },
        {
          label: 'Đồ uống',
          foods: DO_UONG,
        },
        {
          label: 'Món mới',
          foods: MON_MOI,
        },
      ],
    },
  },
  {
    id: 'f01eb502-658e-11ee-8c99-0242ac120002',
    name: 'Bún Thịt Nướng Dì 7 & Cơm Tấm, Lẩu - Khu Phố 2A',
    address:
      '1779/21/6 Khu Phố 2A, Quốc Lộ 1A, P. Tân Thới Hiệp, Quận 12, TP. HCM',
    image:
      'https://images.foody.vn/res/g105/1043305/prof/s480x300/foody-upload-api-foody-mobile-89039049_10754428753-200820145636.jpg',
  },
  {
    id: 'f537d7c6-658e-11ee-8c99-0242ac120002',
    name: 'Thành Đạt - Hủ Tiếu Nam Vang - 22C Nguyễn Hữu Cầu',
    address: 'Thành Đạt - Hủ Tiếu Nam Vang - 22C Nguyễn Hữu Cầu',
    image:
      'https://images.foody.vn/res/g112/1114707/prof/s460x300/foody-upload-api-foody-mobile-un-de857048-211105141117.jpeg',
    allFoods: {
      bestSeller: [FOODS_DATA[0], FOODS_DATA[1], FOODS_DATA[2], FOODS_DATA[3]],
      menuFoods: [
        {
          label: 'Khuyến mãi',
          foods: FOODS_DATA.slice(4),
        },
        {
          label: 'Thực đơn',
          foods: MENU,
        },
        {
          label: 'Chọn thêm',
          foods: CHON_THEM,
        },
        {
          label: 'Đồ uống',
          foods: DO_UONG,
        },
        {
          label: 'Món mới',
          foods: MON_MOI,
        },
      ],
    },
  },
  {
    id: 'faca70e0-658e-11ee-8c99-0242ac120002',
    name: 'Bích Phong - Ăn Vặt & Gỏi Cuốn',
    address: 'Bích Phong - Ăn Vặt & Gỏi Cuốn',
    image:
      'https://images.foody.vn/res/g101/1001217/prof/s460x300/foody-upload-api-foody-mobile-co-772aaadd-211230181601.jpeg',
    allFoods: {
      bestSeller: [FOODS_DATA[0], FOODS_DATA[1], FOODS_DATA[2], FOODS_DATA[3]],
      menuFoods: [
        {
          label: 'Khuyến mãi',
          foods: FOODS_DATA.slice(4),
        },
        {
          label: 'Thực đơn',
          foods: MENU,
        },
        {
          label: 'Chọn thêm',
          foods: CHON_THEM,
        },
        {
          label: 'Đồ uống',
          foods: DO_UONG,
        },
        {
          label: 'Món mới',
          foods: MON_MOI,
        },
      ],
    },
  },
  {
    id: '001936bc-658f-11ee-8c99-0242ac120002',
    name: 'Cô Liễu - Gỏi Cuốn',
    address: '11 Đường Số 8, P. Trường Thọ, Thành Phố Thủ Đức, TP. HCM',
    image:
      'https://images.foody.vn/res/g103/1029534/prof/s460x300/file_restaurant_photo_8qvk_16337-3e10e1e6-211008211144.jpg',
    allFoods: {
      bestSeller: [FOODS_DATA[0], FOODS_DATA[1], FOODS_DATA[2], FOODS_DATA[3]],
      menuFoods: [
        {
          label: 'Khuyến mãi',
          foods: FOODS_DATA.slice(4),
        },
        {
          label: 'Thực đơn',
          foods: MENU,
        },
        {
          label: 'Chọn thêm',
          foods: CHON_THEM,
        },
        {
          label: 'Đồ uống',
          foods: DO_UONG,
        },
        {
          label: 'Món mới',
          foods: MON_MOI,
        },
      ],
    },
  },
  {
    id: '04f4c17e-658f-11ee-8c99-0242ac120002',
    name: 'Bánh Bò Thốt Nốt COCOCake - Lò Bánh Huỳnh Văn Bánh',
    address: '65A Huỳnh Văn Bánh, P. 17, Phú Nhuận, TP. HCM',
    image:
      'https://images.foody.vn/res/g70/692640/prof/s460x300/foody-upload-api-foody-mobile-21-190326132919.jpg',
    allFoods: {
      bestSeller: [FOODS_DATA[0], FOODS_DATA[1], FOODS_DATA[2], FOODS_DATA[3]],
      menuFoods: [
        {
          label: 'Khuyến mãi',
          foods: FOODS_DATA.slice(4),
        },
        {
          label: 'Thực đơn',
          foods: MENU,
        },
        {
          label: 'Chọn thêm',
          foods: CHON_THEM,
        },
        {
          label: 'Đồ uống',
          foods: DO_UONG,
        },
        {
          label: 'Món mới',
          foods: MON_MOI,
        },
      ],
    },
  },
  {
    id: '099c3090-658f-11ee-8c99-0242ac120002',
    name: 'Tui Bán Trà - Tiệm Trà Chanh Hong Kong - Nguyễn Thượng Hiền',
    address: '230 Nguyễn Thượng Hiền, P. 4 , Quận 3, TP. HCM',
    image:
      'https://images.foody.vn/res/g104/1031515/prof/s460x300/foody-upload-api-foody-mobile-foody-upload-api-foo-200622155115.jpg',
    allFoods: {
      bestSeller: [FOODS_DATA[0], FOODS_DATA[1], FOODS_DATA[2], FOODS_DATA[3]],
      menuFoods: [
        {
          label: 'Khuyến mãi',
          foods: FOODS_DATA.slice(4),
        },
        {
          label: 'Thực đơn',
          foods: MENU,
        },
        {
          label: 'Chọn thêm',
          foods: CHON_THEM,
        },
        {
          label: 'Đồ uống',
          foods: DO_UONG,
        },
        {
          label: 'Món mới',
          foods: MON_MOI,
        },
      ],
    },
  },
  {
    id: '0ee6afda-658f-11ee-8c99-0242ac120002',
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
          foods: MENU,
        },
        {
          label: 'Chọn thêm',
          foods: CHON_THEM,
        },
        {
          label: 'Đồ uống',
          foods: DO_UONG,
        },
        {
          label: 'Món mới',
          foods: MON_MOI,
        },
      ],
    },
  },
  {
    id: '137a59a2-658f-11ee-8c99-0242ac120002',
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
          foods: MENU,
        },
        {
          label: 'Chọn thêm',
          foods: CHON_THEM,
        },
        {
          label: 'Đồ uống',
          foods: DO_UONG,
        },
        {
          label: 'Món mới',
          foods: MON_MOI,
        },
      ],
    },
  },
  {
    id: '185dd08e-658f-11ee-8c99-0242ac120002',
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
          foods: MENU,
        },
        {
          label: 'Chọn thêm',
          foods: CHON_THEM,
        },
        {
          label: 'Đồ uống',
          foods: DO_UONG,
        },
        {
          label: 'Món mới',
          foods: MON_MOI,
        },
      ],
    },
  },
  {
    id: '1d1d7462-658f-11ee-8c99-0242ac120002',
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
          foods: MENU,
        },
        {
          label: 'Chọn thêm',
          foods: CHON_THEM,
        },
        {
          label: 'Đồ uống',
          foods: DO_UONG,
        },
        {
          label: 'Món mới',
          foods: MON_MOI,
        },
      ],
    },
  },
  {
    id: '221c4e20-658f-11ee-8c99-0242ac120002',
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
          foods: MENU,
        },
        {
          label: 'Chọn thêm',
          foods: CHON_THEM,
        },
        {
          label: 'Đồ uống',
          foods: DO_UONG,
        },
        {
          label: 'Món mới',
          foods: MON_MOI,
        },
      ],
    },
  },
  {
    id: '274d2d7e-658f-11ee-8c99-0242ac120002',
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
          foods: MENU,
        },
        {
          label: 'Chọn thêm',
          foods: CHON_THEM,
        },
        {
          label: 'Đồ uống',
          foods: DO_UONG,
        },
        {
          label: 'Món mới',
          foods: MON_MOI,
        },
      ],
    },
  },
  {
    id: '2e021e40-658f-11ee-8c99-0242ac120002',
    name: 'Tiên Tiên - Bún Thái Cay - Phan Văn Trị',
    address: '317B Phan Văn Trị, P. 2, Quận 5, TP. HCM',
    image:
      'https://images.foody.vn/res/g97/963183/prof/s640x400/image-f472b1f5-200910114135.jpeg',
    allFoods: {
      bestSeller: [FOODS_DATA[0], FOODS_DATA[1], FOODS_DATA[2], FOODS_DATA[3]],
      menuFoods: [
        {
          label: 'Khuyến mãi',
          foods: FOODS_DATA.slice(4),
        },
        {
          label: 'Thực đơn',
          foods: MENU,
        },
        {
          label: 'Chọn thêm',
          foods: CHON_THEM,
        },
        {
          label: 'Đồ uống',
          foods: DO_UONG,
        },
        {
          label: 'Món mới',
          foods: MON_MOI,
        },
      ],
    },
  },
  {
    id: '33528524-658f-11ee-8c99-0242ac120002',
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
          foods: MENU,
        },
        {
          label: 'Chọn thêm',
          foods: CHON_THEM,
        },
        {
          label: 'Đồ uống',
          foods: DO_UONG,
        },
        {
          label: 'Món mới',
          foods: MON_MOI,
        },
      ],
    },
  },
  {
    id: '376bd93a-658f-11ee-8c99-0242ac120002',
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
          foods: MENU,
        },
        {
          label: 'Chọn thêm',
          foods: CHON_THEM,
        },
        {
          label: 'Đồ uống',
          foods: DO_UONG,
        },
        {
          label: 'Món mới',
          foods: MON_MOI,
        },
      ],
    },
  },
  {
    id: '3c58e23a-658f-11ee-8c99-0242ac120002',
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
          foods: MENU,
        },
        {
          label: 'Chọn thêm',
          foods: CHON_THEM,
        },
        {
          label: 'Đồ uống',
          foods: DO_UONG,
        },
        {
          label: 'Món mới',
          foods: MON_MOI,
        },
      ],
    },
  },
  {
    id: '406f59d0-658f-11ee-8c99-0242ac120002',
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
          foods: MENU,
        },
        {
          label: 'Chọn thêm',
          foods: CHON_THEM,
        },
        {
          label: 'Đồ uống',
          foods: DO_UONG,
        },
        {
          label: 'Món mới',
          foods: MON_MOI,
        },
      ],
    },
  },
  {
    id: '44c67324-658f-11ee-8c99-0242ac120002',
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
          foods: MENU,
        },
        {
          label: 'Chọn thêm',
          foods: CHON_THEM,
        },
        {
          label: 'Đồ uống',
          foods: DO_UONG,
        },
        {
          label: 'Món mới',
          foods: MON_MOI,
        },
      ],
    },
  },
  {
    id: '6eed62a2-658f-11ee-8c99-0242ac120002',
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
          foods: MENU,
        },
        {
          label: 'Chọn thêm',
          foods: CHON_THEM,
        },
        {
          label: 'Đồ uống',
          foods: DO_UONG,
        },
        {
          label: 'Món mới',
          foods: MON_MOI,
        },
      ],
    },
  },
  {
    id: '743e9d8e-658f-11ee-8c99-0242ac120002',
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
          foods: MENU,
        },
        {
          label: 'Chọn thêm',
          foods: CHON_THEM,
        },
        {
          label: 'Đồ uống',
          foods: DO_UONG,
        },
        {
          label: 'Món mới',
          foods: MON_MOI,
        },
      ],
    },
  },
  {
    id: '789a22b8-658f-11ee-8c99-0242ac120002',
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
          foods: MENU,
        },
        {
          label: 'Chọn thêm',
          foods: CHON_THEM,
        },
        {
          label: 'Đồ uống',
          foods: DO_UONG,
        },
        {
          label: 'Món mới',
          foods: MON_MOI,
        },
      ],
    },
  },
  {
    id: '7ed367f2-658f-11ee-8c99-0242ac120002',
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
          foods: MENU,
        },
        {
          label: 'Chọn thêm',
          foods: CHON_THEM,
        },
        {
          label: 'Đồ uống',
          foods: DO_UONG,
        },
        {
          label: 'Món mới',
          foods: MON_MOI,
        },
      ],
    },
  },
  {
    id: '83fd7b64-658f-11ee-8c99-0242ac120002',
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
          foods: MENU,
        },
        {
          label: 'Chọn thêm',
          foods: CHON_THEM,
        },
        {
          label: 'Đồ uống',
          foods: DO_UONG,
        },
        {
          label: 'Món mới',
          foods: MON_MOI,
        },
      ],
    },
  },
  {
    id: '88c5b260-658f-11ee-8c99-0242ac120002',
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
          foods: MENU,
        },
        {
          label: 'Chọn thêm',
          foods: CHON_THEM,
        },
        {
          label: 'Đồ uống',
          foods: DO_UONG,
        },
        {
          label: 'Món mới',
          foods: MON_MOI,
        },
      ],
    },
  },
  {
    id: '8e5742b6-658f-11ee-8c99-0242ac120002',
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
          foods: MENU,
        },
        {
          label: 'Chọn thêm',
          foods: CHON_THEM,
        },
        {
          label: 'Đồ uống',
          foods: DO_UONG,
        },
        {
          label: 'Món mới',
          foods: MON_MOI,
        },
      ],
    },
  },
  {
    id: '9429b570-658f-11ee-8c99-0242ac120002',
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
          foods: MENU,
        },
        {
          label: 'Chọn thêm',
          foods: CHON_THEM,
        },
        {
          label: 'Đồ uống',
          foods: DO_UONG,
        },
        {
          label: 'Món mới',
          foods: MON_MOI,
        },
      ],
    },
  },
  {
    id: '9bfad20c-658f-11ee-8c99-0242ac120002',
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
          foods: MENU,
        },
        {
          label: 'Chọn thêm',
          foods: CHON_THEM,
        },
        {
          label: 'Đồ uống',
          foods: DO_UONG,
        },
        {
          label: 'Món mới',
          foods: MON_MOI,
        },
      ],
    },
  },
  {
    id: 'a0cea43e-658f-11ee-8c99-0242ac120002',
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
          foods: MENU,
        },
        {
          label: 'Chọn thêm',
          foods: CHON_THEM,
        },
        {
          label: 'Đồ uống',
          foods: DO_UONG,
        },
        {
          label: 'Món mới',
          foods: MON_MOI,
        },
      ],
    },
  },
  {
    id: 'a5ec71d0-658f-11ee-8c99-0242ac120002',
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
          foods: MENU,
        },
        {
          label: 'Chọn thêm',
          foods: CHON_THEM,
        },
        {
          label: 'Đồ uống',
          foods: DO_UONG,
        },
        {
          label: 'Món mới',
          foods: MON_MOI,
        },
      ],
    },
  },
  {
    id: 'ab392b1a-658f-11ee-8c99-0242ac120002',
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
          foods: MENU,
        },
        {
          label: 'Chọn thêm',
          foods: CHON_THEM,
        },
        {
          label: 'Đồ uống',
          foods: DO_UONG,
        },
        {
          label: 'Món mới',
          foods: MON_MOI,
        },
      ],
    },
  },
  {
    id: 'bb8aa124-658f-11ee-8c99-0242ac120002',
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
          foods: MENU,
        },
        {
          label: 'Chọn thêm',
          foods: CHON_THEM,
        },
        {
          label: 'Đồ uống',
          foods: DO_UONG,
        },
        {
          label: 'Món mới',
          foods: MON_MOI,
        },
      ],
    },
  },
  {
    id: 'c68986f8-658f-11ee-8c99-0242ac120002',
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
          foods: MENU,
        },
        {
          label: 'Chọn thêm',
          foods: CHON_THEM,
        },
        {
          label: 'Đồ uống',
          foods: DO_UONG,
        },
        {
          label: 'Món mới',
          foods: MON_MOI,
        },
      ],
    },
  },
  {
    id: 'c100211a-658f-11ee-8c99-0242ac120002',
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
          foods: MENU,
        },
        {
          label: 'Chọn thêm',
          foods: CHON_THEM,
        },
        {
          label: 'Đồ uống',
          foods: DO_UONG,
        },
        {
          label: 'Món mới',
          foods: MON_MOI,
        },
      ],
    },
  },
  {
    id: 'cbc3b670-658f-11ee-8c99-0242ac120002',
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
          foods: MENU,
        },
        {
          label: 'Chọn thêm',
          foods: CHON_THEM,
        },
        {
          label: 'Đồ uống',
          foods: DO_UONG,
        },
        {
          label: 'Món mới',
          foods: MON_MOI,
        },
      ],
    },
  },
  {
    id: 'd1397bda-658f-11ee-8c99-0242ac120002',
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
          foods: MENU,
        },
        {
          label: 'Chọn thêm',
          foods: CHON_THEM,
        },
        {
          label: 'Đồ uống',
          foods: DO_UONG,
        },
        {
          label: 'Món mới',
          foods: MON_MOI,
        },
      ],
    },
  },
  {
    id: 'd64c5c64-658f-11ee-8c99-0242ac120002',
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
          foods: MENU,
        },
        {
          label: 'Chọn thêm',
          foods: CHON_THEM,
        },
        {
          label: 'Đồ uống',
          foods: DO_UONG,
        },
        {
          label: 'Món mới',
          foods: MON_MOI,
        },
      ],
    },
  },
  {
    id: 'db53d2fa-658f-11ee-8c99-0242ac120002',
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
          foods: MENU,
        },
        {
          label: 'Chọn thêm',
          foods: CHON_THEM,
        },
        {
          label: 'Đồ uống',
          foods: DO_UONG,
        },
        {
          label: 'Món mới',
          foods: MON_MOI,
        },
      ],
    },
  },
  {
    id: 'e5b4885c-658f-11ee-8c99-0242ac120002',
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
          foods: MENU,
        },
        {
          label: 'Chọn thêm',
          foods: CHON_THEM,
        },
        {
          label: 'Đồ uống',
          foods: DO_UONG,
        },
        {
          label: 'Món mới',
          foods: MON_MOI,
        },
      ],
    },
  },
  {
    id: 'eb77a256-658f-11ee-8c99-0242ac120002',
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
          foods: MENU,
        },
        {
          label: 'Chọn thêm',
          foods: CHON_THEM,
        },
        {
          label: 'Đồ uống',
          foods: DO_UONG,
        },
        {
          label: 'Món mới',
          foods: MON_MOI,
        },
      ],
    },
  },
  {
    id: 'f226602e-658f-11ee-8c99-0242ac120002',
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
          foods: MENU,
        },
        {
          label: 'Chọn thêm',
          foods: CHON_THEM,
        },
        {
          label: 'Đồ uống',
          foods: DO_UONG,
        },
        {
          label: 'Món mới',
          foods: MON_MOI,
        },
      ],
    },
  },
  {
    id: 'fc4cfde2-658f-11ee-8c99-0242ac120002',
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
          foods: MENU,
        },
        {
          label: 'Chọn thêm',
          foods: CHON_THEM,
        },
        {
          label: 'Đồ uống',
          foods: DO_UONG,
        },
        {
          label: 'Món mới',
          foods: MON_MOI,
        },
      ],
    },
  },
  {
    id: '013d7232-6590-11ee-8c99-0242ac120002',
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
          foods: MENU,
        },
        {
          label: 'Chọn thêm',
          foods: CHON_THEM,
        },
        {
          label: 'Đồ uống',
          foods: DO_UONG,
        },
        {
          label: 'Món mới',
          foods: MON_MOI,
        },
      ],
    },
  },
  {
    id: '07b9c4a8-6590-11ee-8c99-0242ac120002',
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
          foods: MENU,
        },
        {
          label: 'Chọn thêm',
          foods: CHON_THEM,
        },
        {
          label: 'Đồ uống',
          foods: DO_UONG,
        },
        {
          label: 'Món mới',
          foods: MON_MOI,
        },
      ],
    },
  },
  {
    id: '0d1edb2c-6590-11ee-8c99-0242ac120002',
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
          foods: MENU,
        },
        {
          label: 'Chọn thêm',
          foods: CHON_THEM,
        },
        {
          label: 'Đồ uống',
          foods: DO_UONG,
        },
        {
          label: 'Món mới',
          foods: MON_MOI,
        },
      ],
    },
  },
  {
    id: '15aa196e-6590-11ee-8c99-0242ac120002',
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
          foods: MENU,
        },
        {
          label: 'Chọn thêm',
          foods: CHON_THEM,
        },
        {
          label: 'Đồ uống',
          foods: DO_UONG,
        },
        {
          label: 'Món mới',
          foods: MON_MOI,
        },
      ],
    },
  },
  {
    id: '1a659f32-6590-11ee-8c99-0242ac120002',
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
          foods: MENU,
        },
        {
          label: 'Chọn thêm',
          foods: CHON_THEM,
        },
        {
          label: 'Đồ uống',
          foods: DO_UONG,
        },
        {
          label: 'Món mới',
          foods: MON_MOI,
        },
      ],
    },
  },
  {
    id: '1edfef2c-6590-11ee-8c99-0242ac120002',
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
          foods: MENU,
        },
        {
          label: 'Chọn thêm',
          foods: CHON_THEM,
        },
        {
          label: 'Đồ uống',
          foods: DO_UONG,
        },
        {
          label: 'Món mới',
          foods: MON_MOI,
        },
      ],
    },
  },
  {
    id: '24cf91d0-6590-11ee-8c99-0242ac120002',
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
          foods: MENU,
        },
        {
          label: 'Chọn thêm',
          foods: CHON_THEM,
        },
        {
          label: 'Đồ uống',
          foods: DO_UONG,
        },
        {
          label: 'Món mới',
          foods: MON_MOI,
        },
      ],
    },
  },
  {
    id: '29f4888c-6590-11ee-8c99-0242ac120002',
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
          foods: MENU,
        },
        {
          label: 'Chọn thêm',
          foods: CHON_THEM,
        },
        {
          label: 'Đồ uống',
          foods: DO_UONG,
        },
        {
          label: 'Món mới',
          foods: MON_MOI,
        },
      ],
    },
  },
  {
    id: '349c885c-6590-11ee-8c99-0242ac120002',
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
          foods: MENU,
        },
        {
          label: 'Chọn thêm',
          foods: CHON_THEM,
        },
        {
          label: 'Đồ uống',
          foods: DO_UONG,
        },
        {
          label: 'Món mới',
          foods: MON_MOI,
        },
      ],
    },
  },
  {
    id: '3a65a214-6590-11ee-8c99-0242ac120002',
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
          foods: MENU,
        },
        {
          label: 'Chọn thêm',
          foods: CHON_THEM,
        },
        {
          label: 'Đồ uống',
          foods: DO_UONG,
        },
        {
          label: 'Món mới',
          foods: MON_MOI,
        },
      ],
    },
  },
  {
    id: '3ef2c140-6590-11ee-8c99-0242ac120002',
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
          foods: MENU,
        },
        {
          label: 'Chọn thêm',
          foods: CHON_THEM,
        },
        {
          label: 'Đồ uống',
          foods: DO_UONG,
        },
        {
          label: 'Món mới',
          foods: MON_MOI,
        },
      ],
    },
  },
  {
    id: '44a981a0-6590-11ee-8c99-0242ac120002',
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
          foods: MENU,
        },
        {
          label: 'Chọn thêm',
          foods: CHON_THEM,
        },
        {
          label: 'Đồ uống',
          foods: DO_UONG,
        },
        {
          label: 'Món mới',
          foods: MON_MOI,
        },
      ],
    },
  },
  {
    id: '4b46614a-6590-11ee-8c99-0242ac120002',
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
          foods: MENU,
        },
        {
          label: 'Chọn thêm',
          foods: CHON_THEM,
        },
        {
          label: 'Đồ uống',
          foods: DO_UONG,
        },
        {
          label: 'Món mới',
          foods: MON_MOI,
        },
      ],
    },
  },
  {
    id: '50e92920-6590-11ee-8c99-0242ac120002',
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
          foods: MENU,
        },
        {
          label: 'Chọn thêm',
          foods: CHON_THEM,
        },
        {
          label: 'Đồ uống',
          foods: DO_UONG,
        },
        {
          label: 'Món mới',
          foods: MON_MOI,
        },
      ],
    },
  },
  {
    id: '5644ff20-6590-11ee-8c99-0242ac120002',
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
          foods: MENU,
        },
        {
          label: 'Chọn thêm',
          foods: CHON_THEM,
        },
        {
          label: 'Đồ uống',
          foods: DO_UONG,
        },
        {
          label: 'Món mới',
          foods: MON_MOI,
        },
      ],
    },
  },
  {
    id: '5aa40a2a-6590-11ee-8c99-0242ac120002',
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
          foods: MENU,
        },
        {
          label: 'Chọn thêm',
          foods: CHON_THEM,
        },
        {
          label: 'Đồ uống',
          foods: DO_UONG,
        },
        {
          label: 'Món mới',
          foods: MON_MOI,
        },
      ],
    },
  },
  {
    id: '5f135ce6-6590-11ee-8c99-0242ac120002',
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
          foods: MENU,
        },
        {
          label: 'Chọn thêm',
          foods: CHON_THEM,
        },
        {
          label: 'Đồ uống',
          foods: DO_UONG,
        },
        {
          label: 'Món mới',
          foods: MON_MOI,
        },
      ],
    },
  },
  {
    id: '6452c32c-6590-11ee-8c99-0242ac120002',
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
          foods: MENU,
        },
        {
          label: 'Chọn thêm',
          foods: CHON_THEM,
        },
        {
          label: 'Đồ uống',
          foods: DO_UONG,
        },
        {
          label: 'Món mới',
          foods: MON_MOI,
        },
      ],
    },
  },
  {
    id: '6951e0f6-6590-11ee-8c99-0242ac120002',
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
          foods: MENU,
        },
        {
          label: 'Chọn thêm',
          foods: CHON_THEM,
        },
        {
          label: 'Đồ uống',
          foods: DO_UONG,
        },
        {
          label: 'Món mới',
          foods: MON_MOI,
        },
      ],
    },
  },
  {
    id: '70560bca-6590-11ee-8c99-0242ac120002',
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
          foods: MENU,
        },
        {
          label: 'Chọn thêm',
          foods: CHON_THEM,
        },
        {
          label: 'Đồ uống',
          foods: DO_UONG,
        },
        {
          label: 'Món mới',
          foods: MON_MOI,
        },
      ],
    },
  },
  {
    id: '77a3c9b2-6590-11ee-8c99-0242ac120002',
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
          foods: MENU,
        },
        {
          label: 'Chọn thêm',
          foods: CHON_THEM,
        },
        {
          label: 'Đồ uống',
          foods: DO_UONG,
        },
        {
          label: 'Món mới',
          foods: MON_MOI,
        },
      ],
    },
  },
  {
    id: '7f10fd64-6590-11ee-8c99-0242ac120002',
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
          foods: MENU,
        },
        {
          label: 'Chọn thêm',
          foods: CHON_THEM,
        },
        {
          label: 'Đồ uống',
          foods: DO_UONG,
        },
        {
          label: 'Món mới',
          foods: MON_MOI,
        },
      ],
    },
  },
  {
    id: '85b5ec92-6590-11ee-8c99-0242ac120002',
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
          foods: MENU,
        },
        {
          label: 'Chọn thêm',
          foods: CHON_THEM,
        },
        {
          label: 'Đồ uống',
          foods: DO_UONG,
        },
        {
          label: 'Món mới',
          foods: MON_MOI,
        },
      ],
    },
  },
  {
    id: '8b00c262-6590-11ee-8c99-0242ac120002',
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
          foods: MENU,
        },
        {
          label: 'Chọn thêm',
          foods: CHON_THEM,
        },
        {
          label: 'Đồ uống',
          foods: DO_UONG,
        },
        {
          label: 'Món mới',
          foods: MON_MOI,
        },
      ],
    },
  },
  {
    id: '8fd87adc-6590-11ee-8c99-0242ac120002',
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
          foods: MENU,
        },
        {
          label: 'Chọn thêm',
          foods: CHON_THEM,
        },
        {
          label: 'Đồ uống',
          foods: DO_UONG,
        },
        {
          label: 'Món mới',
          foods: MON_MOI,
        },
      ],
    },
  },
  {
    id: '952b29c6-6590-11ee-8c99-0242ac120002',
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
          foods: MENU,
        },
        {
          label: 'Chọn thêm',
          foods: CHON_THEM,
        },
        {
          label: 'Đồ uống',
          foods: DO_UONG,
        },
        {
          label: 'Món mới',
          foods: MON_MOI,
        },
      ],
    },
  },
  {
    id: '99fe4dc0-6590-11ee-8c99-0242ac120002',
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
          foods: MENU,
        },
        {
          label: 'Chọn thêm',
          foods: CHON_THEM,
        },
        {
          label: 'Đồ uống',
          foods: DO_UONG,
        },
        {
          label: 'Món mới',
          foods: MON_MOI,
        },
      ],
    },
  },
  {
    id: 'a049fc06-6590-11ee-8c99-0242ac120002',
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
          foods: MENU,
        },
        {
          label: 'Chọn thêm',
          foods: CHON_THEM,
        },
        {
          label: 'Đồ uống',
          foods: DO_UONG,
        },
        {
          label: 'Món mới',
          foods: MON_MOI,
        },
      ],
    },
  },
  {
    id: 'a53bcc9e-6590-11ee-8c99-0242ac120002',
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
          foods: MENU,
        },
        {
          label: 'Chọn thêm',
          foods: CHON_THEM,
        },
        {
          label: 'Đồ uống',
          foods: DO_UONG,
        },
        {
          label: 'Món mới',
          foods: MON_MOI,
        },
      ],
    },
  },
  {
    id: 'a99e1cd8-6590-11ee-8c99-0242ac120002',
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
          foods: MENU,
        },
        {
          label: 'Chọn thêm',
          foods: CHON_THEM,
        },
        {
          label: 'Đồ uống',
          foods: DO_UONG,
        },
        {
          label: 'Món mới',
          foods: MON_MOI,
        },
      ],
    },
  },
  {
    id: 'aeec853a-6590-11ee-8c99-0242ac120002',
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
          foods: MENU,
        },
        {
          label: 'Chọn thêm',
          foods: CHON_THEM,
        },
        {
          label: 'Đồ uống',
          foods: DO_UONG,
        },
        {
          label: 'Món mới',
          foods: MON_MOI,
        },
      ],
    },
  },
  {
    id: 'b3e591f8-6590-11ee-8c99-0242ac120002',
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
          foods: MENU,
        },
        {
          label: 'Chọn thêm',
          foods: CHON_THEM,
        },
        {
          label: 'Đồ uống',
          foods: DO_UONG,
        },
        {
          label: 'Món mới',
          foods: MON_MOI,
        },
      ],
    },
  },
  {
    id: 'b8c9fdb2-6590-11ee-8c99-0242ac120002',
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
          foods: MENU,
        },
        {
          label: 'Chọn thêm',
          foods: CHON_THEM,
        },
        {
          label: 'Đồ uống',
          foods: DO_UONG,
        },
        {
          label: 'Món mới',
          foods: MON_MOI,
        },
      ],
    },
  },
  {
    id: 'be33b5cc-6590-11ee-8c99-0242ac120002',
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
          foods: MENU,
        },
        {
          label: 'Chọn thêm',
          foods: CHON_THEM,
        },
        {
          label: 'Đồ uống',
          foods: DO_UONG,
        },
        {
          label: 'Món mới',
          foods: MON_MOI,
        },
      ],
    },
  },
  {
    id: 'c33babec-6590-11ee-8c99-0242ac120002',
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
          foods: MENU,
        },
        {
          label: 'Chọn thêm',
          foods: CHON_THEM,
        },
        {
          label: 'Đồ uống',
          foods: DO_UONG,
        },
        {
          label: 'Món mới',
          foods: MON_MOI,
        },
      ],
    },
  },
  {
    id: 'c7c0a668-6590-11ee-8c99-0242ac120002',
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
          foods: MENU,
        },
        {
          label: 'Chọn thêm',
          foods: CHON_THEM,
        },
        {
          label: 'Đồ uống',
          foods: DO_UONG,
        },
        {
          label: 'Món mới',
          foods: MON_MOI,
        },
      ],
    },
  },
  {
    id: 'cdc7c7b2-6590-11ee-8c99-0242ac120002',
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
          foods: MENU,
        },
        {
          label: 'Chọn thêm',
          foods: CHON_THEM,
        },
        {
          label: 'Đồ uống',
          foods: DO_UONG,
        },
        {
          label: 'Món mới',
          foods: MON_MOI,
        },
      ],
    },
  },
  {
    id: 'd2c37522-6590-11ee-8c99-0242ac120002',
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
          foods: MENU,
        },
        {
          label: 'Chọn thêm',
          foods: CHON_THEM,
        },
        {
          label: 'Đồ uống',
          foods: DO_UONG,
        },
        {
          label: 'Món mới',
          foods: MON_MOI,
        },
      ],
    },
  },
  {
    id: 'd79ce01a-6590-11ee-8c99-0242ac120002',
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
          foods: MENU,
        },
        {
          label: 'Chọn thêm',
          foods: CHON_THEM,
        },
        {
          label: 'Đồ uống',
          foods: DO_UONG,
        },
        {
          label: 'Món mới',
          foods: MON_MOI,
        },
      ],
    },
  },
  {
    id: 'dcca6f9e-6590-11ee-8c99-0242ac120002',
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
          foods: MENU,
        },
        {
          label: 'Chọn thêm',
          foods: CHON_THEM,
        },
        {
          label: 'Đồ uống',
          foods: DO_UONG,
        },
        {
          label: 'Món mới',
          foods: MON_MOI,
        },
      ],
    },
  },
  {
    id: 'e1c673d0-6590-11ee-8c99-0242ac120002',
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
          foods: MENU,
        },
        {
          label: 'Chọn thêm',
          foods: CHON_THEM,
        },
        {
          label: 'Đồ uống',
          foods: DO_UONG,
        },
        {
          label: 'Món mới',
          foods: MON_MOI,
        },
      ],
    },
  },
  {
    id: 'e66db79a-6590-11ee-8c99-0242ac120002',
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
          foods: MENU,
        },
        {
          label: 'Chọn thêm',
          foods: CHON_THEM,
        },
        {
          label: 'Đồ uống',
          foods: DO_UONG,
        },
        {
          label: 'Món mới',
          foods: MON_MOI,
        },
      ],
    },
  },
  {
    id: 'ea8d80b2-6590-11ee-8c99-0242ac120002',
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
          foods: MENU,
        },
        {
          label: 'Chọn thêm',
          foods: CHON_THEM,
        },
        {
          label: 'Đồ uống',
          foods: DO_UONG,
        },
        {
          label: 'Món mới',
          foods: MON_MOI,
        },
      ],
    },
  },
  {
    id: 'efabf088-6590-11ee-8c99-0242ac120002',
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
          foods: MENU,
        },
        {
          label: 'Chọn thêm',
          foods: CHON_THEM,
        },
        {
          label: 'Đồ uống',
          foods: DO_UONG,
        },
        {
          label: 'Món mới',
          foods: MON_MOI,
        },
      ],
    },
  },
  {
    id: 'f4ae94dc-6590-11ee-8c99-0242ac120002',
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
          foods: MENU,
        },
        {
          label: 'Chọn thêm',
          foods: CHON_THEM,
        },
        {
          label: 'Đồ uống',
          foods: DO_UONG,
        },
        {
          label: 'Món mới',
          foods: MON_MOI,
        },
      ],
    },
  },
];
