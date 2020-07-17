/* Copyright G. Hemingway 2020 */
"use strict";

import dateFns from "date-fns";

const dates = {
    us: new Date(Date.UTC(2020, 0, 2))
};
const MAXROLL = 100;


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
    return docVer;
};

/***
 *
 * @param country
 * @param offset
 * @returns
 */
export const getAIPDate = (country = "us", offset = 0) => {
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
};

/***
 *
 * @param country
 * @param offset
 * @param format
 * @returns {string}
 */
export const getAIPDateStr = (country = "us", offset = 0, format) => {
    const docVer = getAIPDate(country, offset, format);
    return dateFns.format(docVer, format);
};
