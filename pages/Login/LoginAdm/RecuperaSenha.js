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

function Envia() {
    var Email = document.getElementById('Email').value;
    var auth = firebase.auth();
    var emailAddress = Email;

    auth.sendPasswordResetEmail(emailAddress).then(function () {
        window.alert("Email enviado, verifique sua caixa de entrada")
    }).catch(function (error) {
        // An error happened.
        window.alert("Email não  enviado, verifique os dados e tente novamente. erro: ", error)
    });


}
