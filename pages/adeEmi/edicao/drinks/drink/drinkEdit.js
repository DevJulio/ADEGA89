
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
let formData = document.getElementById("formData");
let drinkId = localStorage.getItem("drinkId");

function getForm(params) {
    return document.getElementById(params);
}


db.collection("Loja").doc("Bebidas").collection("Drinks").where("docId", "==", drinkId.trim()).get().then(function (querySnapshot) {
    querySnapshot.forEach(function (doc) {
        console.log(doc.id, " => ", doc.data());
        localStorage.setItem("imgUrl", doc.data().imagemPerfil)
        localStorage.setItem("typeOf", "Drinks");
        formData.innerHTML = `



        <main id="content">
        <section id="menu" class="secondary-color text-center scrollto clearfix ">
            <div class="row clearfix" style="margin-top: 120px;">

                <div class="section-heading">
                    <h2 class="section-title titleAux">Informe os dados para a edição do drink</h2>
                </div>
                <div class="form">
                    <div class="column">

                        <label for="inputEmail4" class="lbl">Nome</label>
                        <input type="text" id="Nome" value="${doc.data().Nome}" class="formItem" placeholder="Nome" aria-label="Nome">
                    </div>

                    <div class="column">
                        <label for="inputEmail4" class="lbl">Valor</label>
                        <input type="number" class="formItem" value="${doc.data().Price}" id="Price" placeholder="Ex: 10.00"
                            aria-label="Ex: 10.00">

                    </div>

                </div>
                <div class="form">


                    <div class="column">
                        <label for="exampleFormControlTextarea1" class="lbl">Descrição</label>
                        <textarea class="formItem" id="Descricao" rows="3">${doc.data().Descricao}</textarea>
                    </div>

                </div>
    
                <button class="button" onclick="UpdateDrink()" style="cursor: pointer;">Atualizar</button>

                    
                <div style="display: flex; flex-direction: column; place-items: center;">
                <img class="imgProps" style="width: 15em; margin-top: 3em; margin-bottom: 3em;" src="${doc.data().imagemPerfil}" alt="">
                <button class="button" onclick="UpdateDrink()" style="cursor: pointer;">Atualizar imagem</button>

                </div>

            </div>
        </section>
        <aside id="menu" class="row text-center scrollto clearfix" data-featherlight-gallery
            data-featherlight-filter="a">

        </aside>
    </main>



            `
    });
})
    .catch(function (error) {
        console.log("Error getting documents: ", error);
    });


function UpdateDrink() {

    let Nome = getForm('Nome').value
    let Descricao = getForm('Descricao').value
    let Price = getForm('Price').value

    if (Nome == "" || Price == "") {
        window.alert('Verifique todos os campos e tente novamente')
    } else {
        let Att = db.collection("Loja")
            .doc("Bebidas")
            .collection("Drinks").doc(drinkId.toString().trim())

        return Att.update({
            Nome: Nome,
            Descricao: Descricao,
            Price: Price,
        })
            .then(function () {
                window.alert("Bebida atualizada com suscesso!")
                location.reload()

            })
            .catch(function (error) {
                console.error("Error updating document: ", error);
                window.alert("Errro ao atualizar!");
            });

    }
}
function Descartar() {
    location.reload();
}