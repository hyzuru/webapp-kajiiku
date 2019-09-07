// Open up the side menu
const openMenu = () => {
  document.querySelector("#menu").open();
};

// Dynamically Change the Title Bar
document.addEventListener("prechange", ({ target, tabItem }) => {
  if (target.matches("#tabbar")) {
    document.querySelector(
      "#home-toolbar .center"
    ).innerHTML = tabItem.getAttribute("label");
  }
});


const loadPage = page => {
  document.querySelector("#menu").close();
  document
    .querySelector("#navigator")
    .bringPageTop(page, { animation: "fade" });
};

// document.querySelector('ons-back-button').onClick = function(event) {
//   // Reset the whole stack instead of popping 1 page
//   document.querySelector('ons-navigator').resetToPage('home.html');
// };

