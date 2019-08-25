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

