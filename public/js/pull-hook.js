ons.ready(function() {
  var pullHook = document.getElementById("pull-hook");

  pullHook.addEventListener("changestate", function(event) {
    var message = "";

    switch (event.state) {
      case "initial":
        message = "Pull to refresh";
        break;
      case "preaction":
        message = "Release";
        break;
      case "action":
        message = "Loading...";
        break;
    }

    pullHook.innerHTML = message;
  });

  pullHook.onAction = function(done) {
    setTimeout(done, 1000);
  };
});