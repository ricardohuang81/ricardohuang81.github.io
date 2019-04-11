document.getElementById('clickMe').addEventListener('click', (event) => {
        event.preventDefault();
        let userInputs = "";
        const inputsSelector = document.getElementsByClassName('inputs');
        for (let i = 0; i < inputsSelector.length; i++) {
            userInputs += inputsSelector[i].value;
        }
        validateCreditCard(userInputs);
});

const validateCreditCard = (creditCardStr) => {
    // This portion of the code splits the credit card number string "1234555500009876" into an array of individual strings like this: ['1', '2', '3', '4', '5', '5', '5', '5', '0', '0', '0', '0', '9', '8', '7', '6']
    const stringArray = creditCardStr.split('');
    // This portion of the code addresses if the number of credit card number digits is equal to 16 or not.
    const stringArrayLength = stringArray.length;
    if (stringArrayLength !== 16) {
        document.getElementById('output').style.color = 'red';
        document.getElementById('output').innerHTML = "😡 Your credit card number does NOT have 16 numbers, you need 16! 16!!"
        return false;
    };
    // This portion of the code addresses if the credit card number is in fact all numbers or not.
    const longNumber = Number(stringArray.join(''));
    if (isNaN(longNumber)) {
        document.getElementById('output').style.color = 'red';
        document.getElementById('output').innerHTML = "😤 Your credit card number does NOT consist of ONLY numbers, get rid of that crap, stop scheming!";
        return false;
    };
    // This portion of the code addresses whether or not the last digit of the credit card number is even.
    const lastDigit = parseInt(stringArray[stringArray.length - 1]);
    if (lastDigit % 2 !== 0) {
        document.getElementById('output').style.color = 'red';
        document.getElementById('output').innerHTML = "😕 The last digit of your credit card number is NOT even an EVEN number, it needs EVEN!!";
        return false;
    };
    // This portion of the code addresses if there are least 2 different numbers in your 16-digit credit card number.
    const oneNumberCheck = (currentValue) => {
        return parseInt(currentValue) === lastDigit;
    };
    if (stringArray.every(oneNumberCheck)) {
        document.getElementById('output').style.color = 'red';
        document.getElementById('output').innerHTML = "🤔 Your credit card number has all the same numbers, that's bullshit!";
        return false;
    };
    // This portion of the code addresses if the sum of all 16 digits is equal to at least 16.
    let sum = 0;
    for (let i = 0; i < stringArray.length; i++) {
        sum += parseInt(stringArray[i]);
    };
    if (sum < 16) {
        document.getElementById('output').style.color = 'red';
        document.getElementById('output').innerHTML = "😑 The sum of all 16 credit card number digits is equal to LESS than 16, you're in violation of rule #5!";
        return false;
    } else {
        const inputsSelectors = document.getElementsByClassName('inputs');
        for (let i = 0; i < inputsSelectors.length; i++) {
            inputsSelectors[i].value = "";
        };
        document.getElementById('output').style.color = 'coral';
        document.getElementById('output').innerHTML = "😈🤑🤣💸💰 You did it! The sum of all your credit card number digits is EQUAL TO OR GREATER THAN 16 and you met all of the other conditions, now your money is all mine...MUAHAHAHAHAHA..."
        return true;
    };
};