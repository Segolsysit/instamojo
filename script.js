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
        const currentUser = firebase.auth().currentUser;
        const deviceIdentifier = getDeviceIdentifier(); // Get the device identifier for the current device
        firebase.database().ref(`users/${currentUser.uid}/devices/${deviceIdentifier}`).once('value')
          .then((snapshot) => {
            if (snapshot.exists()) {
              alert('This account is already logged in on another device.')
              throw new Error('This account is already logged in on another device.'); // Prevent the user from logging in from the new device
            } else {
              firebase.database().ref(`users/${currentUser.uid}/devices/${deviceIdentifier}`).set(true); // Allow the user to log in from the new device and store the device identifier in the user's account data
            }
          })
          .catch((error) => {
            console.error(error);
          });
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

// Helper function to get the device identifier
function getDeviceIdentifier() {
  
  // Implement your own device identification logic here, such as using a browser fingerprint library or generating a unique ID and storing it in local storage
  // return 'example-device-identifier';
  let deviceIdentifier = localStorage.getItem('deviceIdentifier'); // Check if device identifier is already stored in local storage
  if (!deviceIdentifier) { // If not, generate a new one
    const navigatorInfo = window.navigator;
    const screenInfo = window.screen;
    const random = Math.random();
    deviceIdentifier = `${navigatorInfo.userAgent}${navigatorInfo.language}${screenInfo.width}${screenInfo.height}${screenInfo.colorDepth}${random}`; // Combine device attributes and random number to generate the device identifier
    deviceIdentifier = btoa(deviceIdentifier).substr(0, 16); // Encode device identifier in base64 and take the first 16 characters
    localStorage.setItem('deviceIdentifier', deviceIdentifier); // Store the device identifier in local storage
  }
  return deviceIdentifier;
}

