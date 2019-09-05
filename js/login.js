// Login Page
const login = () => {

  // const myEmail = document.querySelector("#email").value;
  // const password = document.querySelector("#password").value;
  // console.log(myEmail);
  // console.log(password);
  // firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
  // .then(function() {
  // firebase.auth().signInWithEmailAndPassword(myEmail, password)
  // .then(function() {
  //   console.log('ログインしました。');
    const navigator = document.querySelector("#navigator");
    navigator.resetToPage("home.html");
  // })
  // .catch(function(error) {
  //   console.log('ログインできませんでした。');
  //       // 登録に失敗した時の処理

  //       ons.notification.alert('ログインできません（' + error.message + '）');
  // });
// })


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
firebase.auth().setPersistence(firebase.auth.Auth.Persistence.NONE)
.then(function() {
  firebase.auth().createUserWithEmailAndPassword(myEmail, password)
  .then(function() {
    console.log('サインアップしました。');
    const navigator = document.querySelector("#navigator");
    navigator.resetToPage("home.html");
    var user = firebase.auth().currentUser;
    user.providerData.forEach(function (profile) {
      const UID = user.uid;
      firebase.database().ref('usertable').push({
        email:myEmail,
        password:password,
        role:a,
        userUID:UID,
        partnerID:"",
        point:0

      })
    });
  })
  .catch(function(error) {
    console.log('サインアップできませんでした。');
        // 登録に失敗した時の処理

        ons.notification.alert('登録できません（' + error.message + '）');
  });
})

};
