import {
  registerAfterReport,
  registerBeforeCreateParams,
  registerBeforeReport,
  registerHandleError,
  sendPV,
} from "./collect";
import { report } from "./report";

window.ZiLongMonitor = {
  report,
  sendPV,
  registerAfterReport,
  registerBeforeCreateParams,
  registerBeforeReport,
  registerHandleError,
};
