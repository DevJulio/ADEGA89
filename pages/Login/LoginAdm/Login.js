firebaseConfig = {
    apiKey: "AIzaSyAW6PPc6o7-b_jFLh_1LGi44u9NyNMDF7w",
    authDomain: "vsgamehall.firebaseapp.com",
    databaseURL: "https://vsgamehall.firebaseio.com",
    projectId: "vsgamehall",
    storageBucket: "vsgamehall.appspot.com",
    messagingSenderId: "556156378986",
    appId: "1:556156378986:web:8642bf6a4382c85c910f13",
    measurementId: "G-H9MPWK05D1"
};
firebase.initializeApp(firebaseConfig);
var db = firebase.firestore();


firebase.auth().signOut().then(function () {
    console.log("Deslogado")
    window.localStorage.clear();
}).catch(function (error) {
    // An error happened.
});


firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        // User is signed in.

        var user = firebase.auth().currentUser;
        //   window.alert(user.uid)
        // window.localStorage.setItem("User", user)
        // location.href = "../../../index.html";

    } else {
        // No user is signed in.

    }
});

function getForm(params) {
    return document.getElementById(params);
}


function logout() {
    firebase.auth().signOut().then(function () {
        // Sign-out successful.
    }).catch(function (error) {
        // An error happened.
    });
}

var flag = true
function Logar() {
    var Email = getForm('Email').value
    var Senha = getForm('Senha').value

    firebase.auth().signInWithEmailAndPassword(Email, Senha).catch(function (error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        window.alert(errorMessage)
        console.log();
        flag = false

    }).then(function () {
        var user = firebase.auth().currentUser;
        if (flag) {

            db.collection("Usuarios").where("Email", "==", user.email.toString().trim())
                .get()
                .then(function (querySnapshot) {
                    querySnapshot.forEach(function (doc) {
                        console.log(doc.data());
                        if (doc.data().Adm) {
                            window.localStorage.setItem("UidUsuarioLogado", doc.data().idUsuario)
                            location.href = "../../Adm/PainelAdm/PainelAdm.html";
                        }

                    });
                })
                .catch(function (error) {
                    console.log("Error getting documents: ", error);
                });
        } else {
            window.alert("Verifique e tente novamente")
            flag = true
        }

    })
}