

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
// var getPartnerID  = [];

var getUserDetails = function() {

var user = firebase.auth().currentUser;

user.providerData.forEach(function (profile) {
  const UID = user.uid;


  // console.log(UID);

  firebase.database().ref("usertable").orderByChild("userUID").equalTo(UID).on("child_added", function(snapshot) {
  myKey ="" ;
    myKey = snapshot.key;
  // console.log(myKey);
    document.querySelector("div#myUserKey").innerHTML = myKey;
    
  firebase.database().ref('usertable/'+ myKey).on("value", snapshot => {
      myRole = snapshot.val().role; // total points
      // console.log(snapshot.key + " is " + snapshot.val().role );
      partnerID = snapshot.val().partnerID; // get partnerID
      strPartnerID = partnerID.toString();
      console.log(strPartnerID);
      var divPartnerID = document.querySelector("div#partnerID");
      if (divPartnerID.innerHTML === "") {
        divPartnerID.innerHTML += strPartnerID;  
      }

      
      console.log(snapshot.key + " is " + snapshot.val().partnerID );
    });
  });
});    

}


window.onload = function(e){ 
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      // console.log('user is logged');
      var currentEmail = firebase.auth().currentUser.email;
      console.log("Logged in as "+ currentEmail)
      // const navigator = document.querySelector("#navigator");
      // navigator.resetToPage("home.html");
    
      var user = firebase.auth().currentUser;
      user.providerData.forEach(function (profile) {
        const UID = user.uid;
      
        firebase.database().ref("usertable").orderByChild("userUID").equalTo(UID).on("child_added", function(snapshot) {
          myKey = snapshot.key;
          firebase.database().ref('usertable/'+ myKey).on("value", snapshot => {
            myRole = snapshot.val().role; // total points

            console.log(snapshot.key + " is " + myRole );
            if (myRole === "papa" ) {
              // set partnerID as own user key if user is papa
              console.log("User is papa");
              const navigator = document.querySelector("#navigator");
              navigator.resetToPage("home2.html");
           
            } else if  (myRole === "mama" ) {
              // set partnerID as partner's key if user is mama
                  console.log("User is mama");  
                  const navigator = document.querySelector("#navigator");
                  // navigator.resetToPage("home-papa.html");
                  navigator.resetToPage("home.html");
            
              }
          });
        });
      });    

      console.log("On load " );


    } else {
      console.log("user not found")
      const navigator = document.querySelector("#navigator");
      navigator.loadPage("login.html");
    }
    
  });
}


// Login Page
const login = () => {

  const myEmail = document.querySelector("#email").value;
  const password = document.querySelector("#password").value;
  // console.log(myEmail);
  // console.log(password);
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
        // console.log("role: "+ a)
        // console.log("snapshotKey: "+ key)
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
        // console.log("role: "+ a)
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
