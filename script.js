const billInput = document.querySelector(".bill-input");
const peopleInput = document.querySelector(".person-input");
const tipPerPerson = document.querySelector(".tip-amount-value");
const billPerPerson = document.querySelector(".bill-amount-value");
const tips = document.querySelectorAll(".tip");
const tipCustom = document.querySelector(".tip-custom");
const resetButton = document.querySelector(".reset");
const errorText = document.querySelector(".error-text");

billInput.addEventListener("input", billInputFunction);
peopleInput.addEventListener("input", peopleInputFunction);
tips.forEach(function (val) {
	val.addEventListener("click", handleClick);
});
tipCustom.addEventListener("input", tipCustomFunction);
resetButton.addEventListener("click", reset);

billInput.value = "0.0";
peopleInput.value = "1";
tipPerPerson.innerHTML = `&#36;${(0.0).toFixed(2)}`;
billPerPerson.innerHTML = `&#36;${(0.0).toFixed(2)}`;

let billValue = "0.0";
let peopleValue = "1";
let tipValue = 0.15;

function billInputFunction() {
	billValue = parseFloat(billInput.value);
	resetButton.disabled = false;
	calculateTip();
}

function peopleInputFunction() {
	peopleValue = parseFloat(peopleInput.value);
	resetButton.disabled = false;
	calculateTip();

	if (peopleValue < 1) {
		errorText.style.display = "block";
		peopleInput.classList.add("error-border");
	} else {
		errorText.style.display = "none";
		peopleInput.classList.remove("error-border");
	}
}

function handleClick(event) {
	tips.forEach(function (val) {
		val.classList.remove("active-tip");
		if (event.target.innerHTML == val.innerHTML) {
			val.classList.add("active-tip");
			tipValue = parseFloat(val.innerHTML) / 100;
		}
	});
	calculateTip();
}

function calculateTip() {
	if (peopleValue >= 1) {
		let tipAmount = (billValue * tipValue) / peopleValue;
		let total = (billValue + tipAmount) / peopleValue;
		tipPerPerson.innerHTML = `&#36;${tipAmount.toFixed(2)}`;
		billPerPerson.innerHTML = `&#36;${total.toFixed(2)}`;
	}
}

function tipCustomFunction() {
	tipValue = parseFloat(tipCustom.value / 100);
	tips.forEach(function (val) {
		val.classList.remove("active-tip");
	});
	resetButton.disabled = false;
	calculateTip();
}

function reset() {
	billInput.value = "0.0";
	peopleInput.value = "1";
	tipCustom.value = "";
	tipPerPerson.innerHTML = `&#36;${(0.0).toFixed(2)}`;
	billPerPerson.innerHTML = `&#36;${(0.0).toFixed(2)}`;
}
