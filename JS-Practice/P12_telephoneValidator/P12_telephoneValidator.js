const userInput = document.getElementById("user-input");
const result = document.getElementById("results-div");
const checkBtn = document.getElementById("check-btn");
const clearBtn = document.getElementById("clear-btn");


const isValidNumber = (userInput) => {
    if(userInput === ""){
        alert("Please provide a phone number");
    }

    const vaildityRegex = /^(\(1\)|1)?( |-)?(\(\d{3}\)|\d{3})( |-)?\d{3}( |-)?\d{4}$/;
    return vaildityRegex.test(userInput);
}

function checkValidity(e){
    e.preventDefault();

    if(isValidNumber(userInput.value)){
        result.innerHTML = `
        <p>Valid US number: ${userInput.value}</p>
        `;
    } else {
        result.innerHTML = `
        <p>Invalid US number: ${userInput.value}</p>
        `;
    }
    result.classList.remove("hide");
}

checkBtn.addEventListener("click", checkValidity);
clearBtn.addEventListener("click", (e) => {
    result.textContent = "";
    result.classList.add("hide");
});