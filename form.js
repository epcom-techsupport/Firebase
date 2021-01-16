// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
var firebaseConfig = {
    apiKey: "AIzaSyCRgnYQsglQtJLt5xBry2NYqFF-yBFzfq0",
    authDomain: "epcomlogin.firebaseapp.com",
    projectId: "epcomlogin",
    storageBucket: "epcomlogin.appspot.com",
    messagingSenderId: "1024559495424",
    appId: "1:1024559495424:web:a4c3e3ded58178fcf35be5",
    measurementId: "G-W4BDYKZ4EG",
    databaseURL: "https://epcomlogin-default-rtdb.firebaseio.com/"
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




}


function signOut() {

    auth.signOut();
    alert("Signed Out");

}



auth.onAuthStateChanged(function (user) {
    if (user) {
        var email = user.email;
        var userId = firebase.auth().currentUser.uid;

        firebase.database().ref('/users/' + userId).once('value').then((snapshot) => {
            var username = (snapshot.val() && snapshot.val().username) || 'Anonymous';
            console.log(username)
        });
        // alert("Active User " + email);
        //Take user to a different or home page

        //is signed in

    } else {

        alert("No Active User");
        //no user is signed in
    }



});
var database = firebase.database();


