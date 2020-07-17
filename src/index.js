/* Copyright G. Hemingway 2020 */
"use strict";

const dateFns = require("date-fns");

const dates = {
  us: new Date(Date.UTC(2020, 0, 3, 0, 0, 0)),
};
// Only allow up to 100 steps
const MAXROLL = 100;

/***
 *
 * @param relDate
 * @param refDate
 * @param offset
 * @returns {Date}
 */
const rollDate = (relDate, refDate, offset) => {
  let docVer = new Date(relDate);
  let rollCount = 0;
  while (docVer < refDate && rollCount < MAXROLL) {
    rollCount++;
    docVer = dateFns.addDays(docVer, 28);
  }
  if (rollCount === MAXROLL) throw new Error("roll count exceeded");
  // Adjust by offset (offset of zero is current, which is -28 days)
  docVer = dateFns.setHours(dateFns.addDays(docVer, -28 * (1 - offset)), 0);
  return docVer;
};

/***
 *
 * @param country
 * @param offset
 * @returns
 */
const getDate = (module.exports.getDate = (
  country = "us",
  offset = 0
) => {
  // Clean up params
  if (typeof country === "number" && offset === 0) {
    offset = country;
    country = "us";
  }
  // Establish starting date
  let relDate = dates[country.toLowerCase()];
  let refDate = new Date(Date.now());
  // Roll forward to at least now
  return rollDate(relDate, refDate, offset);
});

/***
 *
 * @param country
 * @param offset
 * @param format
 * @returns {string}
 */
module.exports.getDateStr = (
  country = "us",
  offset = 0,
  format
) => {
  const dateObj = getDate(country, offset);
  return dateFns.format(dateObj, format);
};

/***
 * Get the AIP publication date as-if you were at a particular time
 * @param dateStr When you want to fetch the publication date as-of
 * @param country Country for publication date - default: us
 * @param offset Cycles to offset - default: 0
 * @returns {Date}
 */
module.exports.getDateAt = (
    dateStr,
    country = "us",
    offset = 0,
) => {
  // Clean up params
  if (typeof country === "number" && offset === 0) {
    offset = country;
    country = "us";
  }
  let relDate = dates[country.toLowerCase()];
  let refDate = new Date(Date.parse(dateStr));
  // Roll forward to at least now
  return rollDate(relDate, refDate, offset);
};

/***
 *
 * @param forward
 * @param back
 * @returns {[]}
 */
module.exports.dateRange = (forward = 10, back = 0) => {
  let dates = [];
  for (let i = -back; i < forward; i++) {
    dates.push(getDate(i));
  }
  return dates;
}