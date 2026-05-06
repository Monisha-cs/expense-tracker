
    let transactions = [];

    function addTransaction() {
        const text = document.getElementById('text').value;
        const amount = parseFloat(document.getElementById('amount').value);

        if (text === '' || isNaN(amount)) {
            alert('Please enter description and amount!');
            return;
        }

        const transaction = { id: Date.now(), text, amount };
        transactions.push(transaction);

        updateUI();

        document.getElementById('text').value = '';
        document.getElementById('amount').value = '';
    }

    function updateUI() {
        const list = document.getElementById('list');
        list.innerHTML = '';

        let income = 0, expense = 0;

        transactions.forEach(t => {
            const li = document.createElement('li');
            li.className = t.amount > 0 ? 'plus' : 'minus';
            li.innerHTML = `
                <span>${t.text}</span>
                <span>₹${t.amount}</span>
                <button class="delete-btn" onclick="deleteTransaction(${t.id})">X</button>
            `;
            list.appendChild(li);

            if (t.amount > 0) income += t.amount;
            else expense += Math.abs(t.amount);
        });

        document.getElementById('balance').textContent = (income - expense).toFixed(2);
        document.getElementById('income').textContent = income.toFixed(2);
        document.getElementById('expense').textContent = expense.toFixed(2);
    }

    function deleteTransaction(id) {
        transactions = transactions.filter(t => t.id !== id);
        updateUI();
    }