const numberInput = document.getElementById("number");
const convertBtn = document.getElementById("convert-btn");
const output = document.getElementById("output");

const decimalToRoman = (input) => {
    const values = [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1];
    const romanNumerals = ["M", "CM", "D", "CD", "C", "XC", "L", "XL", "X", "IX", "V", "IV", "I"];

    let i = 0;
    let sb = "";
    while(input > 0){
        if(input >= values[i]){
            sb += romanNumerals[i];
            input -= values[i];
        } else {
            i++;
        }
    }
    return sb;
};

const checkUserInput = () => {
    const inputInt = parseInt(numberInput.value);

    if(!numberInput.value || isNaN(inputInt)){
        output.textContent = "Please enter a valid number";
        return;
    } else if(inputInt === -1){
        output.textContent = "Please enter a number greater than or equal to 1";
        return;
    } else if(inputInt >= 4000){
        output.textContent = "Please enter a number less than or equal to 3999";
        return;
    } else {
        output.textContent = decimalToRoman(inputInt);
        numberInput.value = "";
    }
};

convertBtn.addEventListener("click", checkUserInput);

// this funciton checks what latest event occured than uses that event as the argument,
// to get that event 'e' is a pre-defined variable that holds that event, and has pre-defined methods,
// to use on it.
numberInput.addEventListener("keydown", (e) => {
    if(e.key === "Enter"){
        checkUserInput();
    }
});