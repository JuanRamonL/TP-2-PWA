// Variables globales
const apiKey = 'AIzaSyBDeyLsm7ltINoz6olSCGuHRr2N-wqLL78'; 

function searchTrailer() {
  var input = document.getElementById("searchInput").value;
  var container = document.getElementById("trailerContainer");

  container.innerHTML = "";

  var url = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q=${encodeURIComponent(input)}+trailer&type=video&key=${apiKey}`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      if (data.items && data.items.length > 0) {
        var videoId = data.items[0].id.videoId;
        var iframeWrapper = document.createElement("div");
        iframeWrapper.className = "iframe-wrapper";

        var iframe = document.createElement("iframe");
        iframe.src = `https://www.youtube.com/embed/${videoId}`;

        iframeWrapper.appendChild(iframe);
        container.appendChild(iframeWrapper);
      } else {
        container.textContent = "No se encontró el tráiler.";
      }
    })
    .catch(error => {
      console.log(error);
      container.textContent = "Ocurrió un error al buscar el tráiler.";
    });
}