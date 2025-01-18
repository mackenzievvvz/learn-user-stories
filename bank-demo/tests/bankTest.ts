import { Bank } from '../src/bank';

const accounts = [{ id: 1234567890, balance: 5000, username: 'user1' },
{ id: 1234567891, balance: 10000, username: 'user1'}];

const usernames = ['user1', 'user2'];

const bank = new Bank(accounts, usernames);

// --------------------------------------------
//              TEST CREATE ACCOUNT
// --------------------------------------------

// Scenario 1: successful account created
const acc = bank.createAccount('user1', 20, 1234567892);
if (acc.id !== 1234567892
    || acc.balance !== 0
    || acc.id.toString().length !== 10) {
    console.log('create account: Scenario 1 failed');
}
else {
    console.log('create account: Scenario 1 passed');
}

try {
    bank.createAccount('user1', 20, 1234567892);
    console.log('create account: Scenario 1 failed');
}
catch(e) {
    console.log('create account: Scenario 1 passed');
}

// scenario 2: unsuccessful account creation due to customer being below 18

try {
    bank.createAccount('user1', 17, 1234567899);
    console.log('create account: Scenario 2 failed');
}
catch(e) {
    console.log('create account: Scenario 2 passed');
}

// Scenario 3: unsuccessful account creation due to invalid username

try {
    bank.createAccount('user3', 20, 1234567888);
    console.log('create account: Scenario 3 failed');
}
catch(e) {
    console.log('create account: Scenario 3 passed');
}



// --------------------------------------------
//              TEST DEPOSIT
// --------------------------------------------

// Scenario 1: successful deposit
try {
    let balance = bank.deposit('user1', 1234567890, 500);
    if (balance !== 5500) {throw new Error();}
    console.log('deposit: Scenario 1 passed');
} catch(e) {
    console.log('deposit: Scenario 1 failed');
}

// Scenario 2: unsuccessful deposit due to invalid username
try {
    bank.deposit('user3', 1234567890, 500);
    console.log('deposit: Scenario 2 failed');
} catch(e) {
    if (e instanceof Error && e.message === 'User not found') {
        console.log('deposit: Scenario 2 passed');
    } else {
        console.log('deposit: Scenario 2 failed');
    }
}

// Scenario 3: unsuccessful deposit due to account not found
try {
    bank.deposit('user1', 1111111111, 500);
    console.log('deposit: Scenario 3 failed');
} catch(e) {
    if (e instanceof Error && e.message === 'Account not found') {
        console.log('deposit: Scenario 3 passed');
    } else {
        console.log('deposit: Scenario 3 failed');
    }
}

// Scenario 4: unsuccessful deposit due to account not belonging to user
try {
    bank.deposit('user2', 1234567891, 500);
    console.log('deposit: Scenario 4 failed');
} catch(e) {
    if (e instanceof Error && e.message === 'Unauthorized access') {
        console.log('deposit: Scenario 4 passed');
    } else {
        console.log('deposit: Scenario 4 failed');
    }
}

// Senario 5: unsuccessful deposit due to negative amount
try {
    bank.deposit('user1', 1234567891, -10);
    console.log('deposit: Scenario 5 failed');
} catch(e) {
    if (e instanceof Error && e.message === 'Invalid amount, must be positive') {
        console.log('deposit: Scenario 5 passed');
    } else {
        console.log('deposit: Scenario 5 failed');
    }
}


// --------------------------------------------
//              TEST WITHDRAWAL
// --------------------------------------------

// Scenario 1: successful withdrawal
try {
    let balance = bank.withdraw('user1', 1234567890, 500);
    if (balance !== 5000) {throw new Error();}
    console.log('withdrawal: Scenario 1 passed');
} catch(e) {
    console.log('withdrawal: Scenario 1 failed');
}

// Scenario 2: unsuccessful withdrawal due to invalid username
try {
    bank.withdraw('user3', 1234567890, 500);
    console.log('withdrawal: Scenario 2 failed');
} catch(e) {
    if (e instanceof Error && e.message === 'User not found') {
        console.log('withdrawal: Scenario 2 passed');
    } else {
        console.log('withdrawal: Scenario 2 failed');
    }
}

// Scenario 3: unsuccessful withdrawal due to account not found
try {
    bank.withdraw('user1', 1111111111, 500);
    console.log('withdrawal: Scenario 3 failed');
} catch(e) {
    if (e instanceof Error && e.message === 'Account not found') {
        console.log('withdrawal: Scenario 3 passed');
    } else {
        console.log('withdrawal: Scenario 3 failed');
    }
}

// Scenario 4: unsuccessful withdrawal due to account not belonging to user
try {
    bank.withdraw('user2', 1234567891, 500);
    console.log('withdrawal: Scenario 4 failed');
} catch(e) {
    if (e instanceof Error && e.message === 'Unauthorized access') {
        console.log('withdrawal: Scenario 4 passed');
    } else {
        console.log('withdrawal: Scenario 4 failed');
    }
}

// Senario 5: unsuccessful withdrawal due to negative amount
try {
    bank.withdraw('user1', 1234567891, -10);
    console.log('withdrawal: Scenario 5 failed');
} catch(e) {
    if (e instanceof Error && e.message === 'Invalid amount, must be positive') {
        console.log('withdrawal: Scenario 5 passed');
    } else {
        console.log('withdrawal: Scenario 5 failed');
    }
}

// Senario 6: unsuccessful withdrawal due to insufficient balance
try {
    bank.withdraw('user1', 1234567890, 6000);
    console.log('withdrawal: Scenario 6 failed');
} catch(e) {
    if (e instanceof Error && e.message === 'Insufficient funds') {
        console.log('withdrawal: Scenario 6 passed');
    }
    else {
        console.log('withdrawal: Scenario 6 failed');
    }
}