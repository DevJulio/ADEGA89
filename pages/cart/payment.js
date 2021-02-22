firebaseConfig = {
    apiKey: "AIzaSyB8TIudzz7sjlXHLhvBMO_KXh4Uv5rSErk",
    authDomain: "adega89-93dee.firebaseapp.com",
    projectId: "adega89-93dee",
    storageBucket: "adega89-93dee.appspot.com",
    messagingSenderId: "31643059155",
    appId: "1:31643059155:web:3bc244a47c8f057130a526",
    measurementId: "G-S4KQ5E5NPK"
};
firebase.initializeApp(firebaseConfig);
var db = firebase.firestore();

const finalPrice = localStorage.getItem('finalPrice');
const user = localStorage.getItem('user');
let value = document.getElementById('value');
let backMoney;

value.innerHTML = `<h2>R$: ${finalPrice}</h2>`


function Change() {
    backMoney = window.prompt("Deseja troco? se sim informe. Caso contrário, deixe vazio", "");
    alert("Método: Dinheiro, em breve entraremos em contato!");
    send("Dinheiro", backMoney)

}
function Card() {
    alert("Método: cartão, em breve entraremos em contato!");
    send("Cartão", false)
}


function send(method, moneyBack) {


    let userName = localStorage.getItem('userName');
    let userPhone = localStorage.getItem('userPhone');
    let address = localStorage.getItem('address');
    let finalPrice = localStorage.getItem('finalPrice');
    let userUid = localStorage.getItem('user');


    if (userName == "" || userPhone == "" || address == "" || finalPrice == "" || userUid == "") {
        window.alert('Verifique todos os dados e tente novamente')
    } else {

        db.collection("Ademir").doc("vendasAbertas").collection("Sales").add({
            userName: userName,
            userPhone: userPhone,
            address: address,
            finalPrice: finalPrice,
            userUid: userUid,
            method: method,
            active: true,
            moneyBack: moneyBack ? moneyBack : '',
            docId: ''
        })
            .then(function (docRef) {
                window.alert('Pedido realizado com sucesso!')
                console.log(docRef);
                SetDocId(docRef.id)
            })
            .catch(function (error) {
                window.alert('Erro ao solicitar, consulte o suporte', error)
                console.error("Error adding document: ", error);
            });


    }
}

function SetDocId(docId) {
    var gameRef = db.collection("Ademir").doc("vendasAbertas").collection("Sales").doc(docId)

    return gameRef.update({
        docId: docId
    })
        .then(function () {
            console.log("Document successfully updated!");
        })
        .catch(function (error) {
            console.error("Error updating document: ", error);
        });
}
