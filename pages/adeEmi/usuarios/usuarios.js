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
let salesArr = []
let users = document.getElementById("users");
let cartAux = []
db.collection("Usuarios")
    .get()
    .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
            console.log(doc.id, " => ", doc.data());

            if (doc.data().active) {
                users.innerHTML += `
                <div class="itemDetail">
                 <span class="itemDetailLbl">Usuário: </span>
                 <span class="itemDetailLblSecondary">${doc.data().Nome}</span>
                 <span class="itemDetailLbl">Endereço</span>
                 <span class="itemDetailLblSecondary">${doc.data().Endereco}</span>
                 <span class="itemDetailLbl">Número de contato</span>
                 <span class="itemDetailLblSecondary">${doc.data().Telefone}</span>
                    <div id="btn" style="text-align-last: center;">
    
                      <a href="https://api.whatsapp.com/send?phone=55${doc.data().Telefone}&text=Olá%20somos%20a%20Adega%2089!" class="button">Entrar em contato</a>
                      <a href="#" id="${doc.id}" onClick="desativar(id)" class="button">Desativar</a>
                    </div>
                </div>
                `;
            } else {
                users.innerHTML += `
                <div class="itemDetail">
                 <span class="itemDetailLbl">Usuário: </span>
                 <span class="itemDetailLblSecondary">${doc.data().Nome}</span>
                 <span class="itemDetailLbl">Endereço</span>
                 <span class="itemDetailLblSecondary">${doc.data().Endereco}</span>
                 <span class="itemDetailLbl">Número de contato</span>
                 <span class="itemDetailLblSecondary">${doc.data().Telefone}</span>
                    <div id="btn" style="text-align-last: center;">
    
                      <a href="https://api.whatsapp.com/send?phone=55${doc.data().Telefone}&text=Olá%20somos%20a%20Adega%2089!" class="button">Entrar em contato</a>
                      <a href="#" id="${doc.id}" onClick="Ativar(id)" class="button">Ativar</a>
                    </div>
                </div>
                `;
            }

        });
    })
    .catch(function (error) {
        console.log("Error getting documents: ", error);
    });

function desativar(argument) {

    console.log(argument);

    var atualizacao = db.collection("Usuarios").doc(argument)
    return atualizacao.update({
        active: false
    })
        .then(function () {
            window.alert("Usuário Desativado com suscesso!")
            location.reload();
        })
        .catch(function (error) {
            console.error("Error updating document: ", error);
            window.alert("Errro ao atualizar!");
        });
}
function Ativar(argument) {

    console.log(argument);

    var atualizacao = db.collection("Usuarios").doc(argument)
    return atualizacao.update({
        active: true
    })
        .then(function () {
            window.alert("Usuário ativado com suscesso!")
            location.reload();
        })
        .catch(function (error) {
            console.error("Error updating document: ", error);
            window.alert("Errro ao atualizar!");
        });
}