const shoppingCart = {};

function constructShoppingCart() {
    
    const item1 = document.getElementsByClassName('item')[0].innerHTML;
    const price1 = parseFloat(document.getElementsByClassName('price')[0].innerHTML);
    
    const item2 = document.getElementsByClassName('item')[1].innerHTML;
    const price2 = parseFloat(document.getElementsByClassName('price')[1].innerHTML);
    
    const item3 = document.getElementsByClassName('item')[2].innerHTML;
    const price3 = parseFloat(document.getElementsByClassName('price')[2].innerHTML);
    
    const item4 = document.getElementsByClassName('item')[3].innerHTML;
    const price4 = parseFloat(document.getElementsByClassName('price')[3].innerHTML);
    
    const item5 = document.getElementsByClassName('item')[4].innerHTML;
    const price5 = parseFloat(document.getElementsByClassName('price')[4].innerHTML);
    
    const item6 = document.getElementsByClassName('item')[5].innerHTML;
    const price6 = parseFloat(document.getElementsByClassName('price')[5].innerHTML);
    
    shoppingCart[item1] = price1;
    shoppingCart[item2] = price2;
    shoppingCart[item3] = price3;
    shoppingCart[item4] = price4;
    shoppingCart[item5] = price5;
    shoppingCart[item6] = price6;

}

constructShoppingCart();

console.log("Your Shopping Cart:", shoppingCart);

function cashRegister(obj) {
    let result = 0;
    for (var item in obj) {
        result = result + obj[item];
    }
    document.getElementById('total').innerHTML = 'Your total amount is: $' + result;
} 

cashRegister(shoppingCart);