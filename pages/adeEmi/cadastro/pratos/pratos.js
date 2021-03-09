

firebaseConfig = {
    apiKey: "AIzaSyB8TIudzz7sjlXHLhvBMO_KXh4Uv5rSErk",
    authDomain: "adega89-93dee.firebaseapp.com",
    projectId: "adega89-93dee",
    storageBucket: "adega89-93dee.appspot.com",
    messagingSenderId: "31643059155",
    appId: "1:31643059155:web:3bc244a47c8f057130a526",
    measurementId: "G-S4KQ5E5NPK"
};
firebase.initializeApp(firebaseConfig);
var db = firebase.firestore();
var storage = firebase.storage();
let file2

window.onload = function () {

    var imagemPerfil = getForm('imagemPerfil')

    imagemPerfil.addEventListener('change', function (e) {

        file2 = e.target.files[0];

    });

}

function getForm(params) {
    return document.getElementById(params);
}


function insereImg() {
    if (file2 != undefined) {
        var nome = Math.random() * 100

        var storageRef = firebase.storage().ref('Prato ' + nome);

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
                    AddPrato(imgBanner)
                });

            }

        );
    } else {
        AddPrato('')
    }

}
function AddPrato(Arg) {

    let Nome = getForm('Nome').value
    let Descricao = getForm('Descricao').value
    let Price = getForm('Price').value
    var imagemPerfil = Arg


    if (Nome == "" || Price == "") {
        window.alert('Verifique todos os campos e tente novamente')
    } else {
        db.collection('Loja').doc('Pratos').collection('Pratos').add({

            Nome,
            Descricao,
            Price,
            imagemPerfil: imagemPerfil,
            active: true,
            out: false,
            docId: ''
        })
            .then(function (docRef) {
                window.alert('Prato cadastrado!')
                SetDocId(docRef.id)
                getForm('Nome').value = '';
                getForm('Descricao').value = '';
                getForm('Price').value = '';
            })
            .catch(function (error) {
                window.alert('Erro ao solicitar, consulte o suporte', error)
                console.error("Error adding document: ", error);
            });
    }

}


function SetDocId(docId) {
    var gameRef = db.collection("Loja").doc("Pratos").collection("Pratos").doc(docId)

    return gameRef.update({
        docId: docId
    })
        .then(function () {
            console.log("Document successfully updated!");
        })
        .catch(function (error) {
            console.error("Error updating document: ", error);
        });
}
