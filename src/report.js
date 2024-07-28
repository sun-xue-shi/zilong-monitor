/**
 * 数据上报
 * @param {*} data 上报数据
 * @param {*} option 附加选项
 */
export function report(data, option = {}) {
  let img = new Image();
  console.log(encodeURIComponent(data));
  const params = encodeURIComponent(data);
  const { eventType = "PV" } = option;
  const src = "http://www.imooc.com?data=" + params + "&eventType=" + eventType;
  console.log(src);
  img.src = src;
  img.src = null;
}
