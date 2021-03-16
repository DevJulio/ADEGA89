
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
let deliveryDiv = document.getElementById("deliveryDiv");

let docRef = db.collection("Loja").doc("Delivery");
docRef.get().then((doc) => {

    console.log("Document data:", doc.data());

    if (doc.data().Delivery) {

        deliveryDiv.innerHTML = `
        <div class="col-2 wow fadeInUp" style="margin-top: -10px; cursor: pointer;"  data-wow-delay="0.6s"  onclick="desativar()">
        <h3 class="titleAux">O delivery está: </h3>
     
        <div style="margin-top: 10px;" class="icon"; cursor: pointer;" >
            <img src="../../images/icons/admIcons/online.png" alt="">
        </div>
            <h3 class="titleAux">Habilitado!</h3>
            <span>Clique para desabilitar</span>
      
        </div>
        `
    } else {
        deliveryDiv.innerHTML = `
        <div class="col-2 wow fadeInUp" style="margin-top: -10px; cursor: pointer;"  data-wow-delay="0.6s" onclick="Ativar()">

        <h3 class="titleAux">O delivery está: </h3>
        
        <div style="margin-top: 10px;" class="icon"; cursor: pointer;" >
            <img src="../../images/icons/admIcons/offline.png" alt="">
        </div>
            <h3 class="titleAux">Desabilitado!</h3>
            <span>Clique para habilitar</span>
     
        </div>
        `
    }
}).catch((error) => {
    console.log("Error getting document:", error);
});


function desativar() {
    var atualizacao = db.collection("Loja").doc("Delivery")
    return atualizacao.update({
        Delivery: false
    })
        .then(function () {
            window.alert("Delivery Desativado com suscesso!")
            location.reload();
        })
        .catch(function (error) {
            console.error("Error updating document: ", error);
            window.alert("Errro ao atualizar!");
        });
}
function Ativar() {


    var atualizacao = db.collection("Loja").doc("Delivery")
    return atualizacao.update({
        Delivery: true
    })
        .then(function () {
            window.alert("Delivery ativado com suscesso!")
            location.reload();
        })
        .catch(function (error) {
            console.error("Error updating document: ", error);
            window.alert("Errro ao atualizar!");
        });
}
