function information(event) {
    let DateOrder = document.querySelector(".DateOrder");
    let NameCustomer = document.querySelector(".NameCustomer");
    let PhoneCustomer = document.querySelector(".PhoneCustomer");
    let AddressCustomer = document.querySelector(".AddressCustomer");
    let NotesCustomer = document.querySelector(".NotesCustomer");

    let subtotal_order = document.querySelector(".subtotal_order");
    let Delivery_order = document.querySelector(".Delivery_order");
    let total_order = document.querySelector(".total_order");

    let information;
    if (localStorage.information != null) {
        information = JSON.parse(localStorage.information);

        DateOrder.innerText = information.Date;
        NameCustomer.innerText = information.name
        PhoneCustomer.innerText = information.phone
        AddressCustomer.innerText = information.address
        NotesCustomer.innerText = information.notes

        subtotal_order.innerText = information.subtotal
        Delivery_order.innerText = information.Delivery
        total_order.innerText = information.total
    }

    let orderData;
    if (localStorage.myorder != null) {
        orderData = JSON.parse(localStorage.myorder)
    } else {
        orderData = [];
        location.href = "cart.html"
    }

    let table = "";
    for (let i = 0; i < orderData.length; i++) {
        table += `
               <tr>
               <td>${orderData[i].title}</td>
               <td>${orderData[i].weight} ${orderData[i].color}</td>
               <td>${orderData[i].price}</td>
               <td>${orderData[i].quantity}</td>
               </tr>`
    }
    document.querySelector('.table-body').innerHTML = table
}

information()



var script_url = "https://script.google.com/macros/s/AKfycbwM2Wj1suXYuw0mz9u_bn20jRWqA-X8n0FkHaWf5foknx4IgiyaF2_ZHKGxbVmvfzAMqw/exec";

function insert_value() {

    let information;
    if (localStorage.information != null) {
        information = JSON.parse(localStorage.information);
    }
    var id1 = information.Date + information.name + information.phone + information.address;
    var date = information.Date;
    var name = information.name;
    var phone = information.phone;
    var address = information.address;
    var note = information.notes;
    var total = information.total;

    var url = script_url + "?callback=ctrlq&id=" + id1 + "&name=" + name + "&phone=" + phone
        + "&date=" + date + "&address=" + address + "&note=" + note + "&total=" + total + "&action=insert" ;

    let orderData;
    if (localStorage.myorder != null) {
        orderData = JSON.parse(localStorage.myorder)
    }
    for (let i = 0; i < orderData.length; i++) {
            let items = "item" + [i + 1]
            let item = orderData[i].title +" - "+ orderData[i].weight+" - "+ orderData[i].color +" - "+ orderData[i].quantity
            url += "&"+items+"=" + item 
    }
    var request = jQuery.ajax({
        crossDomain: true,
        url: url,
        method: "GET",
        dataType: "jsonp"
    });
}



// function sendEmail() {
//     let txt = "لعرض جميع الطلبات اضغط علي هذه الرابط"
//     let URL = "https://docs.google.com/spreadsheets/d/1AqU05z7yEXoNsZnFt4NCaUKA4bz_lWWf7-ZTls7pgkw/edit?usp=sharing";


//     let name = document.querySelector(".name1");
//     let phone = document.querySelector(".phone1");
//     let address = document.querySelector(".address1");
//     let notes = document.querySelector(".notes1");

//     let order = document.querySelector(".text_order");
//     let total = document.querySelector(".total");

//     let body = "Name : " + name.value + "<br><br> Phone : " + phone.value + "<br><br> Address : " + address.value
//         + "<br><br> Notes : " + notes.value + "<br><br> Order : " + order.value + "<br><br> Total : " + total.value;

//     Email.send({
//         SecureToken: "585b81bb-37a9-4a98-8c00-9f4232394efc",
//         To: 'loma8064@gmail.com',
//         From: "loma8064@gmail.com",
//         Subject: "New Order",
//         Body: body + "<br><br>" + txt + "<br>" + URL,
//     })
// }




