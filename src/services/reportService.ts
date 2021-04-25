import {convertCurrencyStringToNumber, convertDateStringToDate, readFile} from "../utils";
import {IDisplayReport, IExpenseReport, IReportInput} from "../types/report";
import os from "os";

export abstract class ReportService {

    abstract generateReport(reportInput: Array<IReportInput>): IExpenseReport;

    abstract transformReport(report: IExpenseReport):  IDisplayReport | null;

    start(): void {
        try {
            /*
            For simplicity we are reading the whole file, but if its huge file we can read a few lines (say 100 lines) at a time.
             */
            const file = readFile();
            const lines = this.processFile(file);
            const report = this.generateReport(lines);
            this.displayReport(this.transformReport(report));
        } catch (error) {
            console.error('Error generating report', JSON.stringify({message: error.message, stack: error.stack}));
        }
    }

    /*
    Take the plain text file input and converts into 'IReportInput' object
     */
    private processFile = (file: string): Array<IReportInput> => {
        const lines: Array<string> = file.split(os.EOL);
        return lines.map((line: string) => {
            const data = line.split(' ');
            return {
                paymentDate: convertDateStringToDate(data[0] || ''),
                code: data[1] || null,
                subCode: data[2] || null,
                monthlyPayment: convertCurrencyStringToNumber(data[3] || ''),
                currentBalance: convertCurrencyStringToNumber(data[4] || ''),
            }
        })
    };

    private displayReport(report: IDisplayReport | null) {
        console.log(report);
    }
}