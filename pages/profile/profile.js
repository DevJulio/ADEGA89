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
let formData = document.getElementById("formData");
let Endereco = ""
let Nome = ""
let Telefone = ""



function getForm(params) {
    return document.getElementById(params);
}


if (user) {
    db.collection("Usuarios")
        .where("docId", "==", user)
        .get()
        .then(function (querySnapshot) {
            querySnapshot.forEach(function (doc) {
                Endereco = doc.data().Endereco;
                Telefone = doc.data().Telefone;
                Nome = doc.data().Nome;

                console.log(doc.id, " => ", doc.data());

                formData.innerHTML = `

                <div class="row clearfix" style="margin-top: 120px;">
            
                <div class="section-heading">
                    <h2 class="section-title titleAux">Dados do cadastro</h2>
                </div>
                <div class="form">
                    <div class="column">
            
                        <label for="inputEmail4" class="lbl">Nome</label>
                        <input disabled type="text" id="Nome" class="formItem" placeholder="Nome e sobrenome" style="filter: opacity(0.5);"
                            aria-label="Nome" value="${Nome}">
                    </div>
                    <div class="column">
            
                        <label for="inputEmail4" class="lbl">Telefone com DDD</label>
                        <input disabled type="number" id="Telefone" class="formItem"  placeholder="(xx) 9 xxxxxxxx" aria-label="Telefone com ddd" value="${Telefone}" style="filter: opacity(0.5);"> 
                    </div>
            
                </div>
            
                <div class="form">
                    <div class="column">
            
                        <label for="inputEmail4" class="lbl">Endereço para entrega</label>
                        <input disabled type="text" id="Endereco" class="formItem" style="filter: opacity(0.5);"
                            placeholder="Ex: Av rio claro, qd 30 lt 22" aria-label="Nome" value="${Endereco}">
                    </div>
                </div>
                <button class="button" onclick="Update()" style="cursor: pointer;">Atualizar</button>
            
            </div>
            
                    `
            });
        })
        .catch(function (error) {
            console.log("Error getting documents: ", error);
        })





} else {
    formData.innerHTML = `
    <div style="display: flex; flex-direction: column; place-items: center; margin-top: 20em;">
    <button class="button" onclick="AddUser()" style="cursor: pointer;">Se você não tem um cadastro, clique para criar</button>
    <button class="button" onclick="login()" style="cursor: pointer;">Clique para acessar sua conta</button>    
    </div>
    `
}



function AddUser() {
    window.location.href = "../register/register.html";
}

function login() {
    window.location.href = "../Login/Login.html";
}

function Update() {
    formData.innerHTML = `

    <div class="row clearfix" style="margin-top: 120px;">

    <div class="section-heading">
        <h2 class="section-title titleAux">Dados do cadastro</h2>
    </div>
    <div class="form">
        <div class="column">

            <label for="inputEmail4" class="lbl">Nome</label>
            <input  type="text" id="Nome" class="formItem" placeholder="Nome e sobrenome"
                aria-label="Nome" value="${Nome}">
        </div>
        <div class="column">

            <label for="inputEmail4" class="lbl">Telefone com DDD</label>
            <input  type="number" id="Telefone" class="formItem"  placeholder="(xx) 9 xxxxxxxx" aria-label="Telefone com ddd" value="${Telefone}">
        </div>

    </div>

    <div class="form">
        <div class="column">

            <label for="inputEmail4" class="lbl">Endereço para entrega</label>
            <input  type="text" id="Endereco" class="formItem"
                placeholder="Ex: Av rio claro, qd 30 lt 22" aria-label="Nome" value="${Endereco}">
        </div>
    </div>
    <button class="button" onclick="Salvar()" style="cursor: pointer;">Salvar</button>
    <button class="button" onclick="Descartar()" style="cursor: pointer;">Descartar</button>

</div>

        `
}

function Salvar() {
    let Endereco = getForm('Endereco').value
    let Nome = getForm('Nome').value
    let Telefone = getForm('Telefone').value

    var Att = db.collection("Usuarios").doc(user);

    return Att.update({
        Endereco: Endereco,
        Nome: Nome,
        Telefone: Telefone,
    })
        .then(function () {
            window.alert("Perfil atualizado com suscesso!")
            location.reload()

        })
        .catch(function (error) {
            console.error("Error updating document: ", error);
            window.alert("Errro ao atualizar!");
        });


}
function Descartar() {
    location.reload();
}

