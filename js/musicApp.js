

document.getElementById("form").style.display = "none";

// check user persmission for notification
if ("Notification" in window && "serviceWorker" in navigator) {
  document.getElementById("sendBtn").addEventListener("click", function () {
    var permission = Notification.permission;
    if (permission === "granted") {
      document.getElementById("form").style.display = "block";
      document.getElementById("sendBtn").style.display = "none";

    }
    else {
      Notification.requestPermission().then(function (permission) {
        if (permission === "granted") {
          document.getElementById("form").style.display = "block";
          document.getElementById("sendBtn").style.display = "none";
        }
      });
    }
  });

}

// event listener for add button
document.getElementById("add").addEventListener("click", addData);
function addData() {
  console.log("add button clicked");
  var text1 = document.getElementById("titleName").value;
  var text2 = document.getElementById("artistName").value;

  if (text1 === "" || text2 === "") {
    console.log("Please fill all the fields");
    document.getElementById("alert").innerHTML = "Please fill all the fields";
    // hide alert after 3 seconds
    setTimeout(function () {
      document.getElementById("alert").innerHTML = "";
    }
      , 3000);
  } else {
    // notification body
    var options = {
      body: "Artist: " + text2,
      actions: [
        { action: "agree", title: "Agree" },
        { action: "disagree", title: "Disagree" }
      ],
    }
    // create notification
    navigator.serviceWorker.ready.then(function (swreg) {
      swreg.showNotification(text1, options);
    }
    );
  }
}

//Registering the service worker
console.log('Navigator', navigator);
if (navigator.serviceWorker) {
  navigator.serviceWorker.register('/service-worker.js', { scope: '/' })
    .then(function (reg) {
      console.log('Service Worker Registered', reg);
    })
    .catch(function (err) {
      console.log('Service Worker Failed to Register', err);
    });
}
else {
  console.log('Service Worker not supported');
}


