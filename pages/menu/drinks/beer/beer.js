// var obj = [
//     {
//         id: "BM",
//         price: "25.50",
//         count: 1
//     },
//     {
//         id: "CN",
//         price: "10.00",
//         count: 1
//     },
// ]
// var cart = []

// function add(param, id) {

//     let found = obj.find(element => element.id == id);
//     if (param) {
//         found.count++;
//         document.getElementById('qnt' + id).value = found.count;
//         document.getElementById('price' + id).value = (found.price * found.count).toFixed(2);
//     } else {
//         if (found.count > 1) {
//             found.count--;
//             document.getElementById('qnt' + id).value = found.count;
//             document.getElementById('price' + id).value = ((document.getElementById('price' + id).value) - Number(found.price)).toFixed(2);
//         }
//     }
// }

// function addCart(id) {
//     window.alert('adicionado ao carrinho!')
//     let found = obj.find(element => element.id == id);
//     cart.push(found)
//     var novaArr = cart.filter(function (este, i) {
//         return cart.indexOf(este) === i;
//     });
//     console.log(novaArr);

// }

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
let beer = document.getElementById("beer");
let count = 0;

let obj = [];
let cart = [];

db.collection("Loja")
  .doc("Bebidas")
  .collection("Cervejas")
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
      beer.innerHTML += `
            
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
                    <h4 style="font-weight: bold;"> País de origem: </h4>
                    ${doc.data().Pais}
                    <h4 style="font-weight: bold;"> Tipo: </h4>
                    ${doc.data().Tipo}
                    <h4 style="font-weight: bold;"> Coloração: </h4>
                    ${doc.data().Color}
                    <h4 style="font-weight: bold;"> Copo ideal: </h4>
                    ${doc.data().Cup}

                </div>
                <h4 style="font-weight: bold;"> Quantidade: </h4>
                <div style="flex-direction: row;">
                    <button onclick="add(true,'${doc.data().docId
        }')" class="buttomAdd">+</button>
                    <input id='${doc.data().docId
        }' value="1" disabled class="spanLbl"></input>
                    <button onclick="add(false,'${doc.data().docId
        }')" class="buttomAdd"
                        style="margin-left: -10px;">-</button>

                </div>
                <div style="display: flex;">
                    <h3 style="margin-right: 10px;">R$</h3>
                    <input id="price${doc.data().docId}" value='${doc.data().Price
        }' disabled class="spanValue"></input>
                </div>
                <div class="buttomCart">
                    <a href="#" class="button" id="${doc.id
        }" onclick="addCart(id)"
                        style="text-align: center; width: 100%; color: #55212d; border-color: #55212d;">Adicionar
                        ao
                        Carrinho</a>
                </div>
            </div>

        </div>          
            `;
    });
  })
  .catch(function (error) {
    console.log("Error getting documents: ", error);
  });

function add(param, id) {
  let found = obj.find((element) => element.id == id);
  if (param) {
    found.count++;
    document.getElementById(id).value = found.count;
    document.getElementById("price" + id).value = (
      found.price * found.count
    ).toFixed(2);
  } else {
    if (found.count > 1) {
      found.count--;
      document.getElementById(id).value = found.count;
      document.getElementById("price" + id).value = (
        document.getElementById("price" + id).value - Number(found.price)
      ).toFixed(2);
    }
  }
}

function addCart(id) {
  let found = obj.find((element) => element.id == id);

  if (user != null) {

    db.collection("Usuarios").doc(user).collection("Carrinho").add({
      id: found.id,
      count: found.count,
      name: found.name,
      price: found.price

    })
      .then(function (docRef) {
        window.alert("adicionado ao carrinho!");
      })
      .catch(function (error) {
        window.alert('Erro ao adicionar o jogo, consulte o suporte', error)

      });

  } else {
    window.alert("Para realizar essa operação você precisa estar logado!")
  }

}
