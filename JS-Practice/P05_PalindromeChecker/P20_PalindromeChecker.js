const text = document.getElementById('text-input');
const result = document.getElementById('result');
const checkBtn = document.getElementById('check-btn');

function isPalindrome(text){
    if(text === ''){
        alert(`Please input a value`);
    }

    text = text.replace(/[\W_]/g, "").replace(/\s+/g, "").toLowerCase();
    const textRev = text.split('').reverse().join('').toLowerCase();
    return text === textRev;
}

function returnAns(e){
    e.preventDefault();

    if(isPalindrome(text.value)){
        result.innerHTML = `
            <p><strong>${text.value}</strong> is a palindrome.</p>
        `;
        result.classList.remove('hide');
    } else {
        result.innerHTML = `
        <p><strong>${text.value}</strong> is not a palindrome.</p>
        `;
        result.classList.remove('hide');
    }
}

checkBtn.addEventListener("click", returnAns);