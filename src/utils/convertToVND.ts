const convertToVND = (price: number) => {
  return parseFloat(price.toString().slice(0, -3)).toFixed(3) + 'đ';
};

export default convertToVND;
