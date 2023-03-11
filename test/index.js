/* Copyright @author: G. Hemingway 2023, All Rights Reserved */
"use strict";

import assert from "node:assert";
import { describe, it } from "mocha";
import aipDate from "../src/index.js";

describe("AIP-Date Functions", () => {
  it("getDate - varying offset index", () => {
    assert.deepStrictEqual(
      aipDate.getDate(1),
      new Date(Date.parse("2020-08-13T00:00:00.000Z"))
    );
    assert.deepStrictEqual(
      aipDate.getDate(),
      new Date(Date.parse("2020-07-16T00:00:00.000Z"))
    );
    assert.deepStrictEqual(
      aipDate.getDate(-1),
      new Date(Date.parse("2020-06-18T00:00:00.000Z"))
    );
    assert.deepStrictEqual(
      aipDate.getDate(-2),
      new Date(Date.parse("2020-05-21T00:00:00.000Z"))
    );
    assert.deepStrictEqual(
      aipDate.getDate(-3),
      new Date(Date.parse("2020-04-23T00:00:00.000Z"))
    );
    assert.deepStrictEqual(
      aipDate.getDate(-4),
      new Date(Date.parse("2020-03-26T00:00:00.000Z"))
    );
    assert.deepStrictEqual(
      aipDate.getDate(-5),
      new Date(Date.parse("2020-02-27T00:00:00.000Z"))
    );
    assert.deepStrictEqual(
      aipDate.getDate(-6),
      new Date(Date.parse("2020-01-30T00:00:00.000Z"))
    );
  });

  it("getDateStr - varying offset index", () => {
    assert.equal(aipDate.getDateStr("us", 1, "yyyy-MM-dd"), "2020-08-13");
    assert.equal(aipDate.getDateStr("us", 0, "yyyy-MM-dd"), "2020-07-16");
    assert.equal(aipDate.getDateStr("us", -1, "yyyy-MM-dd"), "2020-06-18");
    assert.equal(aipDate.getDateStr("us", -2, "yyyy-MM-dd"), "2020-05-21");
    assert.equal(aipDate.getDateStr("us", -3, "yyyy-MM-dd"), "2020-04-23");
    assert.equal(aipDate.getDateStr("us", -4, "yyyy-MM-dd"), "2020-03-26");
    assert.equal(aipDate.getDateStr("us", -5, "yyyy-MM-dd"), "2020-02-27");
    assert.equal(aipDate.getDateStr("us", -6, "yyyy-MM-dd"), "2020-01-30");
  });

  it("getDateAt - sample of dates", () => {
    assert.deepStrictEqual(
      aipDate.getDateAt("5/22/2020"),
      new Date(Date.parse("2020-05-21T00:00:00.000Z"))
    );
    assert.deepStrictEqual(
      aipDate.getDateAt("1/1/2020"),
      new Date(Date.parse("2019-12-05T00:00:00.000Z"))
    );

    assert.deepStrictEqual(
      aipDate.getDateAt("8/3/2019"),
      new Date(Date.parse("2019-07-18T00:00:00.000Z"))
    );
  });

  it("dateRange - sample of dates", () => {
    assert.deepStrictEqual(aipDate.dateRange(4, 4), [
      new Date(Date.parse("2020-03-26T00:00:00.000Z")),
      new Date(Date.parse("2020-04-23T00:00:00.000Z")),
      new Date(Date.parse("2020-05-21T00:00:00.000Z")),
      new Date(Date.parse("2020-06-18T00:00:00.000Z")),
      new Date(Date.parse("2020-07-16T00:00:00.000Z")),
      new Date(Date.parse("2020-08-13T00:00:00.000Z")),
      new Date(Date.parse("2020-09-10T00:00:00.000Z")),
      new Date(Date.parse("2020-10-08T00:00:00.000Z")),
    ]);
  });
});
