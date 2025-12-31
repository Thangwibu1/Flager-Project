/**
 * Util này giúp parse kiểu dữ liệu bất kì thành kiểu dữ liệu khác mong muốn
 */

/*
  Lí do phải sài: Nếu ta bình thường update trong mongo: 
  a {
    b: value, 
    c: value, 
  }
  => giả sử ta update: trường b trong a thôi, c giữ nguyên
  => gửi lên 
  a {
    b: newValue 
  }
  => lúc này gặp vấn đề mongo hiều là ta muốn chuyển bản a cũ thành a mới luôn
  ==> parse phát để thành: a.b = value; => đi đúng chỗ dẫn thì sẽ ko ảnh hưởng đến toàn bộ trong a
*/
const parseUpdateNestedObject = (obj: any) => {
  const final: any = {};
  Object.keys(obj).forEach(key => {
    if(typeof obj[key] == 'object' && !Array.isArray(obj[key])){
      const childObj = parseUpdateNestedObject(obj[key]);
      Object.keys(childObj).forEach(childKey => {
        final[`${key}.${childKey}`] = childObj[childKey];
      })
    }
    else {
      final[key] = obj[key];
    }
  });
  return final;
}

export const parseKeyStringValueToObject = <T>(key: string, value: T) => {
  return Object.fromEntries([[key, value]]);
}