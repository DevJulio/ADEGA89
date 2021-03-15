
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
let divDrink = document.getElementById("divDrink");
let count = 0;

let obj = [];
let cart = [];

db.collection("Loja")
    .doc("Bebidas")
    .collection("Drinks")
    .get()
    .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
            console.log(doc.id, " => ", doc.data());
            obj.push({
                id: doc.data().docId,
                price: doc.data().Price,
                count: 1,
                name: doc.data().Nome,
            });


            if (doc.data().active) {
                divDrink.innerHTML += `
              
                <div class="col-3 wow fadeInUp" data-wow-delay="0.6s">
                <div class="topDetails">
                    <a href="">
                        <h3 class="titleAux titleIndent">${doc.data().Nome}</h3>
                        <div class="geeks">
    
                            <img class="imgProps"
                                src="${doc.data().imagemPerfil}"
                                alt="">
                        </div>
                    </a>
    
                </div>
                <div class="details">
                    <div class="moreDetails">
                        <h4 style="font-weight: bold;"> Descrição: </h4>
                        ${doc.data().Descricao}
    
                    </div>
                    <div style="display: flex;">
                        <h3 style="margin-right: 10px;">R$</h3>
                        <input id="price${doc.data().docId}" value='${doc.data().Price}' disabled class="spanValue"></input>
                    </div>
                    <div class="buttomCart">
                        <a href="#" class="button" id="${doc.id}" onclick="editar(id)"
                            style="text-align: center; width: 100%; color: #55212d; border-color: #55212d;">Editar</a>
                            
                    </div>
                    <div class="buttomCart">
                    <a href="#" class="button" id="${doc.id}" onclick="desativar(id)"
                        style="text-align: center; width: 100%; color: #55212d; border-color: #55212d;">Desativar</a>
                        
                </div>
                </div>
    
            </div>          
                `;
            } else {
                divDrink.innerHTML += `
              
                <div class="col-3 wow fadeInUp" data-wow-delay="0.6s">
                <div class="topDetails">
                    <a href="">
                        <h3 class="titleAux titleIndent">${doc.data().Nome}</h3>
                        <div class="geeks">
    
                            <img class="imgProps"
                                src="${doc.data().imagemPerfil}"
                                alt="">
                        </div>
                    </a>
    
                </div>
                <div class="details">
                    <div class="moreDetails">
                    <h4 style="font-weight: bold;"> Descrição: </h4>
                    ${doc.data().Descricao}
    
                    </div>
                    <div style="display: flex;">
                        <h3 style="margin-right: 10px;">R$</h3>
                        <input id="price${doc.data().docId}" value='${doc.data().Price}' disabled class="spanValue"></input>
                    </div>
                    <div class="buttomCart">
                        <a href="#" class="button" id="${doc.id}" onclick="editar(id)"
                            style="text-align: center; width: 100%; color: #55212d; border-color: #55212d;">Editar</a>
                            
                    </div>
                    <div class="buttomCart">
                    <a href="#" class="button" id="${doc.id}" onclick="Ativar(id)"
                        style="text-align: center; width: 100%; color: #55212d; border-color: #55212d;">Ativar</a>
                        
                </div>
                </div>
    
            </div>          
                `;
            }

        });
    })
    .catch(function (error) {
        console.log("Error getting documents: ", error);
    });

function editar(argument) {
    localStorage.setItem("drinkId", argument);
    window.location.href = "./drinkEdit.html"
}


function desativar(argument) {

    console.log(argument);

    var atualizacao = db.collection("Loja").doc("Bebidas").collection("Drinks").doc(argument)
    return atualizacao.update({
        active: false
    })
        .then(function () {
            window.alert("Bebida Desativada com suscesso!")
            location.reload();
        })
        .catch(function (error) {
            console.error("Error updating document: ", error);
            window.alert("Errro ao atualizar!");
        });
}
function Ativar(argument) {

    console.log(argument);

    var atualizacao = db.collection("Loja").doc("Bebidas").collection("Drinks").doc(argument)
    return atualizacao.update({
        active: true
    })
        .then(function () {
            window.alert("Bebida ativada com suscesso!")
            location.reload();
        })
        .catch(function (error) {
            console.error("Error updating document: ", error);
            window.alert("Errro ao atualizar!");
        });
}

function redirect(param) {
    window.location.href = param
}