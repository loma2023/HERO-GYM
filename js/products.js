
//============== localstorageترحيل البيانات في الـ  =====================

let section = document.querySelector('.products');
let shopping_Btn = section.querySelectorAll('.fa-shopping-cart');
shopping_Btn.forEach(forbtn => { forbtn.addEventListener("click", add_Item); });

function add_Item(event) {
    let btn = event.target;
    let parentBtn = btn.parentElement.parentElement.parentElement;
    let img = parentBtn.querySelector('.main-img');
    let title = parentBtn.querySelector(".title");
    let price = parentBtn.querySelector('.priceItme');
    
    let id = parentBtn.querySelector('.main-img').id;

    let select = parentBtn.querySelector(".select");

    let parentSpan = document.querySelector(".last_b")
    let span_items = parentSpan.querySelector(".span_items");    
 
    let weight ='' ;
    if(select != null){
        if (select.classList.contains("hidden") == false) {
            weight =select.options[select.selectedIndex].text            
        }
    }
    let color = '';
    if (id !== null) {
        color = id ;
    }

    let newItem = {
        img: img.src,
        quantity: 1,
        title: title.innerText,
        price: price.innerText,
        color:color,
        weight:weight,
    }

    let reciptData;

    if (localStorage.itemCart == null) {
        reciptData = [];

    } else {

        reciptData = JSON.parse(localStorage.itemCart);
        for (i = 0; i < reciptData.length; i++) {
            let idItem = reciptData[i].title + reciptData[i].color + reciptData[i].weight
            let idItme2 = title.innerText + color + weight ; 
            if (idItem == idItme2) {
                alert('تم اضافة الصنف بالفعل')
                return
            }
        }

    }
    reciptData.push(newItem)
    localStorage.setItem('itemCart', JSON.stringify(reciptData));
    span_items.classList.add("span_itemss")
    span_items.innerText =  reciptData.length
}

//=================================================================

let heart_Btn = section.querySelectorAll('.fa-heart');
heart_Btn.forEach(forbtn => { forbtn.addEventListener("click", fov_Item); });

function fov_Item(event) {
    let btn = event.target;
    if (btn.classList.contains("del_heart") == false ) {
    let parentBtn = btn.parentElement.parentElement.parentElement;
    let img = parentBtn.querySelector('.main-img');
    let imghover = parentBtn.querySelector('.hover-img');
    let title = parentBtn.querySelector(".title");
    let price = parentBtn.querySelector('.priceItme');
    
    let id = parentBtn.querySelector('.main-img').id;

    let select = parentBtn.querySelector(".select");

    let parentSpan = document.querySelector(".last_A")
    let span_items = parentSpan.querySelector(".span_items");

    let weight ='' ;
    if(select != null){
        if (select.classList.contains("hidden") == false) {
            weight =select.options[select.selectedIndex].text            
        }
    }
    let color = '';
    if (id !== null) {
        color = id ;
    }
    let newItem = {
        img: img.src,
        imghover: imghover.src,
        title: title.innerText,
        price: price.innerText,
        color:color ,
        weight:weight,
    }

    let favtData;

    if (localStorage.itemFav == null) {
        favtData = [];

    } else {

        favtData = JSON.parse(localStorage.itemFav);

        for (i = 0; i < favtData.length; i++) {
            let idItem = favtData[i].title + favtData[i].color + favtData[i].weight
            let idItme2 = title.innerText + color + weight ; 
            if (idItem == idItme2) {
                alert('تم اضافة الصنف بالفعل')
                return
            }
        }
    }
    favtData.push(newItem)
    localStorage.setItem('itemFav', JSON.stringify(favtData))
    span_items.classList.add("span_itemss")
    span_items.innerText =  favtData.length

}}


//=============================================================================

let selects = document.querySelectorAll(".select");
selects.forEach(select => {select.addEventListener("change" , Change_Price)});

function Change_Price(event) {
    let select = event.target;
    let parant = select.parentElement.parentElement;
    let priceItme = parant.querySelector(".priceItme");
    let value = select.options[select.selectedIndex].getAttribute("value")
    if (value != null) {
        priceItme.innerText = value +' KWD' ; 
    }
}


let info_Btn = section.querySelectorAll('.fa-info');
info_Btn.forEach(forbtn => { forbtn.addEventListener("click", info ); });


function info(event) {
    let btn = event.target;
    let parant = btn.parentElement.parentElement.parentElement;
    let title = parant.querySelector(".title").innerText;
    let price = parant.querySelector(".priceItme").innerText;
    let select = parant.querySelector(".select");

    let arrayphoto = [];
    let arraycolor =[];
    let arrayvalue = [];
    let arrayvaluetxt = [];
    let titletxt = [];
    let pricetxt = [];

    localStorage.removeItem('title')
    localStorage.removeItem('price')
    localStorage.removeItem('photo')
    localStorage.removeItem('color')
    localStorage.removeItem('value')
    localStorage.removeItem('valuetxt')

    if (select != null) {

        titletxt.push(title)
        localStorage.setItem('title', JSON.stringify(titletxt))
        pricetxt.push(price)
        localStorage.setItem('price', JSON.stringify(pricetxt))

        let options = select.options ;
        for (let i = 0; i < options.length; i++) {
           let photo = options[i].getAttribute("photo")
           let color = options[i].getAttribute("color")
           let value = options[i].getAttribute("value")
           let valuetxt = options[i].text;

           if (photo != null) {
            arrayphoto.push(photo)
            localStorage.setItem('photo', JSON.stringify(arrayphoto))
           }
           if (color != null) {
            arraycolor.push(color)
            localStorage.setItem('color', JSON.stringify(arraycolor))
           }
           if (valuetxt != "") {
            arrayvaluetxt.push(valuetxt)
            localStorage.setItem('valuetxt', JSON.stringify(arrayvaluetxt))
           }
           if (value != null) {
            arrayvalue.push(value)
            localStorage.setItem('value', JSON.stringify(arrayvalue))
           }
        } 
    }
    location.href = "details.html"
}
