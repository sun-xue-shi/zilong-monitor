import { report } from "./report";
import qs from "qs";

//日志上报钩子函数
/**参数创建前 */
let beforeCreateParams;
/**数据上报前 */
let beforeReport;
/**数据上报后 */
let afterReport;
/**异常处理 */
let handleError = (e) => {
  console.log(e);
};

export function sendPV() {
  let appId, params, reportData, url;

  beforeCreateParams && beforeCreateParams();

  const metaList = document.getElementsByTagName("meta");
  for (let i = 0; i < metaList.length; i++) {
    const meta = metaList[i];
    if (meta.getAttribute("appId")) {
      appId = meta.getAttribute("appId");
    }
  }

  const data = {
    appId,
    pageId: document.body.getAttribute("pageId"),
    ua: window.navigator.userAgent,
    timestamp: new Date().getTime(),
  };

  if (!data.appId || !data.pageId) return;

  params = qs.stringify(data);
  if (beforeReport) {
    params = beforeReport(params);
  }

  try {
    const res = report(params);
    reportData = res.reportData;
    url = res.url;
    throw Error("111");
  } catch (error) {
    handleError(error);
  } finally {
    afterReport && afterReport(url, reportData);
  }
}

export function registerBeforeCreateParams(fn) {
  beforeCreateParams = fn;
}

export function registerBeforeReport(fn) {
  beforeReport = fn;
}

export function registerAfterReport(fn) {
  afterReport = fn;
}

export function registerHandleError(fn) {
  handleError = fn;
}
