import {createServer} from 'miragejs';

export default function setUpMirage(environment: string | undefined) {
  createServer({
    environment,
    routes() {
      this.get('/shop/:page', (_schema, request) => {
        let page = request.params.page;
        let offset: number = (Number(page) - 1) * 40;
        return shopInfo.slice(offset, offset + 40);
      });

      this.get('/shop/popular/:page', (_schema, request) => {
        let page = request.params.page;
        let offset: number = (Number(page) - 1) * 10;
        return shopInfo.slice(offset, offset + 10);
      });

      this.get('/shop/search', (_schema, request) => {
        let keywords = request.queryParams.q;
        if (!keywords) {
          return [];
        }
        const filteredData = shopInfo.filter(item =>
          item.name.toLowerCase().includes(keywords.toLowerCase()),
        );
        return filteredData;
      });
    },
  });
}

const shopInfo = [
  {
    id: '97b27cbe-658e-11ee-8c99-0242ac120002',
    name: 'Cơm Gà Xối Mỡ 142 - Ba Đình',
    address: '142 Ba Đình, P. 10, Quận 8, TP. HCM',
    image:
      'https://images.foody.vn/res/g2/11349/prof/s408x200/image-3111762a-200910114155.jpeg',
  },
  {
    id: 'b086e31a-658e-11ee-8c99-0242ac120002',
    name: 'Tiên Tiên - Bún Thái Cay - Phan Văn Trị',
    address: '317B Phan Văn Trị, P. 2, Quận 5, TP. HCM',
    image:
      'https://images.foody.vn/res/g97/963183/prof/s480x300/image-f472b1f5-200910114135.jpeg',
  },
  {
    id: 'b8319f74-658e-11ee-8c99-0242ac120002',
    name: 'Bún Bò Đất Thánh - Shop Online',
    address: '221/16 Đất Thánh, P. 6, Tân Bình, TP. HCM',
    image:
      'https://images.foody.vn/res/g103/1020115/prof/s460x300/foody-upload-api-foody-mobile-hmzz-200421103141.jpg',
  },
  {
    id: 'c29ad052-658e-11ee-8c99-0242ac120002',
    name: 'Tocotoco - Chung Cư Richstar - 278 Hòa Bình',
    address: 'Chung Cư Richstar, 278 Hòa Bình, P. Hiệp Tân, Tân Phú, TP. HCM',
    image:
      'https://images.foody.vn/res/g96/956871/prof/s460x300/foody-upload-api-foody-mobile-toco-toco-191008095032.jpg',
  },
  {
    id: 'cb626114-658e-11ee-8c99-0242ac120002',
    name: 'TocoToco Bubble Tea - Lê Văn Việt',
    address: '84 Lê Văn Việt, P. Hiệp Phú, Thành Phố Thủ Đức, TP. HCM',
    image:
      'https://images.foody.vn/res/g81/801344/prof/s640x400/image-9c40a4fe-210113164540.jpeg',
  },
  {
    id: 'd42e99b6-658e-11ee-8c99-0242ac120002',
    name: 'Gà Ta Tường Vy - Cơm Gà, Cháo & Gỏi Gà - Nguyễn Văn Quá',
    address: '661 Nguyễn Văn Quá, P. Đông Hưng Thuận, Quận 12, TP. HCM',
    image:
      'https://images.foody.vn/res/g81/801344/prof/s460x300/image-9c40a4fe-210113164540.jpeg',
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
  },
  {
    id: 'e53760ee-658e-11ee-8c99-0242ac120002',
    name: 'Zangzang Food - Gà Tươi Ủ Muối Cầu Kỳ',
    address: '226 Lê Đức Thọ, P. 6, Gò Vấp, TP. HCM',
    image:
      'https://images.foody.vn/res/g117/1163373/prof/s460x300/foody-upload-api-foody-mobile-fi-365302c3-230320112903.jpeg',
  },
  {
    id: 'ea8848ba-658e-11ee-8c99-0242ac120002',
    name: 'Mì Trộn Park Kim Thang - Phạm Văn Đồng',
    address: '259 Phạm Văn Đồng, P.1, Gò Vấp, TP. HCM',
    image:
      'https://images.foody.vn/res/g108/1076096/prof/s460x300/foody-upload-api-foody-mobile-36-e6f8587b-230729083030.jpeg',
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
  },
  {
    id: 'faca70e0-658e-11ee-8c99-0242ac120002',
    name: 'Bích Phong - Ăn Vặt & Gỏi Cuốn',
    address: 'Bích Phong - Ăn Vặt & Gỏi Cuốn',
    image:
      'https://images.foody.vn/res/g101/1001217/prof/s460x300/foody-upload-api-foody-mobile-co-772aaadd-211230181601.jpeg',
  },
  {
    id: '001936bc-658f-11ee-8c99-0242ac120002',
    name: 'Cô Liễu - Gỏi Cuốn',
    address: '11 Đường Số 8, P. Trường Thọ, Thành Phố Thủ Đức, TP. HCM',
    image:
      'https://images.foody.vn/res/g103/1029534/prof/s460x300/file_restaurant_photo_8qvk_16337-3e10e1e6-211008211144.jpg',
  },
  {
    id: '04f4c17e-658f-11ee-8c99-0242ac120002',
    name: 'Bánh Bò Thốt Nốt COCOCake - Lò Bánh Huỳnh Văn Bánh',
    address: '65A Huỳnh Văn Bánh, P. 17, Phú Nhuận, TP. HCM',
    image:
      'https://images.foody.vn/res/g70/692640/prof/s460x300/foody-upload-api-foody-mobile-21-190326132919.jpg',
  },
  {
    id: '099c3090-658f-11ee-8c99-0242ac120002',
    name: 'Tui Bán Trà - Tiệm Trà Chanh Hong Kong - Nguyễn Thượng Hiền',
    address: '230 Nguyễn Thượng Hiền, P. 4 , Quận 3, TP. HCM',
    image:
      'https://images.foody.vn/res/g104/1031515/prof/s460x300/foody-upload-api-foody-mobile-foody-upload-api-foo-200622155115.jpg',
  },
  {
    id: '0ee6afda-658f-11ee-8c99-0242ac120002',
    name: 'Cơm Gà Xối Mỡ 142 - Ba Đình',
    address: '142 Ba Đình, P. 10, Quận 8, TP. HCM',
    image:
      'https://images.foody.vn/res/g2/11349/prof/s408x200/image-3111762a-200910114155.jpeg',
  },
  {
    id: '137a59a2-658f-11ee-8c99-0242ac120002',
    name: 'Cơm Gà Xối Mỡ 142 - Ba Đình',
    address: '142 Ba Đình, P. 10, Quận 8, TP. HCM',
    image:
      'https://images.foody.vn/res/g2/11349/prof/s408x200/image-3111762a-200910114155.jpeg',
  },
  {
    id: '185dd08e-658f-11ee-8c99-0242ac120002',
    name: 'Cơm Gà Xối Mỡ 142 - Ba Đình',
    address: '142 Ba Đình, P. 10, Quận 8, TP. HCM',
    image:
      'https://images.foody.vn/res/g2/11349/prof/s408x200/image-3111762a-200910114155.jpeg',
  },
  {
    id: '1d1d7462-658f-11ee-8c99-0242ac120002',
    name: 'Cơm Gà Xối Mỡ 142 - Ba Đình',
    address: '142 Ba Đình, P. 10, Quận 8, TP. HCM',
    image:
      'https://images.foody.vn/res/g2/11349/prof/s408x200/image-3111762a-200910114155.jpeg',
  },
  {
    id: '221c4e20-658f-11ee-8c99-0242ac120002',
    name: 'Cơm Gà Xối Mỡ 142 - Ba Đình',
    address: '142 Ba Đình, P. 10, Quận 8, TP. HCM',
    image:
      'https://images.foody.vn/res/g2/11349/prof/s408x200/image-3111762a-200910114155.jpeg',
  },
  {
    id: '274d2d7e-658f-11ee-8c99-0242ac120002',
    name: 'Cơm Gà Xối Mỡ 142 - Ba Đình',
    address: '142 Ba Đình, P. 10, Quận 8, TP. HCM',
    image:
      'https://images.foody.vn/res/g2/11349/prof/s408x200/image-3111762a-200910114155.jpeg',
  },
  {
    id: '2e021e40-658f-11ee-8c99-0242ac120002',
    name: 'Tiên Tiên - Bún Thái Cay - Phan Văn Trị',
    address: '317B Phan Văn Trị, P. 2, Quận 5, TP. HCM',
    image:
      'https://images.foody.vn/res/g97/963183/prof/s640x400/image-f472b1f5-200910114135.jpeg',
  },
  {
    id: '33528524-658f-11ee-8c99-0242ac120002',
    name: 'Cơm Gà Xối Mỡ 142 - Ba Đình',
    address: '142 Ba Đình, P. 10, Quận 8, TP. HCM',
    image:
      'https://images.foody.vn/res/g2/11349/prof/s408x200/image-3111762a-200910114155.jpeg',
  },
  {
    id: '376bd93a-658f-11ee-8c99-0242ac120002',
    name: 'Cơm Gà Xối Mỡ 142 - Ba Đình',
    address: '142 Ba Đình, P. 10, Quận 8, TP. HCM',
    image:
      'https://images.foody.vn/res/g2/11349/prof/s408x200/image-3111762a-200910114155.jpeg',
  },
  {
    id: '3c58e23a-658f-11ee-8c99-0242ac120002',
    name: 'Cơm Gà Xối Mỡ 142 - Ba Đình',
    address: '142 Ba Đình, P. 10, Quận 8, TP. HCM',
    image:
      'https://images.foody.vn/res/g2/11349/prof/s408x200/image-3111762a-200910114155.jpeg',
  },
  {
    id: '406f59d0-658f-11ee-8c99-0242ac120002',
    name: 'Cơm Gà Xối Mỡ 142 - Ba Đình',
    address: '142 Ba Đình, P. 10, Quận 8, TP. HCM',
    image:
      'https://images.foody.vn/res/g2/11349/prof/s408x200/image-3111762a-200910114155.jpeg',
  },
  {
    id: '44c67324-658f-11ee-8c99-0242ac120002',
    name: 'Cơm Gà Xối Mỡ 142 - Ba Đình',
    address: '142 Ba Đình, P. 10, Quận 8, TP. HCM',
    image:
      'https://images.foody.vn/res/g2/11349/prof/s408x200/image-3111762a-200910114155.jpeg',
  },
  {
    id: '6eed62a2-658f-11ee-8c99-0242ac120002',
    name: 'Cơm Gà Xối Mỡ 142 - Ba Đình',
    address: '142 Ba Đình, P. 10, Quận 8, TP. HCM',
    image:
      'https://images.foody.vn/res/g2/11349/prof/s408x200/image-3111762a-200910114155.jpeg',
  },
  {
    id: '743e9d8e-658f-11ee-8c99-0242ac120002',
    name: 'Cơm Gà Xối Mỡ 142 - Ba Đình',
    address: '142 Ba Đình, P. 10, Quận 8, TP. HCM',
    image:
      'https://images.foody.vn/res/g2/11349/prof/s408x200/image-3111762a-200910114155.jpeg',
  },
  {
    id: '789a22b8-658f-11ee-8c99-0242ac120002',
    name: 'Cơm Gà Xối Mỡ 142 - Ba Đình',
    address: '142 Ba Đình, P. 10, Quận 8, TP. HCM',
    image:
      'https://images.foody.vn/res/g2/11349/prof/s408x200/image-3111762a-200910114155.jpeg',
  },
  {
    id: '7ed367f2-658f-11ee-8c99-0242ac120002',
    name: 'Cơm Gà Xối Mỡ 142 - Ba Đình',
    address: '142 Ba Đình, P. 10, Quận 8, TP. HCM',
    image:
      'https://images.foody.vn/res/g2/11349/prof/s408x200/image-3111762a-200910114155.jpeg',
  },
  {
    id: '83fd7b64-658f-11ee-8c99-0242ac120002',
    name: 'Cơm Gà Xối Mỡ 142 - Ba Đình',
    address: '142 Ba Đình, P. 10, Quận 8, TP. HCM',
    image:
      'https://images.foody.vn/res/g2/11349/prof/s408x200/image-3111762a-200910114155.jpeg',
  },
  {
    id: '88c5b260-658f-11ee-8c99-0242ac120002',
    name: 'Cơm Gà Xối Mỡ 142 - Ba Đình',
    address: '142 Ba Đình, P. 10, Quận 8, TP. HCM',
    image:
      'https://images.foody.vn/res/g2/11349/prof/s408x200/image-3111762a-200910114155.jpeg',
  },
  {
    id: '8e5742b6-658f-11ee-8c99-0242ac120002',
    name: 'Cơm Gà Xối Mỡ 142 - Ba Đình',
    address: '142 Ba Đình, P. 10, Quận 8, TP. HCM',
    image:
      'https://images.foody.vn/res/g2/11349/prof/s408x200/image-3111762a-200910114155.jpeg',
  },
  {
    id: '9429b570-658f-11ee-8c99-0242ac120002',
    name: 'Cơm Gà Xối Mỡ 142 - Ba Đình',
    address: '142 Ba Đình, P. 10, Quận 8, TP. HCM',
    image:
      'https://images.foody.vn/res/g2/11349/prof/s408x200/image-3111762a-200910114155.jpeg',
  },
  {
    id: '9bfad20c-658f-11ee-8c99-0242ac120002',
    name: 'Cơm Gà Xối Mỡ 142 - Ba Đình',
    address: '142 Ba Đình, P. 10, Quận 8, TP. HCM',
    image:
      'https://images.foody.vn/res/g2/11349/prof/s408x200/image-3111762a-200910114155.jpeg',
  },
  {
    id: 'a0cea43e-658f-11ee-8c99-0242ac120002',
    name: 'Cơm Gà Xối Mỡ 142 - Ba Đình',
    address: '142 Ba Đình, P. 10, Quận 8, TP. HCM',
    image:
      'https://images.foody.vn/res/g2/11349/prof/s408x200/image-3111762a-200910114155.jpeg',
  },
  {
    id: 'a5ec71d0-658f-11ee-8c99-0242ac120002',
    name: 'Cơm Gà Xối Mỡ 142 - Ba Đình',
    address: '142 Ba Đình, P. 10, Quận 8, TP. HCM',
    image:
      'https://images.foody.vn/res/g2/11349/prof/s408x200/image-3111762a-200910114155.jpeg',
  },
  {
    id: 'ab392b1a-658f-11ee-8c99-0242ac120002',
    name: 'Cơm Gà Xối Mỡ 142 - Ba Đình',
    address: '142 Ba Đình, P. 10, Quận 8, TP. HCM',
    image:
      'https://images.foody.vn/res/g2/11349/prof/s408x200/image-3111762a-200910114155.jpeg',
  },
  {
    id: 'bb8aa124-658f-11ee-8c99-0242ac120002',
    name: 'Cơm Gà Xối Mỡ 142 - Ba Đình',
    address: '142 Ba Đình, P. 10, Quận 8, TP. HCM',
    image:
      'https://images.foody.vn/res/g2/11349/prof/s408x200/image-3111762a-200910114155.jpeg',
  },
  {
    id: 'c68986f8-658f-11ee-8c99-0242ac120002',
    name: 'Cơm Gà Xối Mỡ 142 - Ba Đình',
    address: '142 Ba Đình, P. 10, Quận 8, TP. HCM',
    image:
      'https://images.foody.vn/res/g2/11349/prof/s408x200/image-3111762a-200910114155.jpeg',
  },
  {
    id: 'c100211a-658f-11ee-8c99-0242ac120002',
    name: 'Cơm Gà Xối Mỡ 142 - Ba Đình',
    address: '142 Ba Đình, P. 10, Quận 8, TP. HCM',
    image:
      'https://images.foody.vn/res/g2/11349/prof/s408x200/image-3111762a-200910114155.jpeg',
  },
  {
    id: 'cbc3b670-658f-11ee-8c99-0242ac120002',
    name: 'Cơm Gà Xối Mỡ 142 - Ba Đình',
    address: '142 Ba Đình, P. 10, Quận 8, TP. HCM',
    image:
      'https://images.foody.vn/res/g2/11349/prof/s408x200/image-3111762a-200910114155.jpeg',
  },
  {
    id: 'd1397bda-658f-11ee-8c99-0242ac120002',
    name: 'Cơm Gà Xối Mỡ 142 - Ba Đình',
    address: '142 Ba Đình, P. 10, Quận 8, TP. HCM',
    image:
      'https://images.foody.vn/res/g2/11349/prof/s408x200/image-3111762a-200910114155.jpeg',
  },
  {
    id: 'd64c5c64-658f-11ee-8c99-0242ac120002',
    name: 'Cơm Gà Xối Mỡ 142 - Ba Đình',
    address: '142 Ba Đình, P. 10, Quận 8, TP. HCM',
    image:
      'https://images.foody.vn/res/g2/11349/prof/s408x200/image-3111762a-200910114155.jpeg',
  },
  {
    id: 'db53d2fa-658f-11ee-8c99-0242ac120002',
    name: 'Cơm Gà Xối Mỡ 142 - Ba Đình',
    address: '142 Ba Đình, P. 10, Quận 8, TP. HCM',
    image:
      'https://images.foody.vn/res/g2/11349/prof/s408x200/image-3111762a-200910114155.jpeg',
  },
  {
    id: 'e5b4885c-658f-11ee-8c99-0242ac120002',
    name: 'Cơm Gà Xối Mỡ 142 - Ba Đình',
    address: '142 Ba Đình, P. 10, Quận 8, TP. HCM',
    image:
      'https://images.foody.vn/res/g2/11349/prof/s408x200/image-3111762a-200910114155.jpeg',
  },
  {
    id: 'eb77a256-658f-11ee-8c99-0242ac120002',
    name: 'Cơm Gà Xối Mỡ 142 - Ba Đình',
    address: '142 Ba Đình, P. 10, Quận 8, TP. HCM',
    image:
      'https://images.foody.vn/res/g2/11349/prof/s408x200/image-3111762a-200910114155.jpeg',
  },
  {
    id: 'f226602e-658f-11ee-8c99-0242ac120002',
    name: 'Cơm Gà Xối Mỡ 142 - Ba Đình',
    address: '142 Ba Đình, P. 10, Quận 8, TP. HCM',
    image:
      'https://images.foody.vn/res/g2/11349/prof/s408x200/image-3111762a-200910114155.jpeg',
  },
  {
    id: 'fc4cfde2-658f-11ee-8c99-0242ac120002',
    name: 'Cơm Gà Xối Mỡ 142 - Ba Đình',
    address: '142 Ba Đình, P. 10, Quận 8, TP. HCM',
    image:
      'https://images.foody.vn/res/g2/11349/prof/s408x200/image-3111762a-200910114155.jpeg',
  },
  {
    id: '013d7232-6590-11ee-8c99-0242ac120002',
    name: 'Cơm Gà Xối Mỡ 142 - Ba Đình',
    address: '142 Ba Đình, P. 10, Quận 8, TP. HCM',
    image:
      'https://images.foody.vn/res/g2/11349/prof/s408x200/image-3111762a-200910114155.jpeg',
  },
  {
    id: '07b9c4a8-6590-11ee-8c99-0242ac120002',
    name: 'Cơm Gà Xối Mỡ 142 - Ba Đình',
    address: '142 Ba Đình, P. 10, Quận 8, TP. HCM',
    image:
      'https://images.foody.vn/res/g2/11349/prof/s408x200/image-3111762a-200910114155.jpeg',
  },
  {
    id: '0d1edb2c-6590-11ee-8c99-0242ac120002',
    name: 'Cơm Gà Xối Mỡ 142 - Ba Đình',
    address: '142 Ba Đình, P. 10, Quận 8, TP. HCM',
    image:
      'https://images.foody.vn/res/g2/11349/prof/s408x200/image-3111762a-200910114155.jpeg',
  },
  {
    id: '15aa196e-6590-11ee-8c99-0242ac120002',
    name: 'Cơm Gà Xối Mỡ 142 - Ba Đình',
    address: '142 Ba Đình, P. 10, Quận 8, TP. HCM',
    image:
      'https://images.foody.vn/res/g2/11349/prof/s408x200/image-3111762a-200910114155.jpeg',
  },
  {
    id: '1a659f32-6590-11ee-8c99-0242ac120002',
    name: 'Cơm Gà Xối Mỡ 142 - Ba Đình',
    address: '142 Ba Đình, P. 10, Quận 8, TP. HCM',
    image:
      'https://images.foody.vn/res/g2/11349/prof/s408x200/image-3111762a-200910114155.jpeg',
  },
  {
    id: '1edfef2c-6590-11ee-8c99-0242ac120002',
    name: 'Cơm Gà Xối Mỡ 142 - Ba Đình',
    address: '142 Ba Đình, P. 10, Quận 8, TP. HCM',
    image:
      'https://images.foody.vn/res/g2/11349/prof/s408x200/image-3111762a-200910114155.jpeg',
  },
  {
    id: '24cf91d0-6590-11ee-8c99-0242ac120002',
    name: 'Cơm Gà Xối Mỡ 142 - Ba Đình',
    address: '142 Ba Đình, P. 10, Quận 8, TP. HCM',
    image:
      'https://images.foody.vn/res/g2/11349/prof/s408x200/image-3111762a-200910114155.jpeg',
  },
  {
    id: '29f4888c-6590-11ee-8c99-0242ac120002',
    name: 'Cơm Gà Xối Mỡ 142 - Ba Đình',
    address: '142 Ba Đình, P. 10, Quận 8, TP. HCM',
    image:
      'https://images.foody.vn/res/g2/11349/prof/s408x200/image-3111762a-200910114155.jpeg',
  },
  {
    id: '349c885c-6590-11ee-8c99-0242ac120002',
    name: 'Cơm Gà Xối Mỡ 142 - Ba Đình',
    address: '142 Ba Đình, P. 10, Quận 8, TP. HCM',
    image:
      'https://images.foody.vn/res/g2/11349/prof/s408x200/image-3111762a-200910114155.jpeg',
  },
  {
    id: '3a65a214-6590-11ee-8c99-0242ac120002',
    name: 'Cơm Gà Xối Mỡ 142 - Ba Đình',
    address: '142 Ba Đình, P. 10, Quận 8, TP. HCM',
    image:
      'https://images.foody.vn/res/g2/11349/prof/s408x200/image-3111762a-200910114155.jpeg',
  },
  {
    id: '3ef2c140-6590-11ee-8c99-0242ac120002',
    name: 'Cơm Gà Xối Mỡ 142 - Ba Đình',
    address: '142 Ba Đình, P. 10, Quận 8, TP. HCM',
    image:
      'https://images.foody.vn/res/g2/11349/prof/s408x200/image-3111762a-200910114155.jpeg',
  },
  {
    id: '44a981a0-6590-11ee-8c99-0242ac120002',
    name: 'Cơm Gà Xối Mỡ 142 - Ba Đình',
    address: '142 Ba Đình, P. 10, Quận 8, TP. HCM',
    image:
      'https://images.foody.vn/res/g2/11349/prof/s408x200/image-3111762a-200910114155.jpeg',
  },
  {
    id: '4b46614a-6590-11ee-8c99-0242ac120002',
    name: 'Cơm Gà Xối Mỡ 142 - Ba Đình',
    address: '142 Ba Đình, P. 10, Quận 8, TP. HCM',
    image:
      'https://images.foody.vn/res/g2/11349/prof/s408x200/image-3111762a-200910114155.jpeg',
  },
  {
    id: '50e92920-6590-11ee-8c99-0242ac120002',
    name: 'Cơm Gà Xối Mỡ 142 - Ba Đình',
    address: '142 Ba Đình, P. 10, Quận 8, TP. HCM',
    image:
      'https://images.foody.vn/res/g2/11349/prof/s408x200/image-3111762a-200910114155.jpeg',
  },
  {
    id: '5644ff20-6590-11ee-8c99-0242ac120002',
    name: 'Cơm Gà Xối Mỡ 142 - Ba Đình',
    address: '142 Ba Đình, P. 10, Quận 8, TP. HCM',
    image:
      'https://images.foody.vn/res/g2/11349/prof/s408x200/image-3111762a-200910114155.jpeg',
  },
  {
    id: '5aa40a2a-6590-11ee-8c99-0242ac120002',
    name: 'Cơm Gà Xối Mỡ 142 - Ba Đình',
    address: '142 Ba Đình, P. 10, Quận 8, TP. HCM',
    image:
      'https://images.foody.vn/res/g2/11349/prof/s408x200/image-3111762a-200910114155.jpeg',
  },
  {
    id: '5f135ce6-6590-11ee-8c99-0242ac120002',
    name: 'Cơm Gà Xối Mỡ 142 - Ba Đình',
    address: '142 Ba Đình, P. 10, Quận 8, TP. HCM',
    image:
      'https://images.foody.vn/res/g2/11349/prof/s408x200/image-3111762a-200910114155.jpeg',
  },
  {
    id: '6452c32c-6590-11ee-8c99-0242ac120002',
    name: 'Cơm Gà Xối Mỡ 142 - Ba Đình',
    address: '142 Ba Đình, P. 10, Quận 8, TP. HCM',
    image:
      'https://images.foody.vn/res/g2/11349/prof/s408x200/image-3111762a-200910114155.jpeg',
  },
  {
    id: '6951e0f6-6590-11ee-8c99-0242ac120002',
    name: 'Cơm Gà Xối Mỡ 142 - Ba Đình',
    address: '142 Ba Đình, P. 10, Quận 8, TP. HCM',
    image:
      'https://images.foody.vn/res/g2/11349/prof/s408x200/image-3111762a-200910114155.jpeg',
  },
  {
    id: '70560bca-6590-11ee-8c99-0242ac120002',
    name: 'Cơm Gà Xối Mỡ 142 - Ba Đình',
    address: '142 Ba Đình, P. 10, Quận 8, TP. HCM',
    image:
      'https://images.foody.vn/res/g2/11349/prof/s408x200/image-3111762a-200910114155.jpeg',
  },
  {
    id: '77a3c9b2-6590-11ee-8c99-0242ac120002',
    name: 'Cơm Gà Xối Mỡ 142 - Ba Đình',
    address: '142 Ba Đình, P. 10, Quận 8, TP. HCM',
    image:
      'https://images.foody.vn/res/g2/11349/prof/s408x200/image-3111762a-200910114155.jpeg',
  },
  {
    id: '7f10fd64-6590-11ee-8c99-0242ac120002',
    name: 'Cơm Gà Xối Mỡ 142 - Ba Đình',
    address: '142 Ba Đình, P. 10, Quận 8, TP. HCM',
    image:
      'https://images.foody.vn/res/g2/11349/prof/s408x200/image-3111762a-200910114155.jpeg',
  },
  {
    id: '85b5ec92-6590-11ee-8c99-0242ac120002',
    name: 'Cơm Gà Xối Mỡ 142 - Ba Đình',
    address: '142 Ba Đình, P. 10, Quận 8, TP. HCM',
    image:
      'https://images.foody.vn/res/g2/11349/prof/s408x200/image-3111762a-200910114155.jpeg',
  },
  {
    id: '8b00c262-6590-11ee-8c99-0242ac120002',
    name: 'Cơm Gà Xối Mỡ 142 - Ba Đình',
    address: '142 Ba Đình, P. 10, Quận 8, TP. HCM',
    image:
      'https://images.foody.vn/res/g2/11349/prof/s408x200/image-3111762a-200910114155.jpeg',
  },
  {
    id: '8fd87adc-6590-11ee-8c99-0242ac120002',
    name: 'Cơm Gà Xối Mỡ 142 - Ba Đình',
    address: '142 Ba Đình, P. 10, Quận 8, TP. HCM',
    image:
      'https://images.foody.vn/res/g2/11349/prof/s408x200/image-3111762a-200910114155.jpeg',
  },
  {
    id: '952b29c6-6590-11ee-8c99-0242ac120002',
    name: 'Cơm Gà Xối Mỡ 142 - Ba Đình',
    address: '142 Ba Đình, P. 10, Quận 8, TP. HCM',
    image:
      'https://images.foody.vn/res/g2/11349/prof/s408x200/image-3111762a-200910114155.jpeg',
  },
  {
    id: '99fe4dc0-6590-11ee-8c99-0242ac120002',
    name: 'Cơm Gà Xối Mỡ 142 - Ba Đình',
    address: '142 Ba Đình, P. 10, Quận 8, TP. HCM',
    image:
      'https://images.foody.vn/res/g2/11349/prof/s408x200/image-3111762a-200910114155.jpeg',
  },
  {
    id: 'a049fc06-6590-11ee-8c99-0242ac120002',
    name: 'Cơm Gà Xối Mỡ 142 - Ba Đình',
    address: '142 Ba Đình, P. 10, Quận 8, TP. HCM',
    image:
      'https://images.foody.vn/res/g2/11349/prof/s408x200/image-3111762a-200910114155.jpeg',
  },
  {
    id: 'a53bcc9e-6590-11ee-8c99-0242ac120002',
    name: 'Cơm Gà Xối Mỡ 142 - Ba Đình',
    address: '142 Ba Đình, P. 10, Quận 8, TP. HCM',
    image:
      'https://images.foody.vn/res/g2/11349/prof/s408x200/image-3111762a-200910114155.jpeg',
  },
  {
    id: 'a99e1cd8-6590-11ee-8c99-0242ac120002',
    name: 'Cơm Gà Xối Mỡ 142 - Ba Đình',
    address: '142 Ba Đình, P. 10, Quận 8, TP. HCM',
    image:
      'https://images.foody.vn/res/g2/11349/prof/s408x200/image-3111762a-200910114155.jpeg',
  },
  {
    id: 'aeec853a-6590-11ee-8c99-0242ac120002',
    name: 'Cơm Gà Xối Mỡ 142 - Ba Đình',
    address: '142 Ba Đình, P. 10, Quận 8, TP. HCM',
    image:
      'https://images.foody.vn/res/g2/11349/prof/s408x200/image-3111762a-200910114155.jpeg',
  },
  {
    id: 'b3e591f8-6590-11ee-8c99-0242ac120002',
    name: 'Cơm Gà Xối Mỡ 142 - Ba Đình',
    address: '142 Ba Đình, P. 10, Quận 8, TP. HCM',
    image:
      'https://images.foody.vn/res/g2/11349/prof/s408x200/image-3111762a-200910114155.jpeg',
  },
  {
    id: 'b8c9fdb2-6590-11ee-8c99-0242ac120002',
    name: 'Cơm Gà Xối Mỡ 142 - Ba Đình',
    address: '142 Ba Đình, P. 10, Quận 8, TP. HCM',
    image:
      'https://images.foody.vn/res/g2/11349/prof/s408x200/image-3111762a-200910114155.jpeg',
  },
  {
    id: 'be33b5cc-6590-11ee-8c99-0242ac120002',
    name: 'Cơm Gà Xối Mỡ 142 - Ba Đình',
    address: '142 Ba Đình, P. 10, Quận 8, TP. HCM',
    image:
      'https://images.foody.vn/res/g2/11349/prof/s408x200/image-3111762a-200910114155.jpeg',
  },
  {
    id: 'c33babec-6590-11ee-8c99-0242ac120002',
    name: 'Cơm Gà Xối Mỡ 142 - Ba Đình',
    address: '142 Ba Đình, P. 10, Quận 8, TP. HCM',
    image:
      'https://images.foody.vn/res/g2/11349/prof/s408x200/image-3111762a-200910114155.jpeg',
  },
  {
    id: 'c7c0a668-6590-11ee-8c99-0242ac120002',
    name: 'Cơm Gà Xối Mỡ 142 - Ba Đình',
    address: '142 Ba Đình, P. 10, Quận 8, TP. HCM',
    image:
      'https://images.foody.vn/res/g2/11349/prof/s408x200/image-3111762a-200910114155.jpeg',
  },
  {
    id: 'cdc7c7b2-6590-11ee-8c99-0242ac120002',
    name: 'Cơm Gà Xối Mỡ 142 - Ba Đình',
    address: '142 Ba Đình, P. 10, Quận 8, TP. HCM',
    image:
      'https://images.foody.vn/res/g2/11349/prof/s408x200/image-3111762a-200910114155.jpeg',
  },
  {
    id: 'd2c37522-6590-11ee-8c99-0242ac120002',
    name: 'Cơm Gà Xối Mỡ 142 - Ba Đình',
    address: '142 Ba Đình, P. 10, Quận 8, TP. HCM',
    image:
      'https://images.foody.vn/res/g2/11349/prof/s408x200/image-3111762a-200910114155.jpeg',
  },
  {
    id: 'd79ce01a-6590-11ee-8c99-0242ac120002',
    name: 'Cơm Gà Xối Mỡ 142 - Ba Đình',
    address: '142 Ba Đình, P. 10, Quận 8, TP. HCM',
    image:
      'https://images.foody.vn/res/g2/11349/prof/s408x200/image-3111762a-200910114155.jpeg',
  },
  {
    id: 'dcca6f9e-6590-11ee-8c99-0242ac120002',
    name: 'Cơm Gà Xối Mỡ 142 - Ba Đình',
    address: '142 Ba Đình, P. 10, Quận 8, TP. HCM',
    image:
      'https://images.foody.vn/res/g2/11349/prof/s408x200/image-3111762a-200910114155.jpeg',
  },
  {
    id: 'e1c673d0-6590-11ee-8c99-0242ac120002',
    name: 'Cơm Gà Xối Mỡ 142 - Ba Đình',
    address: '142 Ba Đình, P. 10, Quận 8, TP. HCM',
    image:
      'https://images.foody.vn/res/g2/11349/prof/s408x200/image-3111762a-200910114155.jpeg',
  },
  {
    id: 'e66db79a-6590-11ee-8c99-0242ac120002',
    name: 'Cơm Gà Xối Mỡ 142 - Ba Đình',
    address: '142 Ba Đình, P. 10, Quận 8, TP. HCM',
    image:
      'https://images.foody.vn/res/g2/11349/prof/s408x200/image-3111762a-200910114155.jpeg',
  },
  {
    id: 'ea8d80b2-6590-11ee-8c99-0242ac120002',
    name: 'Cơm Gà Xối Mỡ 142 - Ba Đình',
    address: '142 Ba Đình, P. 10, Quận 8, TP. HCM',
    image:
      'https://images.foody.vn/res/g2/11349/prof/s408x200/image-3111762a-200910114155.jpeg',
  },
  {
    id: 'efabf088-6590-11ee-8c99-0242ac120002',
    name: 'Cơm Gà Xối Mỡ 142 - Ba Đình',
    address: '142 Ba Đình, P. 10, Quận 8, TP. HCM',
    image:
      'https://images.foody.vn/res/g2/11349/prof/s408x200/image-3111762a-200910114155.jpeg',
  },
  {
    id: 'f4ae94dc-6590-11ee-8c99-0242ac120002',
    name: 'Cơm Gà Xối Mỡ 142 - Ba Đình',
    address: '142 Ba Đình, P. 10, Quận 8, TP. HCM',
    image:
      'https://images.foody.vn/res/g2/11349/prof/s408x200/image-3111762a-200910114155.jpeg',
  },
];
