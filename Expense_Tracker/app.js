const balanceEl = document.getElementById('total-balance');
const incomeEl = document.getElementById('total-income');
const expenseEl = document.getElementById('total-expense');
const formEl = document.getElementById('transaction-form');
const submitBtn = document.getElementById('submit-btn');
const listEl = document.getElementById('transaction-list');
const textInput = document.getElementById('text');
const amountInput = document.getElementById('amount');
const typeInput = document.getElementById('type');

let editId = null;

let transactions = JSON.parse(localStorage.getItem('transactions')) || [
    { id: 1, name: 'Salary', amount: 3000, type: 'income' },
    { id: 2, name: 'Rent', amount: 800, type: 'expense' }
];

function saveToLocalStorage() {
    localStorage.setItem('transactions', JSON.stringify(transactions));
}

function updateDOM() {
    listEl.innerHTML = '';
    
    const income = transactions
        .filter(t => t.type === 'income')
        .reduce((sum, t) => sum + t.amount, 0);

    const expense = transactions
        .filter(t => t.type === 'expense')
        .reduce((sum, t) => sum + t.amount, 0);

    const balance = income - expense;

    transactions.forEach(transaction => {
        const isIncome = transaction.type === 'income';
        const li = document.createElement('li');
        li.className = isIncome ? 'income-item' : 'expense-item';
        
        li.innerHTML = `
            <span>${transaction.name}</span>
            <span>${isIncome ? '+' : '-'}₹${transaction.amount.toFixed(2)}</span>
            <div>
                <button onclick="editTransaction(${transaction.id})">Edit</button>
                <button onclick="deleteTransaction(${transaction.id})">Delete</button>
            </div>
        `;
        listEl.appendChild(li);
    });

    const formattedBalance = balance >= 0 ? `₹${balance.toFixed(2)}` : `-₹${Math.abs(balance).toFixed(2)}`;

    balanceEl.textContent = `Total Balance: ${formattedBalance}`;
    incomeEl.textContent = `Total Income: ₹${income.toFixed(2)}`;
    expenseEl.textContent = `Total Expenses: ₹${expense.toFixed(2)}`;

    saveToLocalStorage();
}

function handleFormSubmit(e) {
    e.preventDefault();

    const name = textInput.value;
    const amount = parseFloat(amountInput.value);
    const type = typeInput.value;

    if (editId) {
        transactions = transactions.map(t => 
            t.id === editId ? { ...t, name, amount, type } : t
        );
        editId = null;
        submitBtn.textContent = 'Add Transaction';
    } else {
        transactions.push({ id: Date.now(), name, amount, type });
    }

    updateDOM();
    formEl.reset();
}

function editTransaction(id) {
    const target = transactions.find(t => t.id === id);
    if (!target) return;

    textInput.value = target.name;
    amountInput.value = target.amount;
    typeInput.value = target.type;

    editId = id;
    submitBtn.textContent = 'Save Update';
}

function deleteTransaction(id) {
    if (editId === id) {
        editId = null;
        submitBtn.textContent = 'Add Transaction';
        formEl.reset();
    }
    transactions = transactions.filter(t => t.id !== id);
    updateDOM();
}

formEl.addEventListener('submit', handleFormSubmit);
window.deleteTransaction = deleteTransaction;
window.editTransaction = editTransaction;

updateDOM();
