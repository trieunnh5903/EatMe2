const {nanoid} = require('@reduxjs/toolkit');
var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;

const DATA = [
  {
    id: nanoid(),
    image: 'https://mms.img.susercontent.com/vn-11134512-7r98o-ll3fvn1zcvxy96',
  },
  {
    id: nanoid(),
    image:
      'https://images.foody.vn/delivery/collection/s480x300/image-59e924ad-230215000717.png',
  },
  {
    id: nanoid(),
    image: 'https://mms.img.susercontent.com/vn-11134512-7r98o-llbtlx38ujm06b',
  },
  {
    id: nanoid(),
    image:
      'https://images.foody.vn/delivery/collection/s480x300/image-3b71bd4c-221230173415.png',
  },
  {
    id: nanoid(),
    image:
      'https://images.foody.vn/delivery/collection/s480x300/image-0f612348-230215104336.png',
  },
  {
    id: nanoid(),
    image:
      'https://images.foody.vn/delivery/collection/s480x300/image-67058639-230704180939.png',
  },
];
