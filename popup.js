
document.addEventListener('DOMContentLoaded', function() {
  var downloadBtn = document.getElementById('download-btn');
  downloadBtn.addEventListener('click', function() {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.sendMessage(tabs[0].id, { action: "getVideoData" }, function (
        response
      ) {
        if (response && response.videoData) {
          console.log("Sucesso");
        } else {
          console.log("Unable to download video");
        }
      });
    });
  });
});

