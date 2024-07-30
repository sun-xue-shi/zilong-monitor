import {
  registerAfterReport,
  registerBeforeCreateParams,
  registerBeforeReport,
  registerHandleError,
  sendPV,
  sentExpose,
  collectAppear,
  sentClick,
} from "./collect";
import { report } from "./report";

window.onload = () => {
  collectAppear();
};

window.ZiLongMonitor = {
  report,
  sendPV,
  registerAfterReport,
  registerBeforeCreateParams,
  registerBeforeReport,
  registerHandleError,
  sentExpose,
  collectAppear,
  sentClick,
};
