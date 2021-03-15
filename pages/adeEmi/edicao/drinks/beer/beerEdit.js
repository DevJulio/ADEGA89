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

db.collection("Loja")
  .doc("Bebidas")
  .collection("Cervejas")
  .where("docId", "==", drinkId.trim())
  .get()
  .then(function (querySnapshot) {
    querySnapshot.forEach(function (doc) {
      console.log(doc.id, " => ", doc.data());
      localStorage.setItem("imgUrl", doc.data().imagemPerfil);
      localStorage.setItem("typeOf", "Cerveja");
      formData.innerHTML = `
            <main id="content">
            <section id="menu" class="secondary-color text-center scrollto clearfix ">
                <div class="row clearfix" style="margin-top: 120px;">

                    <div class="section-heading">
                        <h2 class="section-title titleAux">Informe os dados para a edição da cerveja!</h2>
                    </div>
                    <div class="form">
                        <div class="column">

                            <label for="inputEmail4" class="lbl">Nome</label>
                            <input type="text" id="Nome" value="${
                              doc.data().Nome
                            }" class="formItem" placeholder="Nome" aria-label="Nome">
                        </div>
                        <div class="column">
                            <label for="inputEmail4" class="lbl">Coloração</label>
                            <select name="Color" id="Color" class="formItemBigger" form="carform">
                                <option  ${
                                  doc.data().Color == "Clara"
                                    ? "selected = selected"
                                    : ""
                                } class="opt" value="Clara">Clara (>20 de EBC)</option>
                                <option  ${
                                  doc.data().Color == "Escura"
                                    ? "selected = selected"
                                    : ""
                                } class="opt" value="Escura">Escura (>= 20 de EBC)</option>
                            </select>
                            <!-- <input type="select" placeholder="Last name" aria-label="Last name"> -->
                        </div>

                    </div>
                    <div class="form">
                        <div class="column">
                            <label for="inputEmail4" class="lbl">Tipo</label>
                            <select class="formItemBigger" id="Tipo" form="carform">
                                <option  ${
                                  doc.data().Tipo == "Pilsen"
                                    ? "selected = selected"
                                    : ""
                                }class="opt" value="Pilsen">Pilsen</option>
                                <option  ${
                                  doc.data().Tipo == "Weiss"
                                    ? "selected = selected"
                                    : ""
                                } class="opt" value="Weiss">Weiss</option>
                                <option  ${
                                  doc.data().Tipo == "Witbier"
                                    ? "selected = selected"
                                    : ""
                                } class="opt" value="Witbier">Witbier</option>
                                <option  ${
                                  doc.data().Tipo == "IPA"
                                    ? "selected = selected"
                                    : ""
                                } class="opt" value="IPA">India Pale Ale (IPA)</option>
                                <option  ${
                                  doc.data().Tipo == "Belgian Pale Ale"
                                    ? "selected = selected"
                                    : ""
                                } class="opt" value="Belgian Pale Ale">Belgian Pale Ale</option>
                                <option  ${
                                  doc.data().Tipo == "Porter"
                                    ? "selected = selected"
                                    : ""
                                } class="opt" value="Porter">Porter</option>
                                <option  ${
                                  doc.data().Tipo == "Stout"
                                    ? "selected = selected"
                                    : ""
                                } class="opt" value="Stout">Stout</option>
                                <option  ${
                                  doc.data().Tipo == "Bock"
                                    ? "selected = selected"
                                    : ""
                                } class="opt" value="Bock">Bock</option>
                                <option  ${
                                  doc.data().Tipo == "English IPA"
                                    ? "selected = selected"
                                    : ""
                                } class="opt" value="English IPA">English IPA</option>
                                <option  ${
                                  doc.data().Tipo == "American IPA"
                                    ? "selected = selected"
                                    : ""
                                } class="opt" value="American IPA">American IPA</option>
                                <option  ${
                                  doc.data().Tipo == "Saison"
                                    ? "selected = selected"
                                    : ""
                                } class="opt" value="Saison">Saison</option>
                                <option  ${
                                  doc.data().Tipo == "Belgian Tripel"
                                    ? "selected = selected"
                                    : ""
                                } class="opt" value="Belgian Tripel">Belgian Tripel</option>
                                <option  ${
                                  doc.data().Tipo == "Belgian White"
                                    ? "selected = selected"
                                    : ""
                                } class="opt" value="Belgian White">Belgian White</option>
                                <option  ${
                                  doc.data().Tipo == "Golden Lager"
                                    ? "selected = selected"
                                    : ""
                                } class="opt" value="Golden Lager">Golden Lager</option>
                                <option  ${
                                  doc.data().Tipo == "Blonde"
                                    ? "selected = selected"
                                    : ""
                                } class="opt" value="Blonde">Blonde</option>
                            </select>
                        </div>
                        <div class="column">
                            <label for="inputEmail4" class="lbl">Copo ideal:</label>
                            <input type="text" class="formItem" value="${
                              doc.data().Cup
                            }" id="Cup" placeholder="Ex: Pint" aria-label="Last name">
                        </div>

                    </div>
                    <div class="form">
                        <div class="column">
                            <label for="inputEmail4" class="lbl">Valor</label>
                            <input type="number" value="${
                              doc.data().Price
                            }" class="formItem" id="Price"
                                placeholder="Dezenas e decimal, separados por . (ponto)" aria-label="Ex: 10.00">

                        </div>
                        <div class="column">
                            <label for="inputEmail4" class="lbl">País de origem:</label>
                            <input type="text" class="formItem" id="Pais" value="${
                              doc.data().Pais
                            }" placeholder="Ex: bélgica"
                                aria-label="Ex: bélgica">
                        </div>
                    </div>


                    <button class="button" onclick="UpdateDrink()" style="cursor: pointer;">Atualizar</button>

                    
                    <div style="display: flex; flex-direction: column; place-items: center;">
                    <img class="imgProps" style="width: 15em; margin-top: 3em; margin-bottom: 3em;" src="${
                      doc.data().imagemPerfil
                    }" alt="">
                    <button class="button" onclick="editarImg()" style="cursor: pointer;">Atualizar imagem</button>

                    </div>

                </div>
            </section>
            <aside id="menu" class="row text-center scrollto clearfix" data-featherlight-gallery
                data-featherlight-filter="a">

            </aside>
        </main>            
            `;
    });
  })
  .catch(function (error) {
    console.log("Error getting documents: ", error);
  });

function editarImg() {
  window.location.href = "../../imgEdit.html";
}

function UpdateDrink() {
  let Nome = getForm("Nome").value;
  let Color = getForm("Color").value;
  let Tipo = getForm("Tipo").value;
  let Cup = getForm("Cup").value;
  let Price = getForm("Price").value;
  let Pais = getForm("Pais").value;

  if (
    Nome == "" ||
    Tipo == "" ||
    Pais == "" ||
    Price == "" ||
    Color == "" ||
    Cup == ""
  ) {
    window.alert("Verifique todos os campos e tente novamente");
  } else {
    let Att = db
      .collection("Loja")
      .doc("Bebidas")
      .collection("Cervejas")
      .doc(drinkId.toString().trim());

    return Att.update({
      Nome: Nome,
      Color: Color,
      Tipo: Tipo,
      Cup: Cup,
      Price: Price,
      Pais: Pais,
      imagemPerfil: imagemPerfil,
    })
      .then(function () {
        window.alert("Bebida atualizada com suscesso!");
        location.reload();
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
