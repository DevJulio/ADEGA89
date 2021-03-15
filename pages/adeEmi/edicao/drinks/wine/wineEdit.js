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
  .collection("Vinhos")
  .where("docId", "==", drinkId.trim())
  .get()
  .then(function (querySnapshot) {
    querySnapshot.forEach(function (doc) {
      console.log(doc.id, " => ", doc.data());
      localStorage.setItem("imgUrl", doc.data().imagemPerfil);
      localStorage.setItem("typeOf", "Vinhos");
      formData.innerHTML = `


        <main id="content">
        <section id="menu" class="secondary-color text-center scrollto clearfix ">
            <div class="row clearfix" style="margin-top: 120px;">
    
                <div class="section-heading">
                    <h2 class="section-title titleAux">Informe os dados para o atualizar o vinho!</h2>
                </div>
                <div class="form">
                    <div class="column">
    
                        <label for="inputEmail4" class="lbl">Nome</label>
                        <input type="text" id="Nome" value="${
                          doc.data().Nome
                        }"  class="formItem" placeholder="Nome" aria-label="Nome">
                    </div>
                    <div class="column">
                        <label for="inputEmail4" class="lbl">Uva</label>
                        <select class="formItemBigger" id="Uva" form="carform">
                            <option  ${
                              doc.data().Uva == "Alicante Bouschet"
                                ? "selected = selected"
                                : ""
                            } class="opt" value="Alicante Bouschet">Alicante Bouschet</option>
                            <option  ${
                              doc.data().Uva == "Ancellota"
                                ? "selected = selected"
                                : ""
                            } class="opt" value="Ancellota">Ancellota</option>
                            <option  ${
                              doc.data().Uva == "Barbera"
                                ? "selected = selected"
                                : ""
                            } class="opt" value="Barbera">Barbera</option>
                            <option  ${
                              doc.data().Uva == "Cabernet Franc"
                                ? "selected = selected"
                                : ""
                            } class="opt" value="Cabernet Franc">Cabernet Franc</option>
                            <option  ${
                              doc.data().Uva == "Cabernet Sauvignon"
                                ? "selected = selected"
                                : ""
                            } class="opt" value="Cabernet Sauvignon">Cabernet Sauvignon</option>
                            <option  ${
                              doc.data().Uva == "Carménère"
                                ? "selected = selected"
                                : ""
                            } class="opt" value="Carménère">Carménère</option>
                            <option  ${
                              doc.data().Uva == "Gamay"
                                ? "selected = selected"
                                : ""
                            } class="opt" value="Gamay">Gamay</option>
                            <option  ${
                              doc.data().Uva == "Malbec"
                                ? "selected = selected"
                                : ""
                            } class="opt" value="Malbec">Malbec</option>
                            <option  ${
                              doc.data().Uva == "Nebbiolo"
                                ? "selected = selected"
                                : ""
                            } class="opt" value="Nebbiolo">Nebbiolo</option>
                            <option  ${
                              doc.data().Uva == "Petit Verdot"
                                ? "selected = selected"
                                : ""
                            } class="opt" value="Petit Verdot">Petit Verdot</option>
                            <option  ${
                              doc.data().Uva == "Pinotage"
                                ? "selected = selected"
                                : ""
                            } class="opt" value="Pinotage">Pinotage</option>
                            <option  ${
                              doc.data().Uva == "Pinot Noir"
                                ? "selected = selected"
                                : ""
                            } class="opt" value="Pinot Noir">Pinot Noir</option>
                            <option  ${
                              doc.data().Uva == "Sangiovese"
                                ? "selected = selected"
                                : ""
                            } class="opt" value="Sangiovese">Sangiovese</option>
                            <option  ${
                              doc.data().Uva == "Syrah"
                                ? "selected = selected"
                                : ""
                            } class="opt" value="Syrah">Syrah</option>
                            <option  ${
                              doc.data().Uva == "Tannat"
                                ? "selected = selected"
                                : ""
                            } class="opt" value="Tannat">Tannat</option>
                            <option  ${
                              doc.data().Uva == "Tempranillo"
                                ? "selected = selected"
                                : ""
                            } class="opt" value="Tempranillo">Tempranillo</option>
                            <option  ${
                              doc.data().Uva == "Touriga Nacional"
                                ? "selected = selected"
                                : ""
                            } class="opt" value="Touriga Nacional">Touriga Nacional</option>
                        </select>
                    </div>
    
                </div>
                <div class="form">
    
                    <div class="column">
                        <label for="inputEmail4" class="lbl">Tipo</label>
                        <select class="formItemBigger" id="Tipo" form="carform">
                            <option class="opt" value="Pilsen">Pilsen</option>
                            <option class="opt" value="Weiss">Weiss</option>
                            <option class="opt" value="Witbier">Witbier</option>
                            <option class="opt" value="IPA">India Pale Ale (IPA)</option>
                            <option class="opt" value="Belgian Pale Ale">Belgian Pale Ale</option>
                            <option class="opt" value="Porter">Porter</option>
                            <option class="opt" value="Stout">Stout</option>
                            <option class="opt" value="Bock">Bock</option>
                            <option class="opt" value="English IPA">English IPA</option>
                            <option class="opt" value="American IPA">American IPA</option>
                            <option class="opt" value="Saison">Saison</option>
                            <option class="opt" value="Belgian Tripel">Belgian Tripel</option>
    
                        </select>
    
                    </div>
    
                    <div class="column">
                        <label for="exampleFormControlTextarea1" class="lbl">Descrição</label>
                        <textarea class="formItem" id="Descricao" rows="3"> ${
                          doc.data().Descricao
                        } </textarea>
                    </div>
    
                </div>
                <div class="form">
                    <div class="column">
                        <label for="inputEmail4" class="lbl">Valor</label>
                        <input type="number" class="formItem"  value="${
                          doc.data().Price
                        }" id="Price" placeholder="Ex: 10.00"
                            aria-label="Ex: 10.00">
    
                    </div>
                    <div class="column">
                        <label for="inputEmail4" class="lbl">País de origem:</label>
                        <input type="text" class="formItem" id="Pais"  value="${
                          doc.data().Pais
                        }" placeholder="Ex: bélgica"
                            aria-label="Ex: bélgica">
                    </div>
                </div>
                <div class="form">
                    <div class="column">
                        <label for="exampleFormControlTextarea1" class="lbl">Harmonização</label>
                        <textarea class="formItem" id="Harmonizacao" rows="3">${
                          doc.data().Harmonizacao
                        }</textarea>
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
  let Uva = getForm("Uva").value;
  let Tipo = getForm("Tipo").value;
  let Descricao = getForm("Descricao").value;
  let Price = getForm("Price").value;
  let Pais = getForm("Pais").value;
  let Harmonizacao = getForm("Harmonizacao").value;

  if (Nome == "" || Tipo == "" || Pais == "" || Price == "") {
    window.alert("Verifique todos os campos e tente novamente");
  } else {
    let Att = db
      .collection("Loja")
      .doc("Bebidas")
      .collection("Vinhos")
      .doc(drinkId.toString().trim());

    return Att.update({
      Nome: Nome,
      Uva: Uva,
      Tipo: Tipo,
      Descricao: Descricao,
      Price: Price,
      Pais: Pais,
      Harmonizacao: Harmonizacao,
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
