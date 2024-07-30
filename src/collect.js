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

export function collect(customData, eventType) {
  let appId, params, reportData, url;

  beforeCreateParams && beforeCreateParams();

  /**appId */
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
    ...customData,
  };

  console.log(data);

  if (!data.appId || !data.pageId) return;

  params = qs.stringify(data);
  /**上报前钩子 */
  if (beforeReport) {
    params = beforeReport(params);
  }

  /**PV上报 */
  try {
    const res = report(params, { eventType });
    reportData = res.reportData;
    url = res.url;
  } catch (error) {
    handleError(error);
  } finally {
    /**上报后钩子 */
    afterReport && afterReport(url, reportData);
  }
}

export function sendPV() {
  collect({}, "PV");
}

export function sentExpose(data = {}) {
  collect(data, "EXP");
}

export function sentClick(data = {}) {
  collect(data, "CLICK");
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

export function collectAppear() {
  const appearEvent = new CustomEvent("onAppear");
  const disappearEvent = new CustomEvent("onDisappear");
  const appear = document.querySelectorAll("[appear]");

  let ob;
  if (window.MonitorObserver) {
    ob = window.MonitorObserver;
  } else {
    ob = new IntersectionObserver((e) => {
      e.forEach((e) => {
        if (e.intersectionRatio > 0) {
          console.log(e.target.className + "appear");
          e.target.dispatchEvent(appearEvent);
        } else {
          console.log(e.target.className + "disappear");
          e.target.dispatchEvent(disappearEvent);
        }
      });
    });
  }

  let obList = [];

  for (let i = 0; i < appear.length; i++) {
    if (!obList.includes(appear[i])) {
      ob.observe(appear[i]);
      obList.push(appear[i]);
    }
  }

  window.MonitorObserver = ob;
  window.MonitorObserverList = obList;
}
