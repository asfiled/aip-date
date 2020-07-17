/* Copyright G. Hemingway 2020 */
"use strict";

const aipDate = require("../src/index.js");

const usDate = aipDate.getAIPDate();
console.log(usDate);
const usDateStr = aipDate.getAIPDateStr("us", 0, "yyyy-MM-dd");
console.log(usDateStr);

