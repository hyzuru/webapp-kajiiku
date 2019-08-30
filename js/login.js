// Login Page
const login = () => {
  const myEmail = document.querySelector("#email").value;
  const password = document.querySelector("#password").value;
  console.log(myEmail);
  console.log(password);

  firebase.auth().signInWithEmailAndPassword(myEmail, password)
  .then(function() {
    console.log('サインアップしました。');
    const navigator = document.querySelector("#navigator");
    navigator.resetToPage("home.html");
  })
  .catch(function(error) {
    console.log('サインアップできませんでした。');
  });
  //   .catch(function(error) {
// // 登録に失敗した時の処理
//     alert('登録できません（' + error.message + '）');
// });
  // if (myEmail === "" && password === "") {
  //   const navigator = document.querySelector("#navigator");
  //   navigator.resetToPage("home.html");
  // } else {
  //   ons.notification.alert("Wrong username/password combination");
  // }
};
const signUp = () => {
  const myEmail = document.querySelector("#newEmail").value;
  const password = document.querySelector("#newPassword").value;
  console.log(myEmail);
  console.log(password);

  firebase.auth().createUserWithEmailAndPassword(myEmail, password)
  .then(function() {
    console.log('サインアップしました。');
  })
  .catch(function(error) {
    console.log('サインアップできませんでした。');
  });
};
