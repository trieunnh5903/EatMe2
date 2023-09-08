const convertToVND = (price: number) => {
  return parseFloat(price.toString()).toFixed(3) + 'đ';
};

export default convertToVND;
