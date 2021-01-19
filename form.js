// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
var firebaseConfig = {
    apiKey: "AIzaSyCrTEaIYd-epx6q2NKr86vIwr3Dc6PjBtQ",
    authDomain: "techsupportlogin-9a4bf.firebaseapp.com",
    projectId: "techsupportlogin-9a4bf",
    storageBucket: "techsupportlogin-9a4bf.appspot.com",
    messagingSenderId: "565960468108",
    appId: "1:565960468108:web:6052440ede75ee52e87da9",
    measurementId: "G-ZX8J3YHC15",
    databaseURL: "https://techsupportlogin-9a4bf-default-rtdb.firebaseio.com/"

};
// Initialize Firebase
var defaultProject = firebase.initializeApp(firebaseConfig);
firebase.analytics();

const auth = firebase.auth();


function signUp() {

    var email = document.getElementById("email");
    var password = document.getElementById("password");

    const promise = auth.createUserWithEmailAndPassword(email.value, password.value);
    promise.catch(e => alert(e.message));

    alert("Signed Up");
}



function signIn() {

    var email = document.getElementById("email");
    var password = document.getElementById("password");

    const promise = auth.signInWithEmailAndPassword(email.value, password.value);
    promise.catch(e => alert(e.message));

    alert("Signed In");



}


function signOut() {

    auth.signOut();
    alert("Signed Out");

}



auth.onAuthStateChanged(function (user) {
    if (user) {
        var email = user.email;
        var userId = firebase.auth().currentUser.uid;
        console.log(email)
        firebase.database().ref('/users/' + userId).once('value').then((snapshot) => {
            var username = (snapshot.val() && snapshot.val().username) || 'Anonymous';
            var age = (snapshot.val() && snapshot.val().age) || '0';
            console.log('username', username)
            console.log('age', age)
        });

        firebase.database().ref('/result/' + userId).once('value').then((snapshot) => {
            var bm = (snapshot.val() && snapshot.val().bm) || '';
            var cn = (snapshot.val() && snapshot.val().cn) || '';
            console.log('bm', bm)
            console.log('cn', cn)
        });

        var updateResult = firebase.database().ref('/result/' + userId);
      
        var updates = {};
        updates['/result/' + userId + '/cn'  ] = 'a6';
        firebase.database().ref().update(updates);
        // alert("Active User " + email);
        //Take user to a different or home page

        //is signed in

    } else {

        alert("No Active User");
        //no user is signed in
    }



});
var database = firebase.database();