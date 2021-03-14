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
let sales = document.getElementById("sales");
let cartAux = []
db.collection("Ademir")
    .doc("vendasAbertas")
    .collection("Sales")
    .where("active", "==", false)
    .get()
    .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
            // console.log(doc.id, " => ", doc.data());
            salesArr.push(doc.data());
        });
        for (let index = 0; index < salesArr.length; index++) {
            let CartArr = []

            db.collection("Usuarios")
                .doc(salesArr[index].userUid)
                .collection("Carrinho")
                .get()
                .then(function (querySnapshot) {
                    querySnapshot.forEach(function (doc) {
                        CartArr.push(doc.data())

                    });
                    cartAux.push(CartArr)
                })
                .catch(function (error) {
                    console.log("Error getting documents: ", error);
                });

        }
    })
    .catch(function (error) {
        console.log("Error getting documents: ", error);
    });




setTimeout(() => {
    let allOpenSalesId = []//Código das vendas
    let finalSalesOneByOne = cartAux[0];//Todos os produtos

    for (let index = 0; index < salesArr.length; index++) {
        allOpenSalesId.push(salesArr[index].docId)
    }

    // console.log(allOpenSalesId);
    // console.log(salesArr);

    let resultado = finalSalesOneByOne.reduce((result, data) => {
        const { reference, ...rest } = data;
        if (!result[reference]) result[reference] = [];
        result[reference].push({ ...rest })
        return result
    }, [])

    // console.log(resultado.jOFanKMu1jRlIKMe0ghQ)
    // console.log(resultado)


    Object.size = function (obj) {
        var size = 0,
            key;
        for (key in obj) {
            if (obj.hasOwnProperty(key)) size++;
        }
        return size;
    };
    let size = Object.size(resultado)

    for (let index = 0; index < size; index++) {

        let aux = resultado[salesArr[index].docId];

        let produtcName = []
        let produtcCount = []
        let List = []
        for (let b = 0; b < aux.length; b++) {
            List.push("\n" + aux[b].name + " : " + aux[b].count + "\n")
        }
        console.log(salesArr[index]);

        sales.innerHTML += `
        <div class="itemDetail">
        <span class="itemDetailLbl">Usuário: </span>
        <span class="itemDetailLblSecondary">${salesArr[index].userName}</span>
        <span class="itemDetailLbl">Valor da compra:</span>
        <span class="itemDetailLblSecondary">${salesArr[index].finalPrice}</span>
        <span class="itemDetailLbl">Método</span>
        <span class="itemDetailLblSecondary">${salesArr[index].method}</span>
        <span class="itemDetailLbl">Troco</span>
        <span class="itemDetailLblSecondary">${salesArr[index].moneyBack == "" ? "Sem troco" : salesArr[index].moneyBack}</span>
        <span class="itemDetailLbl">Endereço</span>
        <span class="itemDetailLblSecondary">${salesArr[index].address}</span>
        <span class="itemDetailLbl">Número de contato</span>
        <span class="itemDetailLblSecondary">${salesArr[index].userPhone}</span>
        <span class="itemDetailLbl">Item(ns)</span>
        <span class="itemDetailLblSecondary">${List}</span>
   
        </div>
    
        `;
    }


}, 2000);

