const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyCVj7bifzfFIvDW1uBMFiWU2CnJEkHgS2Q",
  authDomain: "database-e7808.firebaseapp.com",
  projectId: "database-e7808",
  storageBucket: "database-e7808.appspot.com",
  messagingSenderId: "806749812012",
  appId: "1:806749812012:web:4438f4f7efe27b5d1ba889"
});
const db = firebaseApp.firestore();
const auth = firebaseApp.auth();
var database = firebase.database();
// var firebaseRef = firebase.database().ref('data')

let a = 600;
var options = {
  "key": "rzp_test_FjtqgTIsWBgXxV", // Enter the Key ID generated from the Dashboard
  "amount": a * 100, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
  "currency": "INR",
  "name": "Acme Corp", //your business name
  "description": "Test Transaction",
  "image": "https://example.com/your_logo",
  // "order_id": "rzp_test_FjtqgTIsWBgXxV", //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
  "callback_url": "index.html",
  "prefill": {
    "name": "Gaurav Kumar", //your customer's name
    "email": "gaurav.kumar@example.com",
    "contact": "9000090000"
  },
  "notes": {
    "address": "Razorpay Corporate Office"
  },
  "theme": {
    "color": "#3399cc"
  }
};
var rzp1 = new Razorpay(options);
// rzp1.open();

function signup() {

  const email = document.getElementById('reg_email').value;
  const password = document.getElementById('reg_pass').value;
  const username = document.getElementById('user').value
  console.log(email, password);
  firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(function () {
      //   e.preventDefault();

      // var user = firebase.auth().currentUser
      // var database_ref = database.ref() 
      var firebaseRef = firebase.database().ref('data')


      var user_data = {
        Username: username,
        Email: email
      }

      firebaseRef.push(user_data)
      // Signed in 
      alert("you signed up");
      // document.getElementById("reg_form").reset()
      // console.log(result);
      // ...
    })
    .catch((error) => {
      console.log(error.code);
      console.log(error.message);
      // ..
    });
}

// signin function


function signIn() {
  const username = document.getElementById('userlog').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('pass').value;

  firebase.auth().signInWithEmailAndPassword(email, password)
    .then((result) => {
      sessionStorage.setItem("user", username)
      rzp1.open()
      // e.preventDefault();
      // window.location.href="dashboard.html"
      // document.write("you signed in");
      console.log(result);
    })
    .catch((error) => {
      console.log(error.code);
      console.log(error.message);
      alert(error.code)
    });
}

// forgot password

function forgotpassword(){
  const email = document.getElementById('forgpass').value;

  firebase.auth().sendPasswordResetEmail(email)
  .then(() => {
    console.log("sfdvghjk");
    alert('Reset link is send to your Email')
    // Password reset email sent!
    // ..
  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    alert(errorCode)
    console.log(errorCode);
    console.log(errorMessage);
    console.log(email);
    // ..
  });
}