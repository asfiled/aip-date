/* Copyright G. Hemingway 2020 */
"use strict";

const dateFns = require("date-fns");

/*** Recent FAA publications dates
2020-08-13 <--- next
2020-07-16 <--- current
2020-06-18
2020-05-21
2020-04-23
2020-03-26
2020-02-27
2020-01-30
2020-01-02
2019-12-05
2019-11-07
2019-10-10
2019-09-12
2019-08-15
2019-07-18
***/
const dates = {
  us: new Date(Date.UTC(2019, 6, 18, 0, 0, 0)),
  fr: new Date(Date.UTC(2021, 6, 17, 0, 0, 0)),
  gb: new Date(Date.UTC(2021, 6, 17, 0, 0, 0)),
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
  docVer = dateFns.addDays(docVer, -28 * (1 - offset));
  // Adjust hours to ensure date is at midnight UTC
  let hrs = docVer.getUTCHours();
  rollCount = 0;
  while (hrs !== 0 && rollCount < MAXROLL) {
    if (hrs > 12) docVer = dateFns.addHours(docVer, 1);
    else if (hrs <= 12) docVer = dateFns.addHours(docVer, -1);
    hrs = docVer.getUTCHours();
    rollCount++;
  }
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
  let refDate = dates[country.toLowerCase()];
  let relDate = new Date(Date.now());
  // Roll forward to at least now
  return rollDate(refDate, relDate, offset);
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
  let dateObj = getDate(country, offset);
  // Adjust for timezone offset
  const hours = dateObj.getTimezoneOffset() / 60;
  dateObj = dateFns.addHours(dateObj, hours);
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
  let refDate = dates[country.toLowerCase()];
  // console.log(refDate);
  let relDate = new Date(Date.parse(dateStr));
  // console.log(relDate);
  // Roll forward to at least now
  return rollDate(refDate, relDate, offset);
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