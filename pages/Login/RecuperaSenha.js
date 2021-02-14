// Initialize Firebase
var config = {
    apiKey: "AIzaSyDdshKPmkJgB2rnrlXE5ryEEB-VvG2F5_8",
    authDomain: "banco-virtual-de-talentos.firebaseapp.com",
    databaseURL: "https://banco-virtual-de-talentos.firebaseio.com",
    projectId: "banco-virtual-de-talentos",
    storageBucket: "banco-virtual-de-talentos.appspot.com",
    messagingSenderId: "463860022406"
};
firebase.initializeApp(config);


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
