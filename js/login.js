

// Detecting Connection State
var connectedRef = firebase.database().ref(".info/connected");
connectedRef.on("value", function(snap) {
  if (snap.val() === true) {
    // alert("connected");
    // console.log("Connected to Database")
    
  } else {
    // alert("not connected");
  }
});

// Managing Presence
var presenceRef = firebase.database().ref("disconnectmessage");
// // Write a string when this client loses connection
presenceRef.onDisconnect().set("I disconnected!");

var userKey;

function init() {
var user = firebase.auth().currentUser;

var currentUID ;
user.providerData.forEach(function (profile) {
  const UID = user.uid;
  console.log(UID);
  currentUID = UID ;
});
// var userKey ;
firebase.database().ref("usertable").orderByChild("userUID").equalTo(currentUID).on("child_added", function(snapshot) {
console.log(snapshot);
    // var key = snapshot.key;
    console.log(key);
    userKey = key;
    document.querySelector("div#myUserKey").innerText = userKey;
  });
  userKey = document.querySelector("div#myUserKey").innerText ;
    console.log(userKey) ;
  firebase.database().ref("usertable/"+userKey ).on("child_added", function(snapshot) {
    // console.log(snapshot.hasChildren.val());
        var key = snapshot.key;
        console.log(key);

      var changedPost = snapshot.val();
      console.log("The updated post title is " + changedPost.partnerID);

        // userKey = key;
        // document.querySelector("div#myUserKey").innerText = userKey;
  });
    // if (snapshot.hasChild("partnerID")) {
    //   console.log(snapshot);
    //   };
  
    // var partner = snapshot.child('partnerID').val();
    // console.log(partner);
    // document.querySelector("div#partnerID").innerText = partnerID;
  
}


window.onload = function(e){ 
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      console.log('user is logged');
      const currentUser = firebase.auth().currentUser;
      console.log(currentUser)
      const navigator = document.querySelector("#navigator");
      navigator.resetToPage("home.html");
      init();
    } else {
      console.log("user not found")
      const navigator = document.querySelector("#navigator");
      navigator.loadPage("login.html");
    }
    // onUserStatusChanged(status)   Login shiteiru ka douka  user.uid
  });
}


// Login Page
const login = () => {

  const myEmail = document.querySelector("#email").value;
  const password = document.querySelector("#password").value;
  console.log(myEmail);
  console.log(password);
  firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
  .then(function() {
  firebase.auth().signInWithEmailAndPassword(myEmail, password)
  .then(function() {
    console.log('ログインしました。');
    const navigator = document.querySelector("#navigator");
    navigator.resetToPage("home.html");
  })
  .catch(function(error) {
    console.log('ログインできませんでした。');
        // 登録に失敗した時の処理

        ons.notification.alert('ログインできません（' + error.message + '）');
  });
})


};
const signUp = () => {
  const myEmail = document.querySelector("#newEmail").value;
  const password = document.querySelector("#newPassword").value;
  console.log(myEmail);
  console.log(password);
  var elements = document.getElementsByName("answer");
  // 選択状態の値を取得
  for (var a = "", i = elements.length; i--; ) {
    if (elements[i].checked) {
      var a = elements[i].value;
      break;
    }
  }
  console.log(a);

  firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
  .then(function() {
  firebase.auth().createUserWithEmailAndPassword(myEmail, password)
  .then(function() {
    console.log('サインアップしました。');
    if (a === "papa") {
    const navigator = document.querySelector("#navigator");
    navigator.resetToPage("home.html");
    var user = firebase.auth().currentUser;
    user.providerData.forEach(function (profile) {
      const UID = user.uid;
      firebase.database().ref('usertable').push({
        email:myEmail,
        // password:password,
        role:a,
        userUID:UID,
        partnerID:"",
        point:0
      }).then((snap) => {
        const key = snap.key ;
        console.log("role: "+ a)
        console.log("snapshotKey: "+ key)
        if (a === "papa") {
          firebase.database().ref('usertable/'+ key ).update({
          partnerID:key, 
        });

      } 
     })
      
        
    });
  } else if (a === "mama") {
    const navigator = document.querySelector("#navigator");
    navigator.resetToPage("connect.html");
    var user = firebase.auth().currentUser;
    user.providerData.forEach(function (profile) {
      const UID = user.uid;
      firebase.database().ref('usertable').push({
        email:myEmail,
        // password:password,
        role:a,
        userUID:UID,
        partnerID:"",
        point:0
      }).then((snap) => {
        const key = snap.key ;
        console.log("role: "+ a)
        })
    });
  }
  })
  .catch(function(error) {
    console.log('サインアップできませんでした。');
        // 登録に失敗した時の処理

        ons.notification.alert('登録できません（' + error.message + '）');
  });
})

};

// ログアウトをする

const logOut = () => {
  firebase.auth().signOut().then(function() {
    // Sign-out successful.
    location.reload();
  }).catch(function(error) {
    // An error happened.
  });
}


function newFunction(partnerkey) {
  console.log(myKey);
  console.log(partnerkey());
}
// edit user settings ユーザ設定を変更　（Eメール）

// var user = firebase.auth().currentUser;

// const changeEmail = () => {


//   user.updateEmail("aaa@aaa.com").then(function() {
//     // Update successful.
//   }).catch(function(error) {
//     // An error happened.
//   });
// }


