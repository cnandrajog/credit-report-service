export interface IReportInput  {
    code: string | null
    subCode: string | null
    paymentDate: Date | null
    monthlyPayment: number | null
    currentBalance: number | null
}

export interface ITradeLine  {
  type: string | null
  monthlyPayment: number | null
  currentBalance: number | null
}

export interface IReportKey  {
    code: string
    subCode?: string
}

export interface IExpenseReport {
    tradeLines: Array<ITradeLine>
}

// Fixed expense report before education
export interface IFixedExpenseReport extends IExpenseReport{
    fixedExpensesBeforeEducation: number

}
export interface IDisplayReport {
    tradelines: Array<{
        type: string | null,
        monthly_payment: number | null,
        current_balance: number | null
    }>

}

export interface IDisplayFixedExpenseReport extends  IDisplayReport{
    fixed_expenses_before_education: number,
}