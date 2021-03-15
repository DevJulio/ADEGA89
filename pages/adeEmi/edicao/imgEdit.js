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

imgDiv.innerHTML = `
<div style="display: flex; flex-direction: column; place-items: center;">
<img class="imgProps" style="width: 15em; margin-top: 3em; margin-bottom: 3em;" src="${imgUrl}" alt="">
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

</div>
`;

if (typeOf == "Drinks") {
} else {
}
