import * as fs from 'fs';
import * as path from "path";

export const readFile = (file: string = "input.txt") => {
    const filePath = path.join(process.cwd(), file);
    try {
        return fs.readFileSync(filePath, 'utf-8');
    } catch (error) {
        console.error('Error reading input file', JSON.stringify({ message: error.message, stack: error.stack }));
        throw new Error('Error reading input file');
    }
};

/*
This function can be improved for invalid currency input
 */
export const convertCurrencyStringToNumber = (currency: string): number | null => {
    if (!currency)
        return null;

    const curr = Number(currency.replace(/[^0-9.-]+/g,""));
    return isNaN(curr)? null : curr;
}

export const convertDateStringToDate = (dateString: string): Date | null => {
    if (!Date.parse(dateString))
        return null;

    return new Date(dateString)
}