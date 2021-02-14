

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

function getForm(params) {
    return document.getElementById(params);
}



function AddUser() {
    let Nome = getForm('Nome').value
    let Telefone = getForm('Telefone').value
    let Email = getForm('Email').value
    let password = getForm('password').value
    let Endereco = getForm('Endereco').value



    if (Nome == "" || Telefone == "" || Email == "" || password == "" || Endereco == "") {
        window.alert('Verifique todos os campos e tente novamente')
    } else {

        firebase.auth().createUserWithEmailAndPassword(Email, password).catch(function (error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;

            // ...
            console.log(errorCode + "" + errorMessage);
        });

        firebase.auth().onAuthStateChanged(function (user) {
            if (user) {
                console.log(user);
                firebase.auth().signInWithEmailAndPassword(Email, password).catch(function (error) {
                    // Handle Errors here.
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    // ...
                }).then(function () {
                    // window.localStorage.setItem("User", user)
                    // location.href = "../../../index.html";
                })

            } else {

            }
        });


        db.collection('Usuarios').add({

            Nome: Nome,
            Telefone: Telefone,
            Email: Email,
            Endereco: Endereco,
            active: true,
            docId: ''
        })
            .then(function (docRef) {
                window.alert('Usuário cadastrado!')
                SetDocId(docRef.id)
                getForm('Nome').value = '';
                getForm('Telefone').value = '';
                getForm('Email').value = '';
                getForm('password').value = '';
                getForm('Endereco').value = '';

            })
            .catch(function (error) {
                window.alert('Erro ao cadastrar, consulte o suporte', error)
                console.error("Error adding document: ", error);
            });
    }

}


function SetDocId(docId) {
    var gameRef = db.collection("Usuarios").doc(docId)

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
