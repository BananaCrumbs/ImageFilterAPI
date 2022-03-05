#!

import Logger from "./log/Logger";
import SiteServer from "./SiteServer";

console.log = Logger.log;
console.warn = Logger.warn;
console.error = Logger.error;

new SiteServer().start();
