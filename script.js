const apiKey = '-=-----------------------'; // Replace with your ExchangeRate-API key
const apiUrl = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/USD`;

document.addEventListener('DOMContentLoaded', () => {
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            if (data.result === 'error') {
                alert(data['error-type']);
                return;
            }

            const currencies = Object.keys(data.conversion_rates);
            const fromCurrencySelect = document.getElementById('from-currency');
            const toCurrencySelect = document.getElementById('to-currency');

            currencies.forEach(currency => {
                const optionFrom = document.createElement('option');
                optionFrom.value = currency;
                optionFrom.textContent = currency;
                fromCurrencySelect.appendChild(optionFrom);

                const optionTo = document.createElement('option');
                optionTo.value = currency;
                optionTo.textContent = currency;
                toCurrencySelect.appendChild(optionTo);
            });
        })
        .catch(error => {
            console.error('Error fetching the currency data:', error);
            alert('Error fetching the currency data');
        });

    document.getElementById('convert-btn').addEventListener('click', () => {
        const amount = parseFloat(document.getElementById('amount-input').value);
        const fromCurrency = document.getElementById('from-currency').value;
        const toCurrency = document.getElementById('to-currency').value;

        if (isNaN(amount)) {
            alert('Please enter a valid amount');
            return;
        }

        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                if (data.result === 'error') {
                    alert(data['error-type']);
                    return;
                }

                const rate = data.conversion_rates[toCurrency] / data.conversion_rates[fromCurrency];
                const convertedAmount = (amount * rate).toFixed(2);

                document.getElementById('converted-amount').textContent = `${convertedAmount} ${toCurrency}`;
            })
            .catch(error => {
                console.error('Error fetching the conversion rate:', error);
                alert('Error fetching the conversion rate');
            });
    });
});
