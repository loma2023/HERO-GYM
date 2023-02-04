
if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready()
}
function ready() {
    let section = document.querySelector('.products');    
    let btn_remove = section.querySelectorAll(".del_heart");
    btn_remove.forEach(allbtn => { allbtn.addEventListener("click", removeData) });
}
//==================================

let favtData;
if (localStorage.itemFav != null) {
    favtData = JSON.parse(localStorage.itemFav)
} else {
    favtData = [];
}
function showData() {
    let table ='' ;
    for (let i = 0; i < favtData.length; i++) {
        table += `
        <div id="${i}" class="box">
            <div class="image">
                <img id="${favtData[i].color}" src="${favtData[i].img}" class="main-img" alt="">
                <img src="${favtData[i].imghover}" class="hover-img" alt="">
                <div class="icons">
                    <a class="fas fa-shopping-cart"></a>
                    <a style="background: #f54040;" class="fas fa-heart del_heart"></a>
                </div>
            </div>
            <div class="content">
                <h3 class="title">${favtData[i].title}</h3>
                <div class="price"><a class="priceItme">${favtData[i].price} </a></div>
                <div class="stars">
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star-half-alt"></i>
                </div>
                <h2 class="weight">${favtData[i].weight}</h3>            
            </div>
        </div>`
    }
    document.querySelector('.box-container').innerHTML = table
}

showData()

//============== localstorageترحيل البيانات في الـ  =====================

function removeData(event) {
    let btn = event.target;
    if (btn.classList.contains("del_heart") == true ) {
    let parentbtn = btn.parentElement.parentElement.parentElement;
    let parentSpan = document.querySelector(".last_A")
    let span_items = parentSpan.querySelector(".span_items");

    let i = parentbtn.id
    favtData.splice(i, 1);
    localStorage.itemFav = JSON.stringify(favtData);

    if (favtData.length == 0) {span_items.innerText = "";span_items.classList.remove("span_itemss")}
    else{span_items.innerText = favtData.length }

    showData()
    ready()    
}}

