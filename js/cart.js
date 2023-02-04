
if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready()
}

function ready() {
    let quantityInputs = document.querySelectorAll('.cart-quantity-input');
    quantityInputs.forEach(quantityInput => { quantityInput.addEventListener('change', quantityChanged) })

    let btn_remove = document.querySelectorAll(".fa-times");
    btn_remove.forEach(allbtn => { allbtn.addEventListener("click", removeData) });
}
let reciptData;
if (localStorage.itemCart != null){ reciptData = JSON.parse(localStorage.itemCart)} else {reciptData = [];}

let SentOrder;
if (localStorage.SentOrder != null){ SentOrder = JSON.parse(localStorage.SentOrder);} else {SentOrder = [];}



function quantityChanged(event) {
    var input = event.target
    if (isNaN(input.value) || input.value <= 1) { input.value = 1 }
    let parentbtn = input.parentElement.parentElement.parentElement;
    let i = parentbtn.id
    reciptData[i].quantity = input.value;
    localStorage.itemCart = JSON.stringify(reciptData);
    showData()
    updateCartTotal()
    ready()
}

function removeData(event) {
    let btn = event.target;
    let parentbtn = btn.parentElement;
    let parentSpan = document.querySelector(".last_b")
    let span_items = parentSpan.querySelector(".span_items");
    
    let i = parentbtn.id
    reciptData.splice(i, 1);
    localStorage.itemCart = JSON.stringify(reciptData);
    
    if (reciptData.length == 0) {span_items.classList.remove("span_itemss");span_items.innerText="";}
    else {span_items.innerText = reciptData.length}
    
    showData()
    ready()    
}

function updateCartTotal() {
    var cartItemContainer = document.getElementsByClassName('box-container')[0];
    var cartRows = cartItemContainer.getElementsByClassName('box');
    let Delivery = document.getElementsByClassName('Delivery')[0];
    let cart_total_price2 = document.getElementsByClassName('cart-total-price2')[0];

    var total = 0
    for (var i = 0; i < cartRows.length; i++) {
        var cartRow = cartRows[i]
        var priceElement = cartRow.getElementsByClassName('price')[0]
        var quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0]
        var price = parseFloat(priceElement.innerText.replace('KWD', ''))
        var quantity = quantityElement.value
        total = total + (price * quantity)
    }
    total = Math.round(total * 100) / 100
    document.getElementsByClassName('cart-total-price')[0].innerText = total + ' KWD'

    if (total == 0) {
        Delivery.innerText = '0 KWD'
        cart_total_price2.innerText = '0 KWD'

    } else if (total < 100) {
        Delivery.innerText = '2 KWD'
        cart_total_price2.innerText = total + 2 + ' KWD'
    } else {
        Delivery.innerText = 'free'
        cart_total_price2.innerText = total + 0 + ' KWD'

    }
}

function showData() {
    let btn_veiw = document.querySelector(".btn_veiw");
    let SentOrder = localStorage.getItem("SentOrder")
    let form = document.querySelector(".contact");
    let table = '';
    for (let i = 0; i < reciptData.length; i++) {
        table += `
            <div id="${i}" class="box">
                <i class="fas fa-times"></i>
                <img src="${reciptData[i].img}" alt="">
                
                <div class="content">
                    <h3 class="title">${reciptData[i].title}</h3>
                    <form action="">
                        <span>Quantity : </span>
                        <input class="cart-quantity-input" type="number" name="" value="${reciptData[i].quantity}">
                    </form>
                    <div class="weight">${reciptData[i].weight}  ${reciptData[i].color}</div>                    
                    <div class="price">${reciptData[i].price}</div>
                </div>
            </div>`
    }
    document.querySelector('.box-container').innerHTML = table
    updateCartTotal()

    if (reciptData.length > 0) {
        form.classList.remove("contact-MyForm");        
    }else{
        form.classList.add("contact-MyForm");
    }

    if (SentOrder == 1) {
        btn_veiw.classList.remove("contact-MyForm")
    }else{
        btn_veiw.classList.add("contact-MyForm")
    }

}
showData()

//======================== كود ارسال الطلب ================================

const myform = document.forms['MyForm']
myform.addEventListener('submit', e => {
    e.preventDefault()
    MyOrder()
    location.href = "order.html";
})

function MyOrder(event) {
    let name = document.querySelector(".name");
    let phone = document.querySelector(".phone");
    let address = document.querySelector(".address");
    let notes = document.querySelector(".notes");

    let subtotal = document.querySelector('.cart-total-price');
    let Delivery = document.querySelector('.Delivery');
    let total = document.querySelector(".cart-total-price2");

    let today = new Date();
    let time = today.getHours() + ":" + today.getMinutes() 
    let date = today.getFullYear()+"/"+today.getMonth()+1+"/" +today.getDate()+" ( "+ time + " )" 

    let newItem = {
        Date: date, 
        name: name.value,
        phone: phone.value,
        address: address.value,
        notes: notes.value,

        subtotal: subtotal.innerText,
        Delivery: Delivery.innerText,
        total: total.innerText,
    }
    let orderData;
    if (localStorage.itemCart != null) {
        orderData = JSON.parse(localStorage.itemCart)
        localStorage.setItem('myorder', JSON.stringify(orderData));
    }
    let information;
    if (localStorage.information != null) {
        information = JSON.parse(localStorage.information);
    }
    localStorage.setItem('information', JSON.stringify(newItem));

    for (let i = 0; i < reciptData.length; i++) {
        reciptData.splice(i, reciptData.length);
        localStorage.itemCart = JSON.stringify(reciptData);
    }
    localStorage.setItem('SentOrder', JSON.stringify(0))

}
