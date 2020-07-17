/* Copyright G. Hemingway 2020 */
"use strict";

const aipDate = require("../src/index.js");

console.log(aipDate.getDate(1));
console.log(aipDate.getDate());
console.log(aipDate.getDate(-1));
console.log(aipDate.getDate(-2));
console.log(aipDate.getDate(-3));
console.log(aipDate.getDate(-4));
console.log(aipDate.getDate(-5));

console.log("\n");
console.log(aipDate.getDateStr("us", 0, "yyyy-MM-dd"));

console.log("\n");
console.log(aipDate.getDateAt("5/21/2020"));

console.log("\n");
console.log(aipDate.dateRange(4, 4));