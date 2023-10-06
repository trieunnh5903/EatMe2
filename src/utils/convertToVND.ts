const convertToVND = (price: number) => {
  const str = price.toString();
  const strLength = str.length;
  if (strLength < 4) {
    return price + 'đ';
  }

  // Chuyển chuỗi thành mảng các ký tự
  let arr = str.split('');

  // Duyệt qua mảng từ phải sang trái và thêm dấu chấm sau mỗi 3 ký tự
  for (let i = strLength - 3; i > 0; i -= 3) {
    arr.splice(i, 0, '.');
  }

  // Chuyển mảng thành chuỗi và trả về kết quả
  return arr.join('') + 'đ';
};

export default convertToVND;
