const currencyOne = document.getElementById("currency-one");
const currencyTwo = document.getElementById("currency-two");
const flagOne = document.getElementById("flag-one");
const flagTwo = document.getElementById("flag-two");
const amountOne = document.getElementById("amount-one");
const amountTwo = document.getElementById("amount-two");
const exchangeRateText = document.getElementById("exchange-rate");
const swapButton = document.getElementById("swap");

const API_KEY = "8865dfa71d537400aa1855c1"; 

function updateFlag(selectElement, flagElement) {
    const selectedOption = selectElement.options[selectElement.selectedIndex];
    const flagPath = selectedOption.getAttribute("data-flag");
    flagElement.src = flagPath;
}

function calculate() {
    const currency1 = currencyOne.value;
    const currency2 = currencyTwo.value;

    // Custom rates
    if (currency1 === "RWF" && currency2 === "NGN") {
        const rate = 1.06;
        exchangeRateText.innerText = `1 RWF = ${rate} NGN`;
        amountTwo.value = (amountOne.value * rate).toFixed(2);
        return;
    } else if (currency1 === "NGN" && currency2 === "RWF") {
        const rate = 0.87;
        exchangeRateText.innerText = `1 NGN = ${rate} RWF`;
        amountTwo.value = (amountOne.value * rate).toFixed(2);
        return;
    }

    // Fetch rates from API
    fetch(`https://v6.exchangerate-api.com/v6/8865dfa71d537400aa1855c1/latest/${currency1}`)
        .then(response => response.json())
        .then(data => {
            if (data.conversion_rates) {
                const rate = data.conversion_rates[currency2];
                exchangeRateText.innerText = `1 ${currency1} = ${rate.toFixed(2)} ${currency2}`;
                amountTwo.value = (amountOne.value * rate).toFixed(2);
            } else {
                exchangeRateText.innerText = "Error fetching exchange rates.";
            }
        })
        .catch(() => {
            exchangeRateText.innerText = "Failed to fetch exchange rates.";
        });
}

swapButton.addEventListener("click", () => {
    [currencyOne.value, currencyTwo.value] = [currencyTwo.value, currencyOne.value];
    updateFlag(currencyOne, flagOne);
    updateFlag(currencyTwo, flagTwo);
    calculate();
});

currencyOne.addEventListener("change", () => {
    updateFlag(currencyOne, flagOne);
    calculate();
});

currencyTwo.addEventListener("change", () => {
    updateFlag(currencyTwo, flagTwo);
    calculate();
});

amountOne.addEventListener("input", calculate);
amountTwo.addEventListener("input", calculate);

calculate();