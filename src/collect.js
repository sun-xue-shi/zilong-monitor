import { report } from "./report";

export function sendPV() {
  let appId, pageId, timestamp, ua;
  const metaList = document.getElementsByTagName("meta");
  for (let i = 0; i < metaList.length; i++) {
    const meta = metaList[i];
    if (meta.getAttribute("appId")) {
      appId = meta.getAttribute("appId");
    }
  }

  pageId = document.body.getAttribute("pageId");
  if (!appId || !pageId) return;

  timestamp = new Date().getTime();
  ua = window.navigator.userAgent;
  report(`appId=${appId}&pageId=${pageId}&timestamp=${timestamp}&ua=${ua}`);
}
