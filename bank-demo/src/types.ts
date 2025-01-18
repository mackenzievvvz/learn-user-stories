export type AccountType = {
    id: number,
    balance: number
    username: string
}

export interface BankType {
    createAccount(username: string, age: number, accountNumber: number): AccountType
}