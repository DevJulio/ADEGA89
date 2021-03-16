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

        console.log(user);
        console.log(Email);


        if (flag) {

            db.collection("Ademir").doc("Users").collection("Users").where("email", "==", user.email.toString().trim())
                .get()
                .then(function (querySnapshot) {
                    querySnapshot.forEach(function (doc) {
                        // console.log(doc.data());
                        // if (doc.data().Adm) {
                        window.localStorage.setItem("userAdm", doc.data().docId)
                        location.href = "../../adeEmi/adeEmi.html";
                        // }

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