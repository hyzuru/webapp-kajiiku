document.addEventListener("init", function(event) {
  var myNavigator = document.getElementById("myNavigator");
  myNavigator.pushPage("page1.html");

  // // Navigate to next page
  // var page = event.target;

  // if (page.id === "page1") {
  //   page.querySelector("#push-button").onclick = function() {
  //     document
  //       .querySelector("#myNavigator")
  //       .pushPage("page2.html", { data: { title: "Page 2" } });
  //   };
  // } else if (page.id === "page2") {
  //   page.querySelector("ons-toolbar .center").innerHTML = page.data.title;
  // }
});

const loadPage = page => {
  document.querySelector("#menu").close();
  document
    .querySelector("#navigator")
    .bringPageTop(page, { animation: "fade" });
};
