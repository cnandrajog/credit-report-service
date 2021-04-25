import {ReportService} from "./reportService";
import {IDisplayFixedExpenseReport, IFixedExpenseReport, IReportInput, ITradeLine} from "../types/report";
import {EXPENSE_CODES, NATIONAL_AVE_MONTHLY_RENT} from "../constants/expenseConstant";

export class FixedExpenseReportService extends ReportService {

    // expense that needs to be excluded from the expense report
    private excludeExpense = {
        [JSON.stringify({code: '5', subCode: 'any'})]: {
            type: 'education',
            code: '5',
            subCode: 'any'
        },
    }

    generateReport(reportInput: IReportInput[]): IFixedExpenseReport {

        if (!reportInput || !reportInput.length) {
            console.error('Generate Report input is empty', {reportInput})
            throw new Error('Generate Report input is empty');
        }
        let fixedExpensesBeforeEducation: number = 0
        const tradeLines: Array<ITradeLine> = [];
        let isMortgageTradeLine: boolean = false;
        fixedExpensesBeforeEducation = Number(fixedExpensesBeforeEducation.toFixed(2));``

        for (const input of reportInput) {
            const expenseCodeType = EXPENSE_CODES[this.getReportKey(input.code, input.subCode)] || EXPENSE_CODES[this.getReportKey(input.code)];

            //Calculating, If the credit report contains any mortgage trade-lines. And if the mortgage trade-lines have currentBalance > 0
            isMortgageTradeLine = ( isMortgageTradeLine ||
                (expenseCodeType && expenseCodeType.type === 'mortgage' && expenseCodeType && input.currentBalance  && input.currentBalance > 0)) || false;

            tradeLines.push({
                type: expenseCodeType?.type || 'other',
                monthlyPayment: input.monthlyPayment,
                currentBalance: input.currentBalance
            });

            if (input.monthlyPayment && input.currentBalance && !this.excludeExpense[this.getReportKey(input.code)]) {
                fixedExpensesBeforeEducation += input.monthlyPayment
            }
        }


        //Adding national average monthly rent If the credit report contains no mortgage trade-lines,
        if (!isMortgageTradeLine) {
            fixedExpensesBeforeEducation += NATIONAL_AVE_MONTHLY_RENT;
        }

        return {
            fixedExpensesBeforeEducation,
            tradeLines
        }
    }


    getReportKey(code: string | null, subCode: string | null = 'any'): string {
        if (!subCode) {
            subCode = 'any';
        }

        return JSON.stringify({
            code,
            subCode
        })
    }

    transformReport (expenseReport: IFixedExpenseReport) : IDisplayFixedExpenseReport | null{
        if (expenseReport) {
            const {fixedExpensesBeforeEducation, tradeLines} = expenseReport;
            return {
                fixed_expenses_before_education: Math.round((fixedExpensesBeforeEducation + Number.EPSILON) * 100),
                tradelines: tradeLines.map((line: ITradeLine) => {
                    return {
                        type: line.type,
                        monthly_payment: line.monthlyPayment ? line.monthlyPayment * 100 : null,
                        current_balance: line.currentBalance ? line.currentBalance * 100 : null
                    }
                })
            }
        }
        return null
    };
}