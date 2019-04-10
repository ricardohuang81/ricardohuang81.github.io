var buttonSelector = document.getElementById('black');
var gifSelector = document.getElementById('gif');
var bodySelector = document.getElementsByTagName('body')[0];
var fortuneSelector = document.getElementById('fortune');

var age, emoBreak, sex, therapy, epiphany, vice, divorceYears, partner, pets, petWeeks, ending;

function clicked () {
    buttonSelector.style.outline = "none";
    buttonSelector.style.background = "white";
    buttonSelector.style.color = "black";
    buttonSelector.style.boxShadow = "none";
    setTimeout(questFortune, 500);
}

function questFortune () {
    buttonSelector.style.display = "none";
    
    gifSelector.style.display = "inline-block";
    
    bodySelector.style.backgroundImage = "url('https://media.giphy.com/media/xT8qBfjJhOmNPTVWU0/giphy.gif')";
     
    fortuneSelector.style.display = "inline";
    
    age = prompt("How old are you? ");
    
    emoBreak = Math.floor(age/10);
    
    sex = prompt('"FEMALE" or "MALE"? ').toLowerCase();
    
    therapy = sex.length * 3;
    
    epiphany = sex.length * 2;
    
    vice = prompt('"MONEY" or "FAME"? ').toLowerCase();
    
    divorceYears = Math.floor(vice.length/2);
    
    partner = vice === 'money' ? `will leave you for someone else that has much more money than you in about ${divorceYears} years` : `will leave you for someone much more famous than you in approximately ${divorceYears} years`;
    
    pets = prompt('"CATS" or "DOGS"? ').toLowerCase();
    
    petWeeks = pets.length;
    
    ending = pets === 'dogs' ? `you shall adopt a wonderful canine from your local shelter in ${petWeeks} weeks that will care for you dearly and eveything will work out = )` : `you shall adopt a furry feline from your local shelter in ${petWeeks} weeks and live miserably (or happily) ever after with your eccentric partner in crime = )`;
    
    fortuneSelector.innerHTML = `This year you will only have ${emoBreak} emotional breakdowns, need to attend ${therapy} therapy sessions, and will encounter your first ever mid-life crisis. But, you will reach a life epiphany in exactly ${epiphany} days. In other news, your partner (or soon-to-be partner) ${partner}. The good (or not-so-good) news is ${ending}`;
}

buttonSelector.addEventListener('click', clicked);
