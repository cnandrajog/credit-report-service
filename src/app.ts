import {FixedExpenseReportService} from "./services/fixedExpenseReportService";

const service = new FixedExpenseReportService();

try {
    service.start();
} catch (error) {
    console.error('Error starting the application', JSON.stringify({ message: error.message, stack: error.stack }))
}