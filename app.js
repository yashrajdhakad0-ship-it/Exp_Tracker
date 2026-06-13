// Select DOM Elements using specific IDs
const balanceEl = document.getElementById('total-balance');
const incomeEl = document.getElementById('total-income');
const expenseEl = document.getElementById('total-expense');
const formEl = document.getElementById('transaction-form');
const listEl = document.getElementById('transaction-list');
const textInput = document.getElementById('text');
const amountInput = document.getElementById('amount');
const typeInput = document.getElementById('type');

// Load transactions from localStorage or fall back to mock data
let transactions = JSON.parse(localStorage.getItem('transactions')) || [
    { id: 1, name: 'Salary', amount: 3000, type: 'income' },
    { id: 2, name: 'Rent', amount: 800, type: 'expense' }
];

// Helper function to save transactions list to localStorage
function saveToLocalStorage() {
    localStorage.setItem('transactions', JSON.stringify(transactions));
}

// Update dashboard figures, build transaction logs, and sync localStorage
function updateDOM() {
    listEl.innerHTML = '';
    
    let balance = 0;
    let income = 0;
    let expense = 0;

    // Loop through transactions to build list items and sum totals
    transactions.forEach(transaction => {
        const isIncome = transaction.type === 'income';

        if (isIncome) {
            income += transaction.amount;
            balance += transaction.amount;
        } else {
            expense += transaction.amount;
            balance -= transaction.amount;
        }

        // Create list item
        const li = document.createElement('li');
        li.className = isIncome ? 'income-item' : 'expense-item';
        
        li.innerHTML = `
            <span>${transaction.name}</span>
            <span>${isIncome ? '+' : '-'}₹${transaction.amount.toFixed(2)}</span>
            <button onclick="deleteTransaction(${transaction.id})">Delete</button>
        `;
        listEl.appendChild(li);
    });

    // Handle styling for negative values in the balance display
    const formattedBalance = balance >= 0 ? `₹${balance.toFixed(2)}` : `-₹${Math.abs(balance).toFixed(2)}`;

    // Write text directly to the DOM elements containing labels
    balanceEl.textContent = `Total Balance: ${formattedBalance}`;
    incomeEl.textContent = `Total Income: ₹${income.toFixed(2)}`;
    expenseEl.textContent = `Total Expenses: ₹${expense.toFixed(2)}`;

    // Save current state of transactions
    saveToLocalStorage();
}

// Add a transaction from form input values
function addTransaction(e) {
    e.preventDefault();

    const name = textInput.value;
    const amount = parseFloat(amountInput.value);
    const type = typeInput.value;

    const newTransaction = {
        id: Date.now(),
        name: name,
        amount: amount,
        type: type
    };

    transactions.push(newTransaction);
    updateDOM();
    formEl.reset();
}

// Delete transaction helper
function deleteTransaction(id) {
    transactions = transactions.filter(t => t.id !== id);
    updateDOM();
}

// Bind standard event listener and globalize functions
formEl.addEventListener('submit', addTransaction);
window.deleteTransaction = deleteTransaction;

// Run initial update on page load
updateDOM();