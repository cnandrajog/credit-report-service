import {FixedExpenseReportService} from "../../services/fixedExpenseReportService";
import {IReportInput} from "../../types/report";


describe('Tests for generateReport() function', () => {
    it('[checking if generateReport() throws exception]', async () => {
        const service = new FixedExpenseReportService();
        expect(service.generateReport).toThrowError('Generate Report input is empty');
    });


    it('[when input for generateReport() is empty or  NULL]', async () => {
        const service = new FixedExpenseReportService();
        try {
            service.generateReport([])
        } catch (error) {
            expect(error.message).toBe('Generate Report input is empty');
        }
    });


    it('[when input for generateReport() is has mortgage expense]', async () => {
        const input: IReportInput[] = [
            {
                code: '10',
                subCode: '12',
                paymentDate: new Date('2015-10-10'),
                monthlyPayment: 1470.31,
                currentBalance: 659218.00
            },
            {
                code: '5',
                subCode: '1',
                paymentDate: new Date('2015-10-10'),
                monthlyPayment: 431.98,
                currentBalance: 51028.00
            },
            {
                code: '8',
                subCode: '15',
                paymentDate: new Date('2015-10-09'),
                monthlyPayment: 340.12,
                currentBalance: 21223.20
            },
            {
                code: '10',
                subCode: '15',
                paymentDate: new Date('2015-10-10'),
                monthlyPayment: 930.12,
                currentBalance: 120413.00
            },
            {
                code: '12',
                subCode: '5',
                paymentDate: new Date('2015-10-09'),
                monthlyPayment: 150.50,
                currentBalance: 6421.21
            },
        ]
        const service = new FixedExpenseReportService();
        expect(service.transformReport(service.generateReport(input))?.fixed_expenses_before_education).toBe(289105);
    });

    it('[when input for generateReport() has current balance as 0 for one of the trade-lines]', async () => {
        const input: IReportInput[] = [
            {
                code: '10',
                subCode: '12',
                paymentDate: new Date('2015-10-10'),
                monthlyPayment: 1470.31,
                currentBalance: 0
            },
            {
                code: '5',
                subCode: '1',
                paymentDate: new Date('2015-10-10'),
                monthlyPayment: 431.98,
                currentBalance: 51028.00
            },
            {
                code: '8',
                subCode: '15',
                paymentDate: new Date('2015-10-09'),
                monthlyPayment: 340.12,
                currentBalance: 21223.20
            },
            {
                code: '10',
                subCode: '15',
                paymentDate: new Date('2015-10-10'),
                monthlyPayment: 930.12,
                currentBalance: 120413.00
            },
            {
                code: '12',
                subCode: '5',
                paymentDate: new Date('2015-10-09'),
                monthlyPayment: 150.50,
                currentBalance: 6421.21
            },
        ]
        const service = new FixedExpenseReportService();
        expect(service.transformReport(service.generateReport(input))?.fixed_expenses_before_education).toBe(142074);
    });

    it('[when input for generateReport() has no mortgage trade-line]', async () => {
        const input: IReportInput[] = [
            {
                code: '5',
                subCode: '1',
                paymentDate: new Date('2015-10-10'),
                monthlyPayment: 431.98,
                currentBalance: 51028.00
            },
            {
                code: '8',
                subCode: '15',
                paymentDate: new Date('2015-10-09'),
                monthlyPayment: 340.12,
                currentBalance: 21223.20
            },
            {
                code: '12',
                subCode: '5',
                paymentDate: new Date('2015-10-09'),
                monthlyPayment: 150.50,
                currentBalance: 6421.21
            },
        ]
        const service = new FixedExpenseReportService();
        expect(service.transformReport(service.generateReport(input))?.fixed_expenses_before_education).toBe(155162);
    });

    it('[when input for generateReport() has current balance 0 for all the mortgage trade-lines]', async () => {
        const input: IReportInput[] = [
            {
                code: '10',
                subCode: '12',
                paymentDate: new Date('2015-10-10'),
                monthlyPayment: 1470.31,
                currentBalance: 0
            },
            {
                code: '5',
                subCode: '1',
                paymentDate: new Date('2015-10-10'),
                monthlyPayment: 431.98,
                currentBalance: 51028.00
            },
            {
                code: '8',
                subCode: '15',
                paymentDate: new Date('2015-10-09'),
                monthlyPayment: 340.12,
                currentBalance: 21223.20
            },
            {
                code: '10',
                subCode: '15',
                paymentDate: new Date('2015-10-10'),
                monthlyPayment: 930.12,
                currentBalance: 0
            },
            {
                code: '12',
                subCode: '5',
                paymentDate: new Date('2015-10-09'),
                monthlyPayment: 150.50,
                currentBalance: 6421.21
            },
        ]
        const service = new FixedExpenseReportService();
        expect(service.transformReport(service.generateReport(input))?.fixed_expenses_before_education).toBe(155162);
    });
});


