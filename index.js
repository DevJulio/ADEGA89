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
let ssts = document.getElementById("ssts")


let docRef = db.collection("Loja").doc("Delivery");
docRef.get().then((doc) => {

    console.log("Document data:", doc.data());

    if (doc.data().Delivery) {

        ssts.innerHTML = `
        <h1 style="font-size: xxx-large;">Online</h1>
        `
    } else {
        ssts.innerHTML = `
        <h1 style="font-size: xxx-large;">Off-line</h1>
        `
    }
}).catch((error) => {
    console.log("Error getting document:", error);
});

function redirect(param) {
    window.location.href = param
}
