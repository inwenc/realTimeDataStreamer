const sanitizeData = (data) => {
  let arr = data.statuses;
  let newArr = [];
  for (let i = 0; i < arr.length; i++) {
    let obj = {
      time: arr[i].created_at,
      text: arr[i].text,
      id: arr[i].id
    }
    newArr.push(obj);

  }
  return newArr;
}
module.exports = {
  sanitizeData
}