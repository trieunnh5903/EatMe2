import axios from 'axios';
import CryptoJS from 'crypto-js';
import moment from 'moment';

export const createOrder = async () => {
  try {
    const items = [{}]; // todo: collect items from Cart page
    const transID = Math.floor(Math.random() * 1000000);
    const appTransID = `${moment().format('YYMMDD')}_${transID}`;

    let order: any = {
      app_id: 2554,
      app_user: 'app_user',
      app_trans_id: appTransID,
      app_time: Date.now(),
      amount: 20000,
      title: 'title',
      description: `description: Payment for the order #${transID}`,
      item: JSON.stringify(items),
      embed_data: '{}',
      product_code: 'AGREEMENT',
      bank_code: 'zalopayapp',
    };

    const data = [
      2554,
      order.app_trans_id,
      order.app_user,
      order.amount,
      order.app_time,
      order.embed_data,
      order.item,
    ].join('|');

    order.mac = CryptoJS.HmacSHA256(
      data,
      'sdngKKJmqEMzvh5QQcdD2A9XBSKUNaYn',
    ).toString();

    const response = await axios.post(
      'https://sb-openapi.zalopay.vn/v2/create',
      {...order},
    );
    if (response.data) {
      return response.data.zp_trans_token;
    }
  } catch (error) {
    console.log('createOrder error', error);
  }
};
