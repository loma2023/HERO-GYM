if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready()
}

function ready() {

let reciptData;
if (localStorage.itemCart != null) {
    reciptData = JSON.parse(localStorage.itemCart)
} else {
    reciptData = [];
}
let favtData;
if (localStorage.itemFav != null) {
    favtData = JSON.parse(localStorage.itemFav)
} else {
    favtData = [];
}

let span2 = "";
let receipt = ""

let span1 = "";
let favorate = ""

if (reciptData.length > 0) {
     span2 = "span_itemss";
     receipt = reciptData.length; 
}

if (favtData.length > 0) {
     span1 = "span_itemss";
     favorate = favtData.length; 
}


document.querySelector('.header').innerHTML = `
<a href="index.html" class="logo"> <i class="fas fa-store"></i> HERO GYM</a>
<div class="icons">
<a href="index.html" class="fas fa-home"></a>
<a href="products.html" class="fas fa-store"></a>        
<a href="favorite.html" class="fas fa-heart last_A">    <span class="span_items ${span1}">${favorate}</span></a>  
<a href="cart.html" class="fas fa-shopping-cart last_b"><span class="span_items ${span2}">${receipt}</span></a>
</div>
`


document.querySelector('.quick-links').innerHTML =`
<a href="index.html" class="logo"> <i class="fas fa-store"></i>HERO GYM</a>
<div class="links">
    <a href="index.html"> الصفحة الرئيسية </a>
    <a href="products.html"> المنتجات </a>
    <a href="favorite.html"> المفضلة </a>
    <a href="cart.html"> سلة التسوق </a>
    <a href="contact.html"> اتصل بنا </a>
    </div>

<div class="share">
    <a href="#" class="fab fa-facebook-f"></a>
    <a href="#" class="fab fa-twitter"></a>
    <a href="#" class="fab fa-instagram"></a>
    <a href="#" class="fab fa-linkedin"></a>
</div>
` 
document.querySelector('.credit').innerHTML  =`
<p> created by <a href="https://www.facebook.com/faceloma" >Eslam Loma</a> | all rights reserved! </p>
<img src="images/card_img.png" alt="">
`

}


ready()