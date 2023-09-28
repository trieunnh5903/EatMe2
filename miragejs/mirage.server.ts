import {nanoid} from '@reduxjs/toolkit';
import {createServer} from 'miragejs';

export default function setUpMirage(environment: string | undefined) {
  createServer({
    environment,
    routes() {
      this.get('/products/:page', (_schema, request) => {
        let page = request.params.page;
        let offset: number = (Number(page) - 1) * 40;
        return productsData.slice(offset, offset + 40);
      });

      this.get('/products/popular/:page', (_schema, request) => {
        let page = request.params.page;
        let offset: number = (Number(page) - 1) * 10;
        return productsData.slice(offset, offset + 10);
      });

      this.get('/products/search', (_schema, request) => {
        let keywords = request.queryParams.q;
        if (!keywords) {
          return [];
        }
        const filteredData = productsData.filter(item =>
          item.name.toLowerCase().includes(keywords.toLowerCase()),
        );
        return filteredData;
      });
    },
  });
}

const productsData = [
  {
    id: nanoid(),
    name: 'Cơm Gà Xối Mỡ 142 - Ba Đình',
    price: 20000,
    description: '142 Ba Đình, P. 10, Quận 8, TP. HCM',
    image:
      'https://images.foody.vn/res/g2/11349/prof/s408x200/image-3111762a-200910114155.jpeg',
  },
  {
    id: nanoid(),
    name: 'Tiên Tiên - Bún Thái Cay - Phan Văn Trị',
    price: 20000,
    description: '317B Phan Văn Trị, P. 2, Quận 5, TP. HCM',
    image:
      'https://images.foody.vn/res/g97/963183/prof/s480x300/image-f472b1f5-200910114135.jpeg',
  },
  {
    id: nanoid(),
    name: 'Bún Bò Đất Thánh - Shop Online',
    price: 20000,
    description: '221/16 Đất Thánh, P. 6, Tân Bình, TP. HCM',
    image:
      'https://images.foody.vn/res/g103/1020115/prof/s460x300/foody-upload-api-foody-mobile-hmzz-200421103141.jpg',
  },
  {
    id: nanoid(),
    name: 'Tocotoco - Chung Cư Richstar - 278 Hòa Bình',
    price: 20000,
    description:
      'Chung Cư Richstar, 278 Hòa Bình, P. Hiệp Tân, Tân Phú, TP. HCM',
    image:
      'https://images.foody.vn/res/g96/956871/prof/s460x300/foody-upload-api-foody-mobile-toco-toco-191008095032.jpg',
  },
  {
    id: nanoid(),
    name: 'TocoToco Bubble Tea - Lê Văn Việt',
    price: 20000,
    description: '84 Lê Văn Việt, P. Hiệp Phú, Thành Phố Thủ Đức, TP. HCM',
    image:
      'https://images.foody.vn/res/g81/801344/prof/s640x400/image-9c40a4fe-210113164540.jpeg',
  },
  {
    id: nanoid(),
    name: 'Gà Ta Tường Vy - Cơm Gà, Cháo & Gỏi Gà - Nguyễn Văn Quá',
    price: 20000,
    description: '661 Nguyễn Văn Quá, P. Đông Hưng Thuận, Quận 12, TP. HCM',
    image:
      'https://images.foody.vn/res/g81/801344/prof/s460x300/image-9c40a4fe-210113164540.jpeg',
  },
  {
    id: nanoid(),
    name: 'Anh Cường Bakery - Bánh Cua Phô Mai - Nguyễn Văn Lạc',
    price: 20000,
    description: '32 Nguyễn Văn Lạc, P. 19, Bình Thạnh, TP. HCM',
    image:
      'https://images.foody.vn/res/g79/781832/prof/s460x300/foody-upload-api-foody-mobile-banhkembap1-jpg-181002153458.jpg',
  },
  {
    id: nanoid(),
    name: 'Tâm Ký II - Cơm Chiên & Nui Xào - Đường 50',
    price: 20000,
    description: '10 Đường số 50, P. 5, Quận 4, Quận 4, TP. HCM',
    image:
      'https://images.foody.vn/res/g117/1163333/prof/s460x300/foody-upload-api-foody-mobile-ta-f8e92a47-230304194500.jpeg',
  },
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
  {
    id: nanoid(),
    name: 'Bích Phong - Ăn Vặt & Gỏi Cuốn',
    price: 20000,
    description: 'Bích Phong - Ăn Vặt & Gỏi Cuốn',
    image:
      'https://images.foody.vn/res/g101/1001217/prof/s460x300/foody-upload-api-foody-mobile-co-772aaadd-211230181601.jpeg',
  },
  {
    id: nanoid(),
    name: 'Cô Liễu - Gỏi Cuốn',
    price: 20000,
    description: '11 Đường Số 8, P. Trường Thọ, Thành Phố Thủ Đức, TP. HCM',
    image:
      'https://images.foody.vn/res/g103/1029534/prof/s460x300/file_restaurant_photo_8qvk_16337-3e10e1e6-211008211144.jpg',
  },
  {
    id: nanoid(),
    name: 'Bánh Bò Thốt Nốt COCOCake - Lò Bánh Huỳnh Văn Bánh',
    price: 20000,
    description: '65A Huỳnh Văn Bánh, P. 17, Phú Nhuận, TP. HCM',
    image:
      'https://images.foody.vn/res/g70/692640/prof/s460x300/foody-upload-api-foody-mobile-21-190326132919.jpg',
  },
  {
    id: nanoid(),
    name: 'Tui Bán Trà - Tiệm Trà Chanh Hong Kong - Nguyễn Thượng Hiền',
    price: 20000,
    description: '230 Nguyễn Thượng Hiền, P. 4 , Quận 3, TP. HCM',
    image:
      'https://images.foody.vn/res/g104/1031515/prof/s460x300/foody-upload-api-foody-mobile-foody-upload-api-foo-200622155115.jpg',
  },
  {
    id: nanoid(),
    name: 'Cơm Gà Xối Mỡ 142 - Ba Đình',
    price: 20000,
    description: '142 Ba Đình, P. 10, Quận 8, TP. HCM',
    image:
      'https://images.foody.vn/res/g2/11349/prof/s408x200/image-3111762a-200910114155.jpeg',
  },
  {
    id: nanoid(),
    name: 'Cơm Gà Xối Mỡ 142 - Ba Đình',
    price: 20000,
    description: '142 Ba Đình, P. 10, Quận 8, TP. HCM',
    image:
      'https://images.foody.vn/res/g2/11349/prof/s408x200/image-3111762a-200910114155.jpeg',
  },
  {
    id: nanoid(),
    name: 'Cơm Gà Xối Mỡ 142 - Ba Đình',
    price: 20000,
    description: '142 Ba Đình, P. 10, Quận 8, TP. HCM',
    image:
      'https://images.foody.vn/res/g2/11349/prof/s408x200/image-3111762a-200910114155.jpeg',
  },
  {
    id: nanoid(),
    name: 'Cơm Gà Xối Mỡ 142 - Ba Đình',
    price: 20000,
    description: '142 Ba Đình, P. 10, Quận 8, TP. HCM',
    image:
      'https://images.foody.vn/res/g2/11349/prof/s408x200/image-3111762a-200910114155.jpeg',
  },
  {
    id: nanoid(),
    name: 'Cơm Gà Xối Mỡ 142 - Ba Đình',
    price: 20000,
    description: '142 Ba Đình, P. 10, Quận 8, TP. HCM',
    image:
      'https://images.foody.vn/res/g2/11349/prof/s408x200/image-3111762a-200910114155.jpeg',
  },
  {
    id: nanoid(),
    name: 'Cơm Gà Xối Mỡ 142 - Ba Đình',
    price: 20000,
    description: '142 Ba Đình, P. 10, Quận 8, TP. HCM',
    image:
      'https://images.foody.vn/res/g2/11349/prof/s408x200/image-3111762a-200910114155.jpeg',
  },
  {
    id: nanoid(),
    name: 'Tiên Tiên - Bún Thái Cay - Phan Văn Trị',
    price: 20000,
    description: '317B Phan Văn Trị, P. 2, Quận 5, TP. HCM',
    image:
      'https://images.foody.vn/res/g97/963183/prof/s640x400/image-f472b1f5-200910114135.jpeg',
  },
  {
    id: nanoid(),
    name: 'Cơm Gà Xối Mỡ 142 - Ba Đình',
    price: 20000,
    description: '142 Ba Đình, P. 10, Quận 8, TP. HCM',
    image:
      'https://images.foody.vn/res/g2/11349/prof/s408x200/image-3111762a-200910114155.jpeg',
  },
  {
    id: nanoid(),
    name: 'Cơm Gà Xối Mỡ 142 - Ba Đình',
    price: 20000,
    description: '142 Ba Đình, P. 10, Quận 8, TP. HCM',
    image:
      'https://images.foody.vn/res/g2/11349/prof/s408x200/image-3111762a-200910114155.jpeg',
  },
  {
    id: nanoid(),
    name: 'Cơm Gà Xối Mỡ 142 - Ba Đình',
    price: 20000,
    description: '142 Ba Đình, P. 10, Quận 8, TP. HCM',
    image:
      'https://images.foody.vn/res/g2/11349/prof/s408x200/image-3111762a-200910114155.jpeg',
  },
  {
    id: nanoid(),
    name: 'Cơm Gà Xối Mỡ 142 - Ba Đình',
    price: 20000,
    description: '142 Ba Đình, P. 10, Quận 8, TP. HCM',
    image:
      'https://images.foody.vn/res/g2/11349/prof/s408x200/image-3111762a-200910114155.jpeg',
  },
  {
    id: nanoid(),
    name: 'Cơm Gà Xối Mỡ 142 - Ba Đình',
    price: 20000,
    description: '142 Ba Đình, P. 10, Quận 8, TP. HCM',
    image:
      'https://images.foody.vn/res/g2/11349/prof/s408x200/image-3111762a-200910114155.jpeg',
  },
  {
    id: nanoid(),
    name: 'Cơm Gà Xối Mỡ 142 - Ba Đình',
    price: 20000,
    description: '142 Ba Đình, P. 10, Quận 8, TP. HCM',
    image:
      'https://images.foody.vn/res/g2/11349/prof/s408x200/image-3111762a-200910114155.jpeg',
  },
  {
    id: nanoid(),
    name: 'Cơm Gà Xối Mỡ 142 - Ba Đình',
    price: 20000,
    description: '142 Ba Đình, P. 10, Quận 8, TP. HCM',
    image:
      'https://images.foody.vn/res/g2/11349/prof/s408x200/image-3111762a-200910114155.jpeg',
  },
  {
    id: nanoid(),
    name: 'Cơm Gà Xối Mỡ 142 - Ba Đình',
    price: 20000,
    description: '142 Ba Đình, P. 10, Quận 8, TP. HCM',
    image:
      'https://images.foody.vn/res/g2/11349/prof/s408x200/image-3111762a-200910114155.jpeg',
  },
  {
    id: nanoid(),
    name: 'Cơm Gà Xối Mỡ 142 - Ba Đình',
    price: 20000,
    description: '142 Ba Đình, P. 10, Quận 8, TP. HCM',
    image:
      'https://images.foody.vn/res/g2/11349/prof/s408x200/image-3111762a-200910114155.jpeg',
  },
  {
    id: nanoid(),
    name: 'Cơm Gà Xối Mỡ 142 - Ba Đình',
    price: 20000,
    description: '142 Ba Đình, P. 10, Quận 8, TP. HCM',
    image:
      'https://images.foody.vn/res/g2/11349/prof/s408x200/image-3111762a-200910114155.jpeg',
  },
  {
    id: nanoid(),
    name: 'Cơm Gà Xối Mỡ 142 - Ba Đình',
    price: 20000,
    description: '142 Ba Đình, P. 10, Quận 8, TP. HCM',
    image:
      'https://images.foody.vn/res/g2/11349/prof/s408x200/image-3111762a-200910114155.jpeg',
  },
  {
    id: nanoid(),
    name: 'Cơm Gà Xối Mỡ 142 - Ba Đình',
    price: 20000,
    description: '142 Ba Đình, P. 10, Quận 8, TP. HCM',
    image:
      'https://images.foody.vn/res/g2/11349/prof/s408x200/image-3111762a-200910114155.jpeg',
  },
  {
    id: nanoid(),
    name: 'Cơm Gà Xối Mỡ 142 - Ba Đình',
    price: 20000,
    description: '142 Ba Đình, P. 10, Quận 8, TP. HCM',
    image:
      'https://images.foody.vn/res/g2/11349/prof/s408x200/image-3111762a-200910114155.jpeg',
  },
  {
    id: nanoid(),
    name: 'Cơm Gà Xối Mỡ 142 - Ba Đình',
    price: 20000,
    description: '142 Ba Đình, P. 10, Quận 8, TP. HCM',
    image:
      'https://images.foody.vn/res/g2/11349/prof/s408x200/image-3111762a-200910114155.jpeg',
  },
  {
    id: nanoid(),
    name: 'Cơm Gà Xối Mỡ 142 - Ba Đình',
    price: 20000,
    description: '142 Ba Đình, P. 10, Quận 8, TP. HCM',
    image:
      'https://images.foody.vn/res/g2/11349/prof/s408x200/image-3111762a-200910114155.jpeg',
  },
  {
    id: nanoid(),
    name: 'Cơm Gà Xối Mỡ 142 - Ba Đình',
    price: 20000,
    description: '142 Ba Đình, P. 10, Quận 8, TP. HCM',
    image:
      'https://images.foody.vn/res/g2/11349/prof/s408x200/image-3111762a-200910114155.jpeg',
  },
  {
    id: nanoid(),
    name: 'Cơm Gà Xối Mỡ 142 - Ba Đình',
    price: 20000,
    description: '142 Ba Đình, P. 10, Quận 8, TP. HCM',
    image:
      'https://images.foody.vn/res/g2/11349/prof/s408x200/image-3111762a-200910114155.jpeg',
  },
  {
    id: nanoid(),
    name: 'Cơm Gà Xối Mỡ 142 - Ba Đình',
    price: 20000,
    description: '142 Ba Đình, P. 10, Quận 8, TP. HCM',
    image:
      'https://images.foody.vn/res/g2/11349/prof/s408x200/image-3111762a-200910114155.jpeg',
  },
  {
    id: nanoid(),
    name: 'Cơm Gà Xối Mỡ 142 - Ba Đình',
    price: 20000,
    description: '142 Ba Đình, P. 10, Quận 8, TP. HCM',
    image:
      'https://images.foody.vn/res/g2/11349/prof/s408x200/image-3111762a-200910114155.jpeg',
  },
  {
    id: nanoid(),
    name: 'Cơm Gà Xối Mỡ 142 - Ba Đình',
    price: 20000,
    description: '142 Ba Đình, P. 10, Quận 8, TP. HCM',
    image:
      'https://images.foody.vn/res/g2/11349/prof/s408x200/image-3111762a-200910114155.jpeg',
  },
  {
    id: nanoid(),
    name: 'Cơm Gà Xối Mỡ 142 - Ba Đình',
    price: 20000,
    description: '142 Ba Đình, P. 10, Quận 8, TP. HCM',
    image:
      'https://images.foody.vn/res/g2/11349/prof/s408x200/image-3111762a-200910114155.jpeg',
  },
  {
    id: nanoid(),
    name: 'Cơm Gà Xối Mỡ 142 - Ba Đình',
    price: 20000,
    description: '142 Ba Đình, P. 10, Quận 8, TP. HCM',
    image:
      'https://images.foody.vn/res/g2/11349/prof/s408x200/image-3111762a-200910114155.jpeg',
  },
  {
    id: nanoid(),
    name: 'Cơm Gà Xối Mỡ 142 - Ba Đình',
    price: 20000,
    description: '142 Ba Đình, P. 10, Quận 8, TP. HCM',
    image:
      'https://images.foody.vn/res/g2/11349/prof/s408x200/image-3111762a-200910114155.jpeg',
  },
  {
    id: nanoid(),
    name: 'Cơm Gà Xối Mỡ 142 - Ba Đình',
    price: 20000,
    description: '142 Ba Đình, P. 10, Quận 8, TP. HCM',
    image:
      'https://images.foody.vn/res/g2/11349/prof/s408x200/image-3111762a-200910114155.jpeg',
  },
  {
    id: nanoid(),
    name: 'Cơm Gà Xối Mỡ 142 - Ba Đình',
    price: 20000,
    description: '142 Ba Đình, P. 10, Quận 8, TP. HCM',
    image:
      'https://images.foody.vn/res/g2/11349/prof/s408x200/image-3111762a-200910114155.jpeg',
  },
  {
    id: nanoid(),
    name: 'Cơm Gà Xối Mỡ 142 - Ba Đình',
    price: 20000,
    description: '142 Ba Đình, P. 10, Quận 8, TP. HCM',
    image:
      'https://images.foody.vn/res/g2/11349/prof/s408x200/image-3111762a-200910114155.jpeg',
  },
  {
    id: nanoid(),
    name: 'Cơm Gà Xối Mỡ 142 - Ba Đình',
    price: 20000,
    description: '142 Ba Đình, P. 10, Quận 8, TP. HCM',
    image:
      'https://images.foody.vn/res/g2/11349/prof/s408x200/image-3111762a-200910114155.jpeg',
  },
  {
    id: nanoid(),
    name: 'Cơm Gà Xối Mỡ 142 - Ba Đình',
    price: 20000,
    description: '142 Ba Đình, P. 10, Quận 8, TP. HCM',
    image:
      'https://images.foody.vn/res/g2/11349/prof/s408x200/image-3111762a-200910114155.jpeg',
  },
  {
    id: nanoid(),
    name: 'Cơm Gà Xối Mỡ 142 - Ba Đình',
    price: 20000,
    description: '142 Ba Đình, P. 10, Quận 8, TP. HCM',
    image:
      'https://images.foody.vn/res/g2/11349/prof/s408x200/image-3111762a-200910114155.jpeg',
  },
  {
    id: nanoid(),
    name: 'Cơm Gà Xối Mỡ 142 - Ba Đình',
    price: 20000,
    description: '142 Ba Đình, P. 10, Quận 8, TP. HCM',
    image:
      'https://images.foody.vn/res/g2/11349/prof/s408x200/image-3111762a-200910114155.jpeg',
  },
  {
    id: nanoid(),
    name: 'Cơm Gà Xối Mỡ 142 - Ba Đình',
    price: 20000,
    description: '142 Ba Đình, P. 10, Quận 8, TP. HCM',
    image:
      'https://images.foody.vn/res/g2/11349/prof/s408x200/image-3111762a-200910114155.jpeg',
  },
  {
    id: nanoid(),
    name: 'Cơm Gà Xối Mỡ 142 - Ba Đình',
    price: 20000,
    description: '142 Ba Đình, P. 10, Quận 8, TP. HCM',
    image:
      'https://images.foody.vn/res/g2/11349/prof/s408x200/image-3111762a-200910114155.jpeg',
  },
  {
    id: nanoid(),
    name: 'Cơm Gà Xối Mỡ 142 - Ba Đình',
    price: 20000,
    description: '142 Ba Đình, P. 10, Quận 8, TP. HCM',
    image:
      'https://images.foody.vn/res/g2/11349/prof/s408x200/image-3111762a-200910114155.jpeg',
  },
  {
    id: nanoid(),
    name: 'Cơm Gà Xối Mỡ 142 - Ba Đình',
    price: 20000,
    description: '142 Ba Đình, P. 10, Quận 8, TP. HCM',
    image:
      'https://images.foody.vn/res/g2/11349/prof/s408x200/image-3111762a-200910114155.jpeg',
  },
  {
    id: nanoid(),
    name: 'Cơm Gà Xối Mỡ 142 - Ba Đình',
    price: 20000,
    description: '142 Ba Đình, P. 10, Quận 8, TP. HCM',
    image:
      'https://images.foody.vn/res/g2/11349/prof/s408x200/image-3111762a-200910114155.jpeg',
  },
  {
    id: nanoid(),
    name: 'Cơm Gà Xối Mỡ 142 - Ba Đình',
    price: 20000,
    description: '142 Ba Đình, P. 10, Quận 8, TP. HCM',
    image:
      'https://images.foody.vn/res/g2/11349/prof/s408x200/image-3111762a-200910114155.jpeg',
  },
  {
    id: nanoid(),
    name: 'Cơm Gà Xối Mỡ 142 - Ba Đình',
    price: 20000,
    description: '142 Ba Đình, P. 10, Quận 8, TP. HCM',
    image:
      'https://images.foody.vn/res/g2/11349/prof/s408x200/image-3111762a-200910114155.jpeg',
  },
  {
    id: nanoid(),
    name: 'Cơm Gà Xối Mỡ 142 - Ba Đình',
    price: 20000,
    description: '142 Ba Đình, P. 10, Quận 8, TP. HCM',
    image:
      'https://images.foody.vn/res/g2/11349/prof/s408x200/image-3111762a-200910114155.jpeg',
  },
  {
    id: nanoid(),
    name: 'Cơm Gà Xối Mỡ 142 - Ba Đình',
    price: 20000,
    description: '142 Ba Đình, P. 10, Quận 8, TP. HCM',
    image:
      'https://images.foody.vn/res/g2/11349/prof/s408x200/image-3111762a-200910114155.jpeg',
  },
  {
    id: nanoid(),
    name: 'Cơm Gà Xối Mỡ 142 - Ba Đình',
    price: 20000,
    description: '142 Ba Đình, P. 10, Quận 8, TP. HCM',
    image:
      'https://images.foody.vn/res/g2/11349/prof/s408x200/image-3111762a-200910114155.jpeg',
  },
  {
    id: nanoid(),
    name: 'Cơm Gà Xối Mỡ 142 - Ba Đình',
    price: 20000,
    description: '142 Ba Đình, P. 10, Quận 8, TP. HCM',
    image:
      'https://images.foody.vn/res/g2/11349/prof/s408x200/image-3111762a-200910114155.jpeg',
  },
  {
    id: nanoid(),
    name: 'Cơm Gà Xối Mỡ 142 - Ba Đình',
    price: 20000,
    description: '142 Ba Đình, P. 10, Quận 8, TP. HCM',
    image:
      'https://images.foody.vn/res/g2/11349/prof/s408x200/image-3111762a-200910114155.jpeg',
  },
  {
    id: nanoid(),
    name: 'Cơm Gà Xối Mỡ 142 - Ba Đình',
    price: 20000,
    description: '142 Ba Đình, P. 10, Quận 8, TP. HCM',
    image:
      'https://images.foody.vn/res/g2/11349/prof/s408x200/image-3111762a-200910114155.jpeg',
  },
  {
    id: nanoid(),
    name: 'Cơm Gà Xối Mỡ 142 - Ba Đình',
    price: 20000,
    description: '142 Ba Đình, P. 10, Quận 8, TP. HCM',
    image:
      'https://images.foody.vn/res/g2/11349/prof/s408x200/image-3111762a-200910114155.jpeg',
  },
  {
    id: nanoid(),
    name: 'Cơm Gà Xối Mỡ 142 - Ba Đình',
    price: 20000,
    description: '142 Ba Đình, P. 10, Quận 8, TP. HCM',
    image:
      'https://images.foody.vn/res/g2/11349/prof/s408x200/image-3111762a-200910114155.jpeg',
  },
  {
    id: nanoid(),
    name: 'Cơm Gà Xối Mỡ 142 - Ba Đình',
    price: 20000,
    description: '142 Ba Đình, P. 10, Quận 8, TP. HCM',
    image:
      'https://images.foody.vn/res/g2/11349/prof/s408x200/image-3111762a-200910114155.jpeg',
  },
  {
    id: nanoid(),
    name: 'Cơm Gà Xối Mỡ 142 - Ba Đình',
    price: 20000,
    description: '142 Ba Đình, P. 10, Quận 8, TP. HCM',
    image:
      'https://images.foody.vn/res/g2/11349/prof/s408x200/image-3111762a-200910114155.jpeg',
  },
  {
    id: nanoid(),
    name: 'Cơm Gà Xối Mỡ 142 - Ba Đình',
    price: 20000,
    description: '142 Ba Đình, P. 10, Quận 8, TP. HCM',
    image:
      'https://images.foody.vn/res/g2/11349/prof/s408x200/image-3111762a-200910114155.jpeg',
  },
  {
    id: nanoid(),
    name: 'Cơm Gà Xối Mỡ 142 - Ba Đình',
    price: 20000,
    description: '142 Ba Đình, P. 10, Quận 8, TP. HCM',
    image:
      'https://images.foody.vn/res/g2/11349/prof/s408x200/image-3111762a-200910114155.jpeg',
  },
  {
    id: nanoid(),
    name: 'Cơm Gà Xối Mỡ 142 - Ba Đình',
    price: 20000,
    description: '142 Ba Đình, P. 10, Quận 8, TP. HCM',
    image:
      'https://images.foody.vn/res/g2/11349/prof/s408x200/image-3111762a-200910114155.jpeg',
  },
  {
    id: nanoid(),
    name: 'Cơm Gà Xối Mỡ 142 - Ba Đình',
    price: 20000,
    description: '142 Ba Đình, P. 10, Quận 8, TP. HCM',
    image:
      'https://images.foody.vn/res/g2/11349/prof/s408x200/image-3111762a-200910114155.jpeg',
  },
  {
    id: nanoid(),
    name: 'Cơm Gà Xối Mỡ 142 - Ba Đình',
    price: 20000,
    description: '142 Ba Đình, P. 10, Quận 8, TP. HCM',
    image:
      'https://images.foody.vn/res/g2/11349/prof/s408x200/image-3111762a-200910114155.jpeg',
  },
  {
    id: nanoid(),
    name: 'Cơm Gà Xối Mỡ 142 - Ba Đình',
    price: 20000,
    description: '142 Ba Đình, P. 10, Quận 8, TP. HCM',
    image:
      'https://images.foody.vn/res/g2/11349/prof/s408x200/image-3111762a-200910114155.jpeg',
  },
  {
    id: nanoid(),
    name: 'Cơm Gà Xối Mỡ 142 - Ba Đình',
    price: 20000,
    description: '142 Ba Đình, P. 10, Quận 8, TP. HCM',
    image:
      'https://images.foody.vn/res/g2/11349/prof/s408x200/image-3111762a-200910114155.jpeg',
  },
  {
    id: nanoid(),
    name: 'Cơm Gà Xối Mỡ 142 - Ba Đình',
    price: 20000,
    description: '142 Ba Đình, P. 10, Quận 8, TP. HCM',
    image:
      'https://images.foody.vn/res/g2/11349/prof/s408x200/image-3111762a-200910114155.jpeg',
  },
  {
    id: nanoid(),
    name: 'Cơm Gà Xối Mỡ 142 - Ba Đình',
    price: 20000,
    description: '142 Ba Đình, P. 10, Quận 8, TP. HCM',
    image:
      'https://images.foody.vn/res/g2/11349/prof/s408x200/image-3111762a-200910114155.jpeg',
  },
  {
    id: nanoid(),
    name: 'Cơm Gà Xối Mỡ 142 - Ba Đình',
    price: 20000,
    description: '142 Ba Đình, P. 10, Quận 8, TP. HCM',
    image:
      'https://images.foody.vn/res/g2/11349/prof/s408x200/image-3111762a-200910114155.jpeg',
  },
  {
    id: nanoid(),
    name: 'Cơm Gà Xối Mỡ 142 - Ba Đình',
    price: 20000,
    description: '142 Ba Đình, P. 10, Quận 8, TP. HCM',
    image:
      'https://images.foody.vn/res/g2/11349/prof/s408x200/image-3111762a-200910114155.jpeg',
  },
  {
    id: nanoid(),
    name: 'Cơm Gà Xối Mỡ 142 - Ba Đình',
    price: 20000,
    description: '142 Ba Đình, P. 10, Quận 8, TP. HCM',
    image:
      'https://images.foody.vn/res/g2/11349/prof/s408x200/image-3111762a-200910114155.jpeg',
  },
  {
    id: nanoid(),
    name: 'Cơm Gà Xối Mỡ 142 - Ba Đình',
    price: 20000,
    description: '142 Ba Đình, P. 10, Quận 8, TP. HCM',
    image:
      'https://images.foody.vn/res/g2/11349/prof/s408x200/image-3111762a-200910114155.jpeg',
  },
  {
    id: nanoid(),
    name: 'Cơm Gà Xối Mỡ 142 - Ba Đình',
    price: 20000,
    description: '142 Ba Đình, P. 10, Quận 8, TP. HCM',
    image:
      'https://images.foody.vn/res/g2/11349/prof/s408x200/image-3111762a-200910114155.jpeg',
  },
  {
    id: nanoid(),
    name: 'Cơm Gà Xối Mỡ 142 - Ba Đình',
    price: 20000,
    description: '142 Ba Đình, P. 10, Quận 8, TP. HCM',
    image:
      'https://images.foody.vn/res/g2/11349/prof/s408x200/image-3111762a-200910114155.jpeg',
  },
  {
    id: nanoid(),
    name: 'Cơm Gà Xối Mỡ 142 - Ba Đình',
    price: 20000,
    description: '142 Ba Đình, P. 10, Quận 8, TP. HCM',
    image:
      'https://images.foody.vn/res/g2/11349/prof/s408x200/image-3111762a-200910114155.jpeg',
  },
  {
    id: nanoid(),
    name: 'Cơm Gà Xối Mỡ 142 - Ba Đình',
    price: 20000,
    description: '142 Ba Đình, P. 10, Quận 8, TP. HCM',
    image:
      'https://images.foody.vn/res/g2/11349/prof/s408x200/image-3111762a-200910114155.jpeg',
  },
  {
    id: nanoid(),
    name: 'Cơm Gà Xối Mỡ 142 - Ba Đình',
    price: 20000,
    description: '142 Ba Đình, P. 10, Quận 8, TP. HCM',
    image:
      'https://images.foody.vn/res/g2/11349/prof/s408x200/image-3111762a-200910114155.jpeg',
  },
  {
    id: nanoid(),
    name: 'Cơm Gà Xối Mỡ 142 - Ba Đình',
    price: 20000,
    description: '142 Ba Đình, P. 10, Quận 8, TP. HCM',
    image:
      'https://images.foody.vn/res/g2/11349/prof/s408x200/image-3111762a-200910114155.jpeg',
  },
  {
    id: nanoid(),
    name: 'Cơm Gà Xối Mỡ 142 - Ba Đình',
    price: 20000,
    description: '142 Ba Đình, P. 10, Quận 8, TP. HCM',
    image:
      'https://images.foody.vn/res/g2/11349/prof/s408x200/image-3111762a-200910114155.jpeg',
  },
  {
    id: nanoid(),
    name: 'Cơm Gà Xối Mỡ 142 - Ba Đình',
    price: 20000,
    description: '142 Ba Đình, P. 10, Quận 8, TP. HCM',
    image:
      'https://images.foody.vn/res/g2/11349/prof/s408x200/image-3111762a-200910114155.jpeg',
  },
  {
    id: nanoid(),
    name: 'Cơm Gà Xối Mỡ 142 - Ba Đình',
    price: 20000,
    description: '142 Ba Đình, P. 10, Quận 8, TP. HCM',
    image:
      'https://images.foody.vn/res/g2/11349/prof/s408x200/image-3111762a-200910114155.jpeg',
  },
  {
    id: nanoid(),
    name: 'Cơm Gà Xối Mỡ 142 - Ba Đình',
    price: 20000,
    description: '142 Ba Đình, P. 10, Quận 8, TP. HCM',
    image:
      'https://images.foody.vn/res/g2/11349/prof/s408x200/image-3111762a-200910114155.jpeg',
  },
  {
    id: nanoid(),
    name: 'Cơm Gà Xối Mỡ 142 - Ba Đình',
    price: 20000,
    description: '142 Ba Đình, P. 10, Quận 8, TP. HCM',
    image:
      'https://images.foody.vn/res/g2/11349/prof/s408x200/image-3111762a-200910114155.jpeg',
  },
  {
    id: nanoid(),
    name: 'Cơm Gà Xối Mỡ 142 - Ba Đình',
    price: 20000,
    description: '142 Ba Đình, P. 10, Quận 8, TP. HCM',
    image:
      'https://images.foody.vn/res/g2/11349/prof/s408x200/image-3111762a-200910114155.jpeg',
  },
  {
    id: nanoid(),
    name: 'Cơm Gà Xối Mỡ 142 - Ba Đình',
    price: 20000,
    description: '142 Ba Đình, P. 10, Quận 8, TP. HCM',
    image:
      'https://images.foody.vn/res/g2/11349/prof/s408x200/image-3111762a-200910114155.jpeg',
  },
];
