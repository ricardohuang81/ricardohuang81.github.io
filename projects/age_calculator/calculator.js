var myBirthYear = prompt("Enter your birth year: ");

var futureYear = prompt("Enter a year in the future (after 2019): ");

var myAge;

function ageCalculator() {
    myAge = futureYear - myBirthYear;
    console.log("Depending on the month you were born in, if you were born in the year " + myBirthYear + ", you will be either " + parseInt(myAge - 1) + " or " + myAge + " years of age in the year " + futureYear + ".");
    document.getElementById('age').innerHTML = "Depending on the month you were born in, if you were born in the year " + myBirthYear + ", you will be either " + parseInt(myAge - 1) + " or " + myAge + " years of age in the year " + futureYear + ".";
}

ageCalculator();