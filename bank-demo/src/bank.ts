import { BankType, AccountType } from './types';

/**
 * This class implements a bank that can
 * maintain accounts and create new accounts
 */

export class Bank implements BankType {
    private accounts: AccountType[] = [];
    private usernames: string[] = [];

    /**
     * The constructor initialized the bank with accounts and usernames
     * @param accounts - array of accounts
     * @param usernames - array of usernames
     */
    public constructor(accounts: AccountType[], usernames: string[]) {
        this.accounts = accounts;
        this.usernames = usernames;
    }

    /**
     * 
     * @param id - account id
     * @returns - true if account id exists, false otherwise
     */
    private findAccountById(id: number): AccountType | undefined {
        return this.accounts.find(account => account.id === id);
    }

    private isAccountNumberInvalid(accountNumber: number): boolean {
        return accountNumber.toString().length !== 10;
    }

    private isUsernameExisits(username: string): boolean {
        return this.usernames.includes(username);
    }

    private canAccessAccount(username:string, accountNumber: number): boolean {
        let acc = this.findAccountById(accountNumber);
        if(acc?.username === username) {
            return true;
        }
        return false;
    }

    private positiveAmount = (amount: number): boolean => amount > 0;

    /** creates an account 
     * 
     * @param username 
     * @param age 
     * @param accountNumber 
     * @returns a new account with a ten-digit unique id and zero balance
     */
    createAccount(username: string, age: number, accountNumber: number): AccountType {
        if(this.isAccountNumberInvalid(accountNumber)) {
            throw new Error('Invalid account number');
        }
        if(!this.isUsernameExisits(username)) {
            throw new Error('User not found');
        }
        if(age < 18) {
            throw new Error('User is under 18');
        }
        if(this.findAccountById(accountNumber)) {
            throw new Error('Account already exists');
        }
        const account: AccountType = {
            id: accountNumber,
            balance: 0,
            username: username
        };
        this.accounts.push(account);
        return account;
    }

    /** deposits money into an account
     * 
     * @param username - username
     * @param accountNumber - account number
     * @param amount - amount to deposit
     * @returns the new balance
     */
    deposit(username:string, accountNumber: number, amount: number): number {
        if(!this.isUsernameExisits(username)) {
            throw new Error('User not found');
        }
        let account = this.findAccountById(accountNumber);
        if(!account) {
            throw new Error('Account not found');
        }
        if(!this.canAccessAccount(username, accountNumber)) {
            throw new Error('Unauthorized access');
        }
        if(!this.positiveAmount(amount)) {
            throw new Error('Invalid amount, must be positive');
        }
        account.balance += amount;
        console.log("successful deposit!");
        return account.balance;
    }

    /** withdraws money into an account
     * 
     * @param username - username
     * @param accountNumber - account number
     * @param amount - amount to withdraw
     * @returns the new balance
     */
    withdraw(username:string, accountNumber: number, amount: number): number {
        if(!this.isUsernameExisits(username)) {
            throw new Error('User not found');
        }
        let account = this.findAccountById(accountNumber);
        if(!account) {
            throw new Error('Account not found');
        }
        if(!this.canAccessAccount(username, accountNumber)) {
            throw new Error('Unauthorized access');
        }
        if(!this.positiveAmount(amount)) {
            throw new Error('Invalid amount, must be positive');
        }
        if(account.balance < amount) {
            throw new Error('Insufficient funds');
        }
        account.balance -= amount;
        console.log("successful withdrawal!");
        return account.balance;
    }

    /** gets the balance of an account
     * 
     * @param username - username
     * @param accountNumber - account number
     * @returns the balance
     */
    getBalance(username: string, accountNumber: number): number {
        if(!this.isUsernameExisits(username)) {
            throw new Error('User not found');
        }
        let account = this.findAccountById(accountNumber);
        if(!account) {
            throw new Error('Account not found');
        }
        if(!this.canAccessAccount(username, accountNumber)) {
            throw new Error('Unauthorized access');
        }
        console.log('successful balance check:', account.balance);
        return account.balance;
    }
}