import collect from "./collect";
import report from "./report";

console.log("load");

window.ZiLongMonitor = {
  collect,
  report,
};

export default {
  collect,
  report,
};
