/* Copyright G. Hemingway 2020 */
"use strict";

import {getAIPDate, getAIPDateStr} from "../src/index.mjs";

const usDate = getAIPDate();
console.log(usDate);
const usDateStr = getAIPDateStr("us", 0, "yyyy-MM-dd");
console.log(usDateStr);

