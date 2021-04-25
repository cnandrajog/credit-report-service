import {convertCurrencyStringToNumber, convertDateStringToDate} from "../utils";

describe('convertCurrencyStringToNumber() utility function', () => {
    it('[when input is empty for convertCurrencyStringToNumber() ]', async () => {
        expect(convertCurrencyStringToNumber("")).toBeNull();
    });

    it('[when input is valid for convertCurrencyStringToNumber() ]', async () => {
        expect(convertCurrencyStringToNumber("$120.34")).toBe(120.34);
        expect(convertCurrencyStringToNumber("$12,045.34")).toBe(12045.34);
        expect(convertCurrencyStringToNumber("0.00")).toBe(0);
    });

    it('[when input is in-valid for convertCurrencyStringToNumber() ]', async () => {
        expect(convertCurrencyStringToNumber("$12--045.34")).toBeNull();
    });
});

describe('convertDateStringToDate() utility function', () => {
    it('[when input is empty for convertCurrencyStringToNumber() ]', async () => {
        expect(convertDateStringToDate("")).toBeNull();
    });

    it('[when input is valid for convertDateStringToDate() ]', async () => {
        expect(convertDateStringToDate("2020-01-19")?.toDateString()).toBe( (new Date("2020-01-19")).toDateString());

    });

    it('[when input is in-valid for convertCurrencyStringToNumber() ]', async () => {
        expect(convertCurrencyStringToNumber("2020-t-19")).toBeNull();
    });
});
