const cashInput = document.getElementById("cash");
const purchaseBtn = document.getElementById("purchase-button");
const changeDue = document.getElementById("change-due");

let price = 1.87;
let cid = [
  ["PENNY", 1.01],
  ["NICKEL", 2.05],
  ["DIME", 3.1],
  ["QUARTER", 4.25],
  ["ONE", 90],
  ["FIVE", 55],
  ["TEN", 20],
  ["TWENTY", 60],
  ["ONE HUNDRED", 100]
];

const checkCashRegister = () => {
    let userCash = Number(cashInput.value);
    
    if(userCash < price){
        alert('Customer does not have enough money to purchase the item');
        cashInput.value = '';
        return;
    }

    if(userCash === price){
        changeDue.innerHTML = 'No change due - customer paid with exact cash';
        changeDue.style.display = 'block';
        cashInput.value = '';
        return;
    }

    let changeAmount = userCash - price;
    let change = calculateChange(changeAmount, cid);

    if (change.status === "INSUFFICIENT_FUNDS") {
        changeDue.innerHTML = 'Status: INSUFFICIENT_FUNDS';
        changeDue.style.display = 'block';
    } else if(change.status === "CLOSED"){
        changeDue.innerHTML = `Status: ${change.status} : ${change.change.map(c => `${c[0]}: $${c[1].toFixed(2)}`).join(' ')}`;
        changeDue.style.display = 'block';
    } else {
        changeDue.innerHTML = `Status: ${change.status} : ${change.change.map(c => `${c[0]}: $${c[1].toFixed(2)}`).join(' ')}`;
        changeDue.style.display = 'block';
    }

    cashInput.value = '';
}

purchaseBtn.addEventListener("click", checkCashRegister);

const calculateChange = (changeDue, cid) => {
    const currencyUnit = {
        "ONE HUNDRED": 100,
        "TWENTY": 20,
        "TEN": 10,
        "FIVE": 5,
        "ONE": 1,
        "QUARTER": 0.25,
        "DIME": 0.1,
        "NICKEL": 0.05,
        "PENNY": 0.01
    };

    let totalCid = cid.reduce((sum, elem) => sum + elem[1], 0); // here we total the amount of cash we have
    totalCid = parseFloat(totalCid.toFixed(2)); // here we convert that amount in a "float" value with upto 2 decimal values

    if(totalCid < changeDue){
        return { status: "INSUFFICIENT_FUNDS", change: [] };
    }

    let changeArr = [];
    let reversedCid = [...cid].reverse();

    for(let [denom, amount] of reversedCid){
        let value = currencyUnit[denom];
        let amountOfDenom = 0;

        while(changeDue >= value && amount > 0){
            amount -= value;
            changeDue -= value;
            changeDue = parseFloat(changeDue.toFixed(2));
            amountOfDenom += value;
        }

        if(amountOfDenom > 0){
            changeArr.push([denom, amountOfDenom]);
        }
    }

    if(changeDue > 0){
        return { status: "INSUFFICIENT_FUNDS", change: [] };
    }

    let changeTotal = changeArr.reduce((sum, elem) => sum + elem[1], 0);
    if(changeTotal < totalCid){
        return { status: "OPEN", change: changeArr };
    } else {
        return { status: "CLOSED", change: changeArr };
    }
}