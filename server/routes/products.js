const {nanoid} = require('@reduxjs/toolkit');
var express = require('express');
var router = express.Router();

router.get('/search', (req, res) => {
  try {
    const {q} = req.query;
    const filteredData = productsData.filter(item =>
      item.name.toLowerCase().includes(q.toLowerCase()),
    );
    return res.status(200).json(filteredData);
  } catch (error) {
    res.status(404).json({message: error.message});
  }
});

/* GET users listing. */
router.get('/:page', function (req, res, next) {
  try {
    let page = req.params.page;
    let offset = (page - 1) * 20;
    res.status(200).json(productsData.slice(offset, offset + 20));
  } catch (error) {
    res.status(404).json({message: error.message});
  }
});

module.exports = router;

const productsData = [
  {
    id: nanoid(),
    name: 'sushi',
    price: 84537,
    description: 'Great value for money',
    image:
      'https://raw.githubusercontent.com/byprogrammers/LCRN16-food-delivery-app-lite-starter/master/assets/dummyData/hamburger.png',
    categoryId: 'OEJB',
    supplierID: 'VNVT',
  },
  {
    id: nanoid(),
    name: 'pizza',
    price: 13856,
    description: 'Affordable price',
    image:
      'https://raw.githubusercontent.com/byprogrammers/LCRN16-food-delivery-app-lite-starter/master/assets/dummyData/hamburger.png',
    categoryId: 'YMHU',
    supplierID: 'ZMMG',
  },
  {
    id: nanoid(),
    name: 'ramen',
    price: 25090,
    description: 'Premium craftsmanship',
    image:
      'https://raw.githubusercontent.com/byprogrammers/LCRN16-food-delivery-app-lite-starter/master/assets/dummyData/hamburger.png',
    categoryId: 'HEBL',
    supplierID: 'SBMA',
  },
  {
    id: nanoid(),
    name: 'salad',
    price: 74164,
    description: 'Comfortable and ergonomic',
    image:
      'https://raw.githubusercontent.com/byprogrammers/LCRN16-food-delivery-app-lite-starter/master/assets/dummyData/hamburger.png',
    categoryId: 'FLLK',
    supplierID: 'SPHI',
  },
  {
    id: nanoid(),
    name: 'taco',
    price: 45998,
    description: 'Premium craftsmanship',
    image:
      'https://raw.githubusercontent.com/byprogrammers/LCRN16-food-delivery-app-lite-starter/master/assets/dummyData/hamburger.png',
    categoryId: 'RCKH',
  },
  {
    id: nanoid(),
    name: 'curry',
    price: 62082,
    description: 'Affordable price',
    image:
      'https://raw.githubusercontent.com/byprogrammers/LCRN16-food-delivery-app-lite-starter/master/assets/dummyData/hamburger.png',
    categoryId: 'KMQS',
    supplierID: 'KCSV',
  },
  {
    id: nanoid(),
    name: 'burger',
    price: 3346,
    description: 'Multi-functional',
    image:
      'https://raw.githubusercontent.com/byprogrammers/LCRN16-food-delivery-app-lite-starter/master/assets/dummyData/hamburger.png',
    categoryId: 'RJFO',
    supplierID: 'CYBL',
  },
  {
    id: nanoid(),
    name: 'taco',
    price: 73012,
    description: 'Affordable price',
    image:
      'https://raw.githubusercontent.com/byprogrammers/LCRN16-food-delivery-app-lite-starter/master/assets/dummyData/hamburger.png',
    categoryId: 'WBGK',
    supplierID: 'YMMI',
  },
  {
    id: nanoid(),
    name: 'sandwich',
    price: 23257,
    description: 'Easy to use',
    image:
      'https://raw.githubusercontent.com/byprogrammers/LCRN16-food-delivery-app-lite-starter/master/assets/dummyData/hamburger.png',
    categoryId: 'LEMG',
    supplierID: 'SBPJ',
  },
  {
    id: nanoid(),
    name: 'salad',
    price: 66494,
    description: 'Stylish design',
    image:
      'https://raw.githubusercontent.com/byprogrammers/LCRN16-food-delivery-app-lite-starter/master/assets/dummyData/hamburger.png',
    categoryId: 'SCAP',
    supplierID: 'ZYSQ',
  },
  {
    id: nanoid(),
    name: 'pasta',
    price: 95889,
    description: 'Wide range of colors',
    image:
      'https://raw.githubusercontent.com/byprogrammers/LCRN16-food-delivery-app-lite-starter/master/assets/dummyData/hamburger.png',
    categoryId: 'MGQZ',
  },
  {
    id: nanoid(),
    name: 'curry',
    price: 279,
    description: 'Affordable price',
    image:
      'https://raw.githubusercontent.com/byprogrammers/LCRN16-food-delivery-app-lite-starter/master/assets/dummyData/hamburger.png',
    categoryId: 'AGGR',
    supplierID: 'MMCP',
  },
  {
    id: nanoid(),
    name: 'taco',
    price: 45220,
    description: 'Eco-friendly materials',
    image:
      'https://raw.githubusercontent.com/byprogrammers/LCRN16-food-delivery-app-lite-starter/master/assets/dummyData/hamburger.png',
    categoryId: 'CYVK',
    supplierID: 'KHOT',
  },
  {
    id: nanoid(),
    name: 'sandwich',
    price: 15016,
    description: 'Wide range of colors',
    image:
      'https://raw.githubusercontent.com/byprogrammers/LCRN16-food-delivery-app-lite-starter/master/assets/dummyData/hamburger.png',
    categoryId: 'VABJ',
    supplierID: 'HASK',
  },
  {
    id: nanoid(),
    name: 'steak',
    price: 96781,
    description: 'Trusted brand',
    image:
      'https://raw.githubusercontent.com/byprogrammers/LCRN16-food-delivery-app-lite-starter/master/assets/dummyData/hamburger.png',
    categoryId: 'EGTB',
    supplierID: 'SWLB',
  },
  {
    id: nanoid(),
    name: 'sushi',
    price: 51193,
    description: 'Fast shipping',
    image:
      'https://raw.githubusercontent.com/byprogrammers/LCRN16-food-delivery-app-lite-starter/master/assets/dummyData/hamburger.png',
    categoryId: 'KPUW',
    supplierID: 'ZPWS',
  },
  {
    id: nanoid(),
    name: 'ramen',
    price: 38528,
    description: 'High-quality product',
    image:
      'https://raw.githubusercontent.com/byprogrammers/LCRN16-food-delivery-app-lite-starter/master/assets/dummyData/hamburger.png',
    categoryId: 'LIPR',
    supplierID: 'SKAR',
  },
  {
    id: nanoid(),
    name: 'sushi',
    price: 29636,
    description: 'Unique and eye-catching',
    image:
      'https://raw.githubusercontent.com/byprogrammers/LCRN16-food-delivery-app-lite-starter/master/assets/dummyData/hamburger.png',
    categoryId: 'CYDN',
    supplierID: 'AYAQ',
  },
  {
    id: nanoid(),
    name: 'curry',
    price: 296,
    description: 'Eco-friendly materials',
    image:
      'https://raw.githubusercontent.com/byprogrammers/LCRN16-food-delivery-app-lite-starter/master/assets/dummyData/hamburger.png',
    categoryId: 'YCBE',
    supplierID: 'AGGE',
  },
  {
    id: nanoid(),
    name: 'ramen',
    price: 85947,
    description: 'Wide range of colors',
    image:
      'https://raw.githubusercontent.com/byprogrammers/LCRN16-food-delivery-app-lite-starter/master/assets/dummyData/hamburger.png',
    categoryId: 'CYLK',
    supplierID: 'LPVZ',
  },
  {
    id: nanoid(),
    name: 'sushi',
    price: 88235,
    description: 'Innovative features',
    image:
      'https://raw.githubusercontent.com/byprogrammers/LCRN16-food-delivery-app-lite-starter/master/assets/dummyData/hamburger.png',
    categoryId: 'UNTT',
    supplierID: 'UKON',
  },
  {
    id: nanoid(),
    name: 'sushi',
    price: 35553,
    description: 'Excellent customer reviews',
    image:
      'https://raw.githubusercontent.com/byprogrammers/LCRN16-food-delivery-app-lite-starter/master/assets/dummyData/hamburger.png',
    categoryId: 'KVRB',
    supplierID: 'LBGO',
  },
  {
    id: nanoid(),
    name: 'steak',
    price: 4968,
    description: 'Durable and long-lasting',
    image:
      'https://raw.githubusercontent.com/byprogrammers/LCRN16-food-delivery-app-lite-starter/master/assets/dummyData/hamburger.png',
    categoryId: 'ULNN',
    supplierID: 'YMBA',
  },
  {
    id: nanoid(),
    name: 'taco',
    price: 64287,
    description: 'Affordable price',
    image:
      'https://raw.githubusercontent.com/byprogrammers/LCRN16-food-delivery-app-lite-starter/master/assets/dummyData/hamburger.png',
    supplierID: 'LSZS',
  },
  {
    id: nanoid(),
    name: 'curry',
    price: 89743,
    description: 'Unique and eye-catching',
    image:
      'https://raw.githubusercontent.com/byprogrammers/LCRN16-food-delivery-app-lite-starter/master/assets/dummyData/hamburger.png',
    categoryId: 'FOGQ',
    supplierID: 'MRCH',
  },
  {
    id: nanoid(),
    name: 'pasta',
    price: 11599,
    description: 'Durable and long-lasting',
    image:
      'https://raw.githubusercontent.com/byprogrammers/LCRN16-food-delivery-app-lite-starter/master/assets/dummyData/hamburger.png',
    categoryId: 'ZMUH',
    supplierID: 'YDRD',
  },
  {
    id: nanoid(),
    name: 'burger',
    price: 95697,
    description: 'Innovative features',
    image:
      'https://raw.githubusercontent.com/byprogrammers/LCRN16-food-delivery-app-lite-starter/master/assets/dummyData/hamburger.png',
    categoryId: 'KDYS',
    supplierID: 'FAER',
  },
  {
    id: nanoid(),
    name: 'burger',
    price: 2217,
    description: 'Easy to use',
    image:
      'https://raw.githubusercontent.com/byprogrammers/LCRN16-food-delivery-app-lite-starter/master/assets/dummyData/hamburger.png',
    categoryId: 'CYCL',
  },
  {
    id: nanoid(),
    name: 'sushi',
    price: 83173,
    description: 'Fast shipping',
    image:
      'https://raw.githubusercontent.com/byprogrammers/LCRN16-food-delivery-app-lite-starter/master/assets/dummyData/hamburger.png',
    categoryId: 'KBTF',
    supplierID: 'AYNI',
  },
  {
    id: nanoid(),
    name: 'pizza',
    price: 41438,
    description: 'Wide range of colors',
    image:
      'https://raw.githubusercontent.com/byprogrammers/LCRN16-food-delivery-app-lite-starter/master/assets/dummyData/hamburger.png',
    categoryId: 'FKAN',
    supplierID: 'UADD',
  },
  {
    id: nanoid(),
    name: 'sandwich',
    price: 50880,
    description: 'Easy to use',
    image:
      'https://raw.githubusercontent.com/byprogrammers/LCRN16-food-delivery-app-lite-starter/master/assets/dummyData/hamburger.png',
    categoryId: 'WALB',
    supplierID: 'VIAX',
  },
  {
    id: nanoid(),
    name: 'salad',
    price: 6449,
    description: 'Durable and long-lasting',
    image:
      'https://raw.githubusercontent.com/byprogrammers/LCRN16-food-delivery-app-lite-starter/master/assets/dummyData/hamburger.png',
    categoryId: 'SBSN',
    supplierID: 'PAUM',
  },
  {
    id: nanoid(),
    name: 'ramen',
    price: 58739,
    description: 'Versatile and practical',
    image:
      'https://raw.githubusercontent.com/byprogrammers/LCRN16-food-delivery-app-lite-starter/master/assets/dummyData/hamburger.png',
    categoryId: 'KPPA',
    supplierID: 'LPPM',
  },
  {
    id: nanoid(),
    name: 'salad',
    price: 4247,
    description: 'Unique and eye-catching',
    image:
      'https://raw.githubusercontent.com/byprogrammers/LCRN16-food-delivery-app-lite-starter/master/assets/dummyData/hamburger.png',
    categoryId: 'KCRE',
    supplierID: 'FAPG',
  },
  {
    id: nanoid(),
    name: 'ramen',
    price: 35791,
    description: 'Unique and eye-catching',
    image:
      'https://raw.githubusercontent.com/byprogrammers/LCRN16-food-delivery-app-lite-starter/master/assets/dummyData/hamburger.png',
    categoryId: 'FMSK',
    supplierID: 'KGFL',
  },
  {
    id: nanoid(),
    name: 'salad',
    price: 67776,
    description: 'Eco-friendly materials',
    image:
      'https://raw.githubusercontent.com/byprogrammers/LCRN16-food-delivery-app-lite-starter/master/assets/dummyData/hamburger.png',
    supplierID: 'SAOU',
  },
  {
    id: nanoid(),
    name: 'pasta',
    price: 49718,
    description: 'Sleek and modern',
    image:
      'https://raw.githubusercontent.com/byprogrammers/LCRN16-food-delivery-app-lite-starter/master/assets/dummyData/hamburger.png',
    categoryId: 'NGKT',
    supplierID: 'MZBZ',
  },
  {
    id: nanoid(),
    name: 'sandwich',
    price: 84544,
    description: 'Multi-functional',
    image:
      'https://raw.githubusercontent.com/byprogrammers/LCRN16-food-delivery-app-lite-starter/master/assets/dummyData/hamburger.png',
    categoryId: 'EGTK',
  },
  {
    id: nanoid(),
    name: 'pasta',
    price: 34494,
    description: 'Excellent customer reviews',
    image:
      'https://raw.githubusercontent.com/byprogrammers/LCRN16-food-delivery-app-lite-starter/master/assets/dummyData/hamburger.png',
    categoryId: 'VIAR',
    supplierID: 'WBKN',
  },
  {
    id: nanoid(),
    name: 'burger',
    price: 8910,
    description: 'Multi-functional',
    image:
      'https://raw.githubusercontent.com/byprogrammers/LCRN16-food-delivery-app-lite-starter/master/assets/dummyData/hamburger.png',
    categoryId: 'KSBX',
    supplierID: 'KAYS',
  },
  {
    id: nanoid(),
    name: 'pasta',
    price: 50621,
    description: 'Easy to use',
    image:
      'https://raw.githubusercontent.com/byprogrammers/LCRN16-food-delivery-app-lite-starter/master/assets/dummyData/hamburger.png',
    categoryId: 'OBBI',
    supplierID: 'KSNY',
  },
  {
    id: nanoid(),
    name: 'steak',
    price: 241,
    description: 'Excellent customer reviews',
    image:
      'https://raw.githubusercontent.com/byprogrammers/LCRN16-food-delivery-app-lite-starter/master/assets/dummyData/hamburger.png',
    categoryId: 'UNNT',
    supplierID: 'KSYI',
  },
  {
    id: nanoid(),
    name: 'sushi',
    price: 12356,
    description: 'Wide range of colors',
    image:
      'https://raw.githubusercontent.com/byprogrammers/LCRN16-food-delivery-app-lite-starter/master/assets/dummyData/hamburger.png',
    categoryId: 'SWLB',
    supplierID: 'AYOK',
  },
  {
    id: nanoid(),
    name: 'ramen',
    price: 13588,
    description: 'Versatile and practical',
    image:
      'https://raw.githubusercontent.com/byprogrammers/LCRN16-food-delivery-app-lite-starter/master/assets/dummyData/hamburger.png',
    supplierID: 'CYRS',
  },
  {
    id: nanoid(),
    name: 'burger',
    price: 98970,
    description: 'Affordable price',
    image:
      'https://raw.githubusercontent.com/byprogrammers/LCRN16-food-delivery-app-lite-starter/master/assets/dummyData/hamburger.png',
    categoryId: 'VVPK',
    supplierID: 'SSBL',
  },
  {
    id: nanoid(),
    name: 'pizza',
    price: 46625,
    description: 'Trusted brand',
    image:
      'https://raw.githubusercontent.com/byprogrammers/LCRN16-food-delivery-app-lite-starter/master/assets/dummyData/hamburger.png',
    categoryId: 'WBGF',
    supplierID: 'OOBR',
  },
  {
    id: nanoid(),
    name: 'taco',
    price: 76956,
    description: 'Trusted brand',
    image:
      'https://raw.githubusercontent.com/byprogrammers/LCRN16-food-delivery-app-lite-starter/master/assets/dummyData/hamburger.png',
    categoryId: 'AYIH',
    supplierID: 'SBQV',
  },
  {
    id: nanoid(),
    name: 'pasta',
    price: 64761,
    description: 'Excellent customer reviews',
    image:
      'https://raw.githubusercontent.com/byprogrammers/LCRN16-food-delivery-app-lite-starter/master/assets/dummyData/hamburger.png',
    categoryId: 'SKAR',
    supplierID: 'YPLM',
  },
  {
    id: nanoid(),
    name: 'sandwich',
    price: 51320,
    description: 'Unique and eye-catching',
    image:
      'https://raw.githubusercontent.com/byprogrammers/LCRN16-food-delivery-app-lite-starter/master/assets/dummyData/hamburger.png',
    categoryId: 'SVEZ',
    supplierID: 'VIPK',
  },
  {
    id: nanoid(),
    name: 'pasta',
    price: 50254,
    description: 'Fast shipping',
    image:
      'https://raw.githubusercontent.com/byprogrammers/LCRN16-food-delivery-app-lite-starter/master/assets/dummyData/hamburger.png',
    categoryId: 'CKB6',
    supplierID: 'MMTG',
  },
  {
    id: nanoid(),
    name: 'ramen',
    price: 97,
    description: 'Innovative features',
    image:
      'https://raw.githubusercontent.com/byprogrammers/LCRN16-food-delivery-app-lite-starter/master/assets/dummyData/hamburger.png',
    categoryId: 'KTUP',
    supplierID: '4KA',
  },
  {
    id: nanoid(),
    name: 'sandwich',
    price: 62343,
    description: 'Affordable price',
    image:
      'https://raw.githubusercontent.com/byprogrammers/LCRN16-food-delivery-app-lite-starter/master/assets/dummyData/hamburger.png',
    categoryId: 'HKHO',
    supplierID: 'HSGG',
  },
  {
    id: nanoid(),
    name: 'pasta',
    price: 3088,
    description: 'Trusted brand',
    image:
      'https://raw.githubusercontent.com/byprogrammers/LCRN16-food-delivery-app-lite-starter/master/assets/dummyData/hamburger.png',
    categoryId: 'MHUT',
    supplierID: 'SNTK',
  },
  {
    id: nanoid(),
    name: 'pasta',
    price: 88626,
    description: 'Easy to use',
    image:
      'https://raw.githubusercontent.com/byprogrammers/LCRN16-food-delivery-app-lite-starter/master/assets/dummyData/hamburger.png',
    categoryId: 'ZBXH',
  },
  {
    id: nanoid(),
    name: 'curry',
    price: 95973,
    description: 'Eco-friendly materials',
    image:
      'https://raw.githubusercontent.com/byprogrammers/LCRN16-food-delivery-app-lite-starter/master/assets/dummyData/hamburger.png',
    categoryId: 'FYWE',
    supplierID: 'UKLU',
  },
  {
    id: nanoid(),
    name: 'steak',
    price: 34424,
    description: 'Versatile and practical',
    image:
      'https://raw.githubusercontent.com/byprogrammers/LCRN16-food-delivery-app-lite-starter/master/assets/dummyData/hamburger.png',
    categoryId: 'LFOP',
  },
  {
    id: nanoid(),
    name: 'salad',
    price: 25665,
    description: 'Excellent customer reviews',
    image:
      'https://raw.githubusercontent.com/byprogrammers/LCRN16-food-delivery-app-lite-starter/master/assets/dummyData/hamburger.png',
    supplierID: 'SOOG',
  },
  {
    id: nanoid(),
    name: 'sandwich',
    price: 60588,
    description: 'High-quality product',
    image:
      'https://raw.githubusercontent.com/byprogrammers/LCRN16-food-delivery-app-lite-starter/master/assets/dummyData/hamburger.png',
    categoryId: 'ZPJH',
    supplierID: 'MMQT',
  },
  {
    id: nanoid(),
    name: 'pizza',
    price: 66161,
    description: 'Excellent customer reviews',
    image:
      'https://raw.githubusercontent.com/byprogrammers/LCRN16-food-delivery-app-lite-starter/master/assets/dummyData/hamburger.png',
    categoryId: 'FZUK',
    supplierID: 'YBDV',
  },
  {
    id: nanoid(),
    name: 'curry',
    price: 867,
    description: 'Innovative features',
    image:
      'https://raw.githubusercontent.com/byprogrammers/LCRN16-food-delivery-app-lite-starter/master/assets/dummyData/hamburger.png',
    categoryId: 'SPTN',
    supplierID: 'PACK',
  },
  {
    id: nanoid(),
    name: 'taco',
    price: 47319,
    description: 'Affordable price',
    image:
      'https://raw.githubusercontent.com/byprogrammers/LCRN16-food-delivery-app-lite-starter/master/assets/dummyData/hamburger.png',
    categoryId: 'WICN',
    supplierID: 'OEGT',
  },
  {
    id: nanoid(),
    name: 'sushi',
    price: 74029,
    description: 'Comfortable and ergonomic',
    image:
      'https://raw.githubusercontent.com/byprogrammers/LCRN16-food-delivery-app-lite-starter/master/assets/dummyData/hamburger.png',
    categoryId: 'EGEF',
    supplierID: 'MPBO',
  },
  {
    id: nanoid(),
    name: 'sushi',
    price: 73718,
    description: 'Affordable price',
    image:
      'https://raw.githubusercontent.com/byprogrammers/LCRN16-food-delivery-app-lite-starter/master/assets/dummyData/hamburger.png',
    categoryId: 'DXXX',
    supplierID: 'UKCS',
  },
  {
    id: nanoid(),
    name: 'curry',
    price: 61409,
    description: 'Trusted brand',
    image:
      'https://raw.githubusercontent.com/byprogrammers/LCRN16-food-delivery-app-lite-starter/master/assets/dummyData/hamburger.png',
    supplierID: 'KSFZ',
  },
  {
    id: nanoid(),
    name: 'sushi',
    price: 34225,
    description: 'Multi-functional',
    image:
      'https://raw.githubusercontent.com/byprogrammers/LCRN16-food-delivery-app-lite-starter/master/assets/dummyData/hamburger.png',
    categoryId: 'NVVA',
    supplierID: 'YWBS',
  },
  {
    id: nanoid(),
    name: 'steak',
    price: 14041,
    description: 'Durable and long-lasting',
    image:
      'https://raw.githubusercontent.com/byprogrammers/LCRN16-food-delivery-app-lite-starter/master/assets/dummyData/hamburger.png',
    supplierID: 'ESNK',
  },
  {
    id: nanoid(),
    name: 'burger',
    price: 72017,
    description: 'Wide range of colors',
    image:
      'https://raw.githubusercontent.com/byprogrammers/LCRN16-food-delivery-app-lite-starter/master/assets/dummyData/hamburger.png',
    categoryId: 'D60',
    supplierID: 'OAUZ',
  },
  {
    id: nanoid(),
    name: 'pizza',
    price: 21781,
    description: 'Stylish design',
    image:
      'https://raw.githubusercontent.com/byprogrammers/LCRN16-food-delivery-app-lite-starter/master/assets/dummyData/hamburger.png',
    categoryId: 'ZUNZ',
    supplierID: 'SYAH',
  },
  {
    id: nanoid(),
    name: 'curry',
    price: 75333,
    description: 'High-quality product',
    image:
      'https://raw.githubusercontent.com/byprogrammers/LCRN16-food-delivery-app-lite-starter/master/assets/dummyData/hamburger.png',
    categoryId: 'YCPN',
    supplierID: '2Z6',
  },
  {
    id: nanoid(),
    name: 'pasta',
    price: 81661,
    description: 'Sleek and modern',
    image:
      'https://raw.githubusercontent.com/byprogrammers/LCRN16-food-delivery-app-lite-starter/master/assets/dummyData/hamburger.png',
    categoryId: 'SOOM',
    supplierID: 'KHOB',
  },
  {
    id: nanoid(),
    name: 'curry',
    price: 48176,
    description: 'Fast shipping',
    image:
      'https://raw.githubusercontent.com/byprogrammers/LCRN16-food-delivery-app-lite-starter/master/assets/dummyData/hamburger.png',
    categoryId: 'PAEM',
    supplierID: 'RCLM',
  },
  {
    id: nanoid(),
    name: 'curry',
    price: 25106,
    description: 'Stylish design',
    image:
      'https://raw.githubusercontent.com/byprogrammers/LCRN16-food-delivery-app-lite-starter/master/assets/dummyData/hamburger.png',
    categoryId: 'SAWE',
    supplierID: 'SBOI',
  },
  {
    id: nanoid(),
    name: 'steak',
    price: 18356,
    description: 'Comfortable and ergonomic',
    image:
      'https://raw.githubusercontent.com/byprogrammers/LCRN16-food-delivery-app-lite-starter/master/assets/dummyData/hamburger.png',
    categoryId: 'VECC',
    supplierID: 'ENBL',
  },
  {
    id: nanoid(),
    name: 'steak',
    price: 75680,
    description: 'Sleek and modern',
    image:
      'https://raw.githubusercontent.com/byprogrammers/LCRN16-food-delivery-app-lite-starter/master/assets/dummyData/hamburger.png',
    categoryId: 'KOEO',
    supplierID: 'SYSK',
  },
  {
    id: nanoid(),
    name: 'taco',
    price: 85971,
    description: 'High-quality product',
    image:
      'https://raw.githubusercontent.com/byprogrammers/LCRN16-food-delivery-app-lite-starter/master/assets/dummyData/hamburger.png',
    categoryId: 'KSPI',
    supplierID: 'FZWA',
  },
  {
    id: nanoid(),
    name: 'pizza',
    price: 12411,
    description: 'Premium craftsmanship',
    image:
      'https://raw.githubusercontent.com/byprogrammers/LCRN16-food-delivery-app-lite-starter/master/assets/dummyData/hamburger.png',
    categoryId: 'KRXE',
  },
  {
    id: nanoid(),
    name: 'taco',
    price: 67062,
    description: 'Stylish design',
    image:
      'https://raw.githubusercontent.com/byprogrammers/LCRN16-food-delivery-app-lite-starter/master/assets/dummyData/hamburger.png',
    categoryId: 'KMBO',
    supplierID: 'CYPR',
  },
  {
    id: nanoid(),
    name: 'steak',
    price: 75059,
    description: 'Excellent customer reviews',
    image:
      'https://raw.githubusercontent.com/byprogrammers/LCRN16-food-delivery-app-lite-starter/master/assets/dummyData/hamburger.png',
    categoryId: 'MMMT',
    supplierID: 'GCRR',
  },
  {
    id: nanoid(),
    name: 'sandwich',
    price: 46772,
    description: 'Great value for money',
    image:
      'https://raw.githubusercontent.com/byprogrammers/LCRN16-food-delivery-app-lite-starter/master/assets/dummyData/hamburger.png',
    categoryId: 'BIVO',
    supplierID: 'LZTT',
  },
  {
    id: nanoid(),
    name: 'curry',
    price: 41830,
    description: 'Sleek and modern',
    image:
      'https://raw.githubusercontent.com/byprogrammers/LCRN16-food-delivery-app-lite-starter/master/assets/dummyData/hamburger.png',
    categoryId: 'YBWM',
    supplierID: 'AK75',
  },
  {
    id: nanoid(),
    name: 'curry',
    price: 89314,
    description: 'Unique and eye-catching',
    image:
      'https://raw.githubusercontent.com/byprogrammers/LCRN16-food-delivery-app-lite-starter/master/assets/dummyData/hamburger.png',
    categoryId: 'YSCO',
    supplierID: 'O22',
  },
  {
    id: nanoid(),
    name: 'steak',
    price: 36736,
    description: 'Premium craftsmanship',
    image:
      'https://raw.githubusercontent.com/byprogrammers/LCRN16-food-delivery-app-lite-starter/master/assets/dummyData/hamburger.png',
    categoryId: 'KBVI',
    supplierID: 'CYKY',
  },
  {
    id: nanoid(),
    name: 'pasta',
    price: 4019,
    description: 'Innovative features',
    image:
      'https://raw.githubusercontent.com/byprogrammers/LCRN16-food-delivery-app-lite-starter/master/assets/dummyData/hamburger.png',
    categoryId: 'HCMJ',
    supplierID: 'KCIR',
  },
  {
    id: nanoid(),
    name: 'salad',
    price: 52227,
    description: 'Multi-functional',
    image:
      'https://raw.githubusercontent.com/byprogrammers/LCRN16-food-delivery-app-lite-starter/master/assets/dummyData/hamburger.png',
    categoryId: 'EICA',
    supplierID: 'PAHX',
  },
  {
    id: nanoid(),
    name: 'curry',
    price: 69383,
    description: 'Affordable price',
    image:
      'https://raw.githubusercontent.com/byprogrammers/LCRN16-food-delivery-app-lite-starter/master/assets/dummyData/hamburger.png',
    categoryId: 'VIGG',
    supplierID: 'MWCB',
  },
  {
    id: nanoid(),
    name: 'taco',
    price: 24087,
    description: 'Perfect gift idea',
    image:
      'https://raw.githubusercontent.com/byprogrammers/LCRN16-food-delivery-app-lite-starter/master/assets/dummyData/hamburger.png',
    categoryId: 'EGFE',
    supplierID: 'FBMN',
  },
  {
    id: nanoid(),
    name: 'burger',
    price: 15911,
    description: 'Wide range of colors',
    image:
      'https://raw.githubusercontent.com/byprogrammers/LCRN16-food-delivery-app-lite-starter/master/assets/dummyData/hamburger.png',
    supplierID: 'PAKK',
  },
  {
    id: nanoid(),
    name: 'sandwich',
    price: 99558,
    description: 'Versatile and practical',
    image:
      'https://raw.githubusercontent.com/byprogrammers/LCRN16-food-delivery-app-lite-starter/master/assets/dummyData/hamburger.png',
    supplierID: 'KOAK',
  },
  {
    id: nanoid(),
    name: 'pasta',
    price: 90616,
    description: 'Suitable for all ages',
    image:
      'https://raw.githubusercontent.com/byprogrammers/LCRN16-food-delivery-app-lite-starter/master/assets/dummyData/hamburger.png',
    categoryId: 'CYMM',
    supplierID: 'YGIB',
  },
  {
    id: nanoid(),
    name: 'sushi',
    price: 20552,
    description: 'Perfect gift idea',
    image:
      'https://raw.githubusercontent.com/byprogrammers/LCRN16-food-delivery-app-lite-starter/master/assets/dummyData/hamburger.png',
    categoryId: 'OPFA',
    supplierID: 'KEVM',
  },
  {
    id: nanoid(),
    name: 'sandwich',
    price: 21248,
    description: 'Unique and eye-catching',
    image:
      'https://raw.githubusercontent.com/byprogrammers/LCRN16-food-delivery-app-lite-starter/master/assets/dummyData/hamburger.png',
    categoryId: 'DFCP',
    supplierID: 'VTSG',
  },
  {
    id: nanoid(),
    name: 'burger',
    price: 74573,
    description: 'Unique and eye-catching',
    image:
      'https://raw.githubusercontent.com/byprogrammers/LCRN16-food-delivery-app-lite-starter/master/assets/dummyData/hamburger.png',
    categoryId: 'YYNG',
    supplierID: 'YBOU',
  },
  {
    id: nanoid(),
    name: 'sushi',
    price: 55449,
    description: 'Fast shipping',
    image:
      'https://raw.githubusercontent.com/byprogrammers/LCRN16-food-delivery-app-lite-starter/master/assets/dummyData/hamburger.png',
    categoryId: 'KLWT',
    supplierID: 'WITT',
  },
  {
    id: nanoid(),
    name: 'ramen',
    price: 4607,
    description: 'Premium craftsmanship',
    image:
      'https://raw.githubusercontent.com/byprogrammers/LCRN16-food-delivery-app-lite-starter/master/assets/dummyData/hamburger.png',
    categoryId: 'SLPS',
    supplierID: 'UUMO',
  },
  {
    id: nanoid(),
    name: 'ramen',
    price: 36820,
    description: 'Comfortable and ergonomic',
    image:
      'https://raw.githubusercontent.com/byprogrammers/LCRN16-food-delivery-app-lite-starter/master/assets/dummyData/hamburger.png',
    categoryId: 'ZBAR',
    supplierID: 'KDRI',
  },
  {
    id: nanoid(),
    name: 'salad',
    price: 66307,
    description: 'Perfect gift idea',
    image:
      'https://raw.githubusercontent.com/byprogrammers/LCRN16-food-delivery-app-lite-starter/master/assets/dummyData/hamburger.png',
    categoryId: 'DRZL',
    supplierID: 'KGLR',
  },
  {
    id: nanoid(),
    name: 'salad',
    price: 37887,
    description: 'Great value for money',
    image:
      'https://raw.githubusercontent.com/byprogrammers/LCRN16-food-delivery-app-lite-starter/master/assets/dummyData/hamburger.png',
    categoryId: 'KBWG',
    supplierID: 'PAGT',
  },
  {
    id: nanoid(),
    name: 'steak',
    price: 64158,
    description: 'Multi-functional',
    image:
      'https://raw.githubusercontent.com/byprogrammers/LCRN16-food-delivery-app-lite-starter/master/assets/dummyData/hamburger.png',
    categoryId: 'YGON',
    supplierID: 'FAMN',
  },
  {
    id: nanoid(),
    name: 'pasta',
    price: 82220,
    description: 'Innovative features',
    image:
      'https://raw.githubusercontent.com/byprogrammers/LCRN16-food-delivery-app-lite-starter/master/assets/dummyData/hamburger.png',
    categoryId: 'DNKN',
    supplierID: 'FZJH',
  },
  {
    id: nanoid(),
    name: 'sushi',
    price: 74370,
    description: 'Suitable for all ages',
    image:
      'https://raw.githubusercontent.com/byprogrammers/LCRN16-food-delivery-app-lite-starter/master/assets/dummyData/hamburger.png',
    supplierID: 'CYQY',
  },
];
