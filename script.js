document.addEventListener('DOMContentLoaded', () => {
    const resultInput = document.getElementById('result');
    const errorMessage = document.getElementById('error-message');
    const amountInput = document.getElementById('amount');
    const currencyFrom = document.getElementById('currency-from');
    const currencyTo = document.getElementById('currency-to');

    const apiKey = '028c86c4643c958ef2eb52a3'; // Your API key

    const fetchAndDisplayRate = async () => {
        const amount = amountInput.value;
        const fromCurrency = currencyFrom.value;
        const toCurrency = currencyTo.value;
        
        if (!amount || amount <= 0) {
            errorMessage.textContent = 'Please enter a valid amount.';
            resultInput.value = '';
            return;
        }

        errorMessage.textContent = '';
        const rate = await getCurrencyRate(fromCurrency, toCurrency);
        if (rate) {
            resultInput.value = (amount * rate).toFixed(2);
        } else {
            errorMessage.textContent = 'Error fetching the rate. Please try again.';
            resultInput.value = '';
        }
    };

    amountInput.addEventListener('input', fetchAndDisplayRate);
    currencyFrom.addEventListener('change', fetchAndDisplayRate);
    currencyTo.addEventListener('change', fetchAndDisplayRate);

    const getCurrencyRate = async (fromCurrency, toCurrency) => {
        try {
            const response = await fetch(`https://api.exchangerate-api.com/v4/latest/${fromCurrency}?apikey=${apiKey}`);
            const data = await response.json();
            return data.rates[toCurrency];
        } catch (error) {
            console.error('Error fetching the rate:', error);
        }
    };
});
