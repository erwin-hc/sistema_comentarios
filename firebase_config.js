var firebaseConfig = {
    apiKey: "AIzaSyAN7lhI0o34cNGha7ne50I5q9Tx3EjFABI",
    authDomain: "comments-ddee5.firebaseapp.com",  
    databaseURL: "https://comments-ddee5-default-rtdb.firebaseio.com",  
    projectId: "comments-ddee5",  
    storageBucket: "comments-ddee5.appspot.com",  
    messagingSenderId: "282421967272",  
    appId: "1:282421967272:web:86f0304456d45a07f9059d"  
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();