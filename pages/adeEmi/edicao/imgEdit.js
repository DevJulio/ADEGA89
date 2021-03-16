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

let imgDiv = document.getElementById("imgDiv");

let imgUrl = localStorage.getItem("imgUrl");
let typeOf = localStorage.getItem("typeOf");
let drinkId = localStorage.getItem("drinkId");
let file2

function getForm(params) {
  return document.getElementById(params);
}


window.onload = function () {



  imgDiv.innerHTML = `

  <div style="display: flex; flex-direction: column; place-items: center;">
  <img class="imgProps" style="width: 15em; margin-top: 3em; margin-bottom: 3em;" src="${imgUrl}"
      alt="">
  <h3> Foto atual </h3>
  <div class="form">
      <div class="column">
          <label for="Foto do Game" class="lbl">Foto de exemplo</label>
          <div class="formItem">
              <input type="file" class="custom-file-input" id="imagemPerfil">
              <label class="custom-file-label" for="customFile"></label>
              </br></br>
          </div>
          </br>
      </div>
  </div>
  <button class="button" onclick="insereImg()" style="cursor: pointer;">Atualizar imagem</button>
</div>



  `;



  var imagemPerfil = getForm('imagemPerfil')

  imagemPerfil.addEventListener('change', function (e) {

    file2 = e.target.files[0];

  });

}


function insereImg() {
  if (file2 != undefined) {
    var nome = Math.random() * 100

    var storageRef = firebase.storage().ref('Cerveja ' + nome);

    var task = storageRef.put(file2);

    task.on('state_changed', function (snapshot) {

      var percetage = (snapshot.bytesTransferred /
        snapshot.totalBytes) * 100;
      console.log("upload is " + percetage + "%");

    },
      function error(err) {
        console.log("Erro no upload", err);
      },
      function complete() {
        console.log("Upload Completo");
        upload2Completed = true
        storageRef.getDownloadURL().then(function (url) {
          var imgBanner = url
          console.log(imgBanner)
          update(imgBanner)
        });

      }

    );
  } else {
    alert("Verifique a imagem carregada e tente novamente!")
  }

}


function update(docId) {

  let updateRef;

  if (typeOf == "Drinks") {
    updateRef = db.collection("Loja").doc("Bebidas").collection("Drinks").doc(drinkId)
  } else if (typeOf == "Cerveja") {
    updateRef = db.collection("Loja").doc("Bebidas").collection("Cervejas").doc(drinkId)
  } else if (typeOf == "Vinhos") {
    updateRef = db.collection("Loja").doc("Bebidas").collection("Vinhos").doc(drinkId)
  } else if (typeOf == "Food") {
    updateRef = db.collection("Loja").doc("Pratos").collection("Pratos").doc(drinkId)
  }

  return updateRef.update({
    imagemPerfil: docId
  })
    .then(function () {
      console.log("Document successfully updated!");
      alert("Imagem atualizada com sucesso!");
      window.location.href = "../edicao/edicao.html";
    })
    .catch(function (error) {
      console.error("Error updating document: ", error);
      alert("Erro ao atualizar, verifique o administrador!")

    });
}

