
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
let drinkDiv = document.getElementById("drinkDiv");
let count = 0;

let obj = [];
let cart = [];

db.collection("Loja")
  .doc("Bebidas")
  .collection("Drinks")
  .where("active", "==", true)
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



      drinkDiv.innerHTML += `

      <div class="col-3 wow fadeInUp" data-wow-delay="0.6s">
      <div class="topDetails">
          <a href="">
              <h3 class="titleAux titleIndent">${doc.data().Nome}</h3>
              <div class="geeks">

                  <img class="imgProps" src="${doc.data().imagemPerfil}" alt="">
              </div>
          </a>

      </div>
      <div class="details" style="height: 300px;">
          <div class="moreDetails">
              <h4 style="font-weight: bold;"> Descrição: </h4>
              <p>${doc.data().Descricao}</p>
          </div>
          <div style="display: flex;">
              <h3 style="margin-right: 10px;">R$</h3>
              <input id="priceBM" value="${doc.data().Price}" disabled class="spanValue"></input>
          </div>
      </div>

  </div>
            `;
    });
  })
  .catch(function (error) {
    console.log("Error getting documents: ", error);
  });


function redirect(param) {
  window.location.href = param
}