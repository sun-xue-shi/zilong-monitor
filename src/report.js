/**
 * 数据上报
 * @param {*} params 上报数据
 * @param {*} option 附加选项
 */
export function report(params, option = {}) {
  let img = new Image();

  const { eventType } = option;
  const paramStr = params + "&eventType=" + eventType;
  const src = "http://www.imooc.com?" + paramStr;
  console.log(src);
  img.src = src;
  img.src = "";

  return {
    url: src,
    reportData: {
      params: paramStr,
    },
  };
}
