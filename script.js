const currencyOne = document.getElementById("currency-one");
const currencyTwo = document.getElementById("currency-two");
const flagOne = document.getElementById("flag-one");
const flagTwo = document.getElementById("flag-two");
const amountOne = document.getElementById("amount-one");
const amountTwo = document.getElementById("amount-two");
const exchangeRateText = document.getElementById("exchange-rate");
const swapButton = document.getElementById("swap");

function updateFlag(selectElement, flagElement) {
    const selectedOption = selectElement.options[selectElement.selectedIndex];
    const flagPath = selectedOption.getAttribute("data-flag");
    flagElement.src = flagPath;
}

function calculate() {
    const currency1 = currencyOne.value;
    const currency2 = currencyTwo.value;

    fetch(`https://api.exchangerate-api.com/v4/latest/${currency1}`)
        .then(response => response.json())
        .then(data => {
            const rate = data.rates[currency2];
            exchangeRateText.innerText = `1 ${currency1} = ${rate.toFixed(2)} ${currency2}`;
            amountTwo.value = (amountOne.value * rate).toFixed(2);
        });
}

// Swap function
swapButton.addEventListener("click", () => {
    [currencyOne.value, currencyTwo.value] = [currencyTwo.value, currencyOne.value];
    [flagOne.src, flagTwo.src] = [flagTwo.src, flagOne.src];
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
