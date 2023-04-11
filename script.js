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
var firebaseRef = firebase.database().ref('data')

// let a = 600;
// var options = {
//   "key": "rzp_test_FjtqgTIsWBgXxV", // Enter the Key ID generated from the Dashboard
//   "amount": a * 100, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
//   "currency": "INR",
//   "name": "Acme Corp", //your business name
//   "description": "Test Transaction",
//   "image": "https://example.com/your_logo",
//   // "order_id": "rzp_test_FjtqgTIsWBgXxV", //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
//   "callback_url": "index.html",
//   "prefill": {
//     "name": "Gaurav Kumar", //your customer's name
//     "email": "gaurav.kumar@example.com",
//     "contact": "9000090000"
//   },
//   "notes": {
//     "address": "Razorpay Corporate Office"
//   },
//   "theme": {
//     "color": "#3399cc"
//   }
// };
// var rzp1 = new Razorpay(options);
// rzp1.open();

function signup() {

  const email = document.getElementById('reg_email').value;
  const password = document.getElementById('reg_pass').value;
  const username = document.getElementById('user').value
  var firebase1Ref = firebase.database().ref('register-data')
  var register_data ={
    email:email,
    username:username
  }
  console.log(email, password);
  firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((result) => {
      firebase1Ref.push(register_data)
      alert("you signed up");
      window.location.href = "login.html";
      console.log(result);
    })
    .catch((error) => {
      console.log(error.code);
      console.log(error.message);
      // ..
    });
}

// signin function


function signIn() {
  // const username = document.getElementById('userlog').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('pass').value;

  firebase.auth().signInWithEmailAndPassword(email, password)
  .then(() => {
      localStorage.setItem("email", email);
      firebase.auth().onAuthStateChanged(function (user) {
        var username = user.username;
        sessionStorage.setItem("user",username)
          if (user) {
              var userEmail = user.email;
              var usersRef = firebase.database().ref("data");
              usersRef.orderByChild("email").equalTo(userEmail).once("value", function (snapshot) {
                  if (snapshot.exists()) {
                      console.log("Email exists in the database");
                      window.location.href = "course-watch.html"

                  } else {
                      console.log("Email does not exist in the database");
                      window.location.href = "index.html"
                  }
              });
          }
      });
    })
}

// forgot password

function forgotpassword() {
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

function logout(){
  firebase.auth().signOut().then(() => {
      // Sign-out successful.
      localStorage.removeItem("email");
      sessionStorage.removeItem('user')

      window.location.href = "login.html";
    }).catch((error) => {
      // An error happened.
      console.log(error);
    });
}

// payment function

