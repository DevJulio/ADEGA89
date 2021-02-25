firebaseConfig = {
    apiKey: "AIzaSyB8TIudzz7sjlXHLhvBMO_KXh4Uv5rSErk",
    authDomain: "adega89-93dee.firebaseapp.com",
    projectId: "adega89-93dee",
    storageBucket: "adega89-93dee.appspot.com",
    messagingSenderId: "31643059155",
    appId: "1:31643059155:web:3bc244a47c8f057130a526",
    measurementId: "G-S4KQ5E5NPK",
};
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const user = localStorage.getItem('user');
let pricing = document.getElementById('pricing');
let itens = document.getElementById('itens');
let obj = [];
let price = [];
let count = [];
let finalPrice = 0;
let addss = ''

db.collection("Usuarios").where('docId', '==', user)
    .get()
    .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
            console.log(doc.id, " => ", doc.data());
            localStorage.setItem("userName", doc.data().Nome)
            localStorage.setItem("userPhone", doc.data().Telefone)
            addss = doc.data().Endereco
        })
    }

    )
    .catch(function (error) {
        console.log("Error getting documents: ", error);
    });


db.collection("Usuarios")
    .doc(user)
    .collection("Carrinho").where("reference", "==", "")
    .get()
    .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
            console.log(doc.id, " => ", doc.data());
            obj.push(doc.data())
            price.push(doc.data().price)
            count.push(doc.data().count)
            itens.innerHTML += `
            <div class="itemDetail">
            <span class="itemDetailLbl">Produto:</span>
            <span class="itemDetailLblSecondary">${doc.data().name}</span>
            <span class="itemDetailLbl">Preço unitário:</span>
            <span class="itemDetailLblSecondary">${doc.data().price}</span>
            <span class="itemDetailLbl">Quantidade:</span>
            <span class="itemDetailLblSecondary">X${doc.data().count}</span>
            <div id="btn" style="text-align-last: center;">
                <a href="#" onClick="removeDrink('${doc.id}')" class="button">Remover
                    item(ns)</a>
            </div>
        </div>
        `
        })


        for (var i = 0; i < price.length; i++) {
            finalPrice = finalPrice + (Number(price[i]) * Number(count[i]))
        }
        console.log(finalPrice);
        localStorage.setItem("finalPrice", finalPrice)
        pricing.innerHTML = `
        <div class="col-3">
        <div class="pricing-block featured col-3 wow fadeInUp" data-wow-delay="0.6s"
            style="width: 100%;">
            <div class="pricing-block-content">
                <h3>Valor total</h3>
                <p class="pricing-sub">Valor dos itens somados</p>
                <div class="pricing">
                    <div class="price"><span>$</span>${finalPrice}</div>
                </div>
                <div id="address">
                    <h2 style="font-size: 30px;">Endereço p/ entrega</h2>
                    <div style="display: flex; flex-direction: column;">
                        <div class="addressItem">
                            <input type="radio" checked="true" id="main" name="ad"
                                value="main">
                            <label class="addressItemLbl" for="main">${addss}</label><br>
                        </div>
                        <div class="addressItem">
                            <input type="radio" id="secondary" name="ad" value="secondary">
                            <textarea id="addressTextValue" class="addressText">Outro, informe </textarea>
                        </div>

                    </div>
                </div>

                <a href="#" onClick="CheckData()" class="button">Escolher método de pagamento</a>
            </div>
        </div>
    </div>
        `
    }

    )
    .catch(function (error) {
        console.log("Error getting documents: ", error);
    });


function removeDrink(id) {
    let aux = id.toString().trim()
    db.collection("Usuarios")
        .doc(user)
        .collection("Carrinho").doc(aux).delete().then(function () {
            console.log("Document successfully deleted!");
            alert("Produto(s) removido(s)!")
            location.reload()

        }).catch(function (error) {
            console.error("Error removing document: ", error);
        });

}


function CheckData() {

    if (obj) {
        if (document.getElementById('main').checked) {
            localStorage.setItem("address", addss)
        } else if (document.getElementById('secondary').checked) {
            localStorage.setItem("address", document.getElementById('addressTextValue').value)
        }
        window.location.href = "payment.html"
    } else {
        alert('Verifique o endereço ou os produtos e tente novamente');
    }

}

