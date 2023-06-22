// Variables globales
const apiKey = '93469841'; // Reemplaza esto con tu propia API key de OMDB
let favoritos = [];

function buscarPelicula() {
  var input = document.getElementById("searchInput").value;
  var url = "https://www.omdbapi.com/?apikey=" + apiKey + "&s=" + encodeURIComponent(input) + "&type=movie"; // Añadimos el parámetro "&type=movie" para buscar solo películas

  fetch(url)
    .then(response => response.json())
    .then(data => mostrarPelicula(data.Search))
    .catch(error => console.log(error));
}

function mostrarPelicula(movies) {
  var results = document.getElementById("results");
  results.innerHTML = "";

  if (movies) {
    movies.forEach(movie => {
      var title = movie.Title;
      var poster = movie.Poster;

      if (poster === "N/A") {
        // Si la película no tiene imagen, no se renderiza
        return;
      }

      var movieCard = document.createElement("div");
      movieCard.classList.add("card", "col-6", "col-md-4","col-lg-3");

      var moviePoster = document.createElement("img");
      moviePoster.classList.add("card-img-top");
      moviePoster.src = poster;
      movieCard.appendChild(moviePoster);

      var cardOverlay = document.createElement("div");
      cardOverlay.classList.add("card-body");

      var movieTitle = document.createElement("h2");
      movieTitle.classList.add("card-title");
      movieTitle.textContent = title;

      var favoriteButton = document.createElement("button");
      favoriteButton.classList.add("btn", "btn-warning");
      favoriteButton.textContent = "Agregar a Favoritos";
      favoriteButton.addEventListener("click", function() {
        addToFavorites(movie);
      });

      cardOverlay.appendChild(movieTitle);
      cardOverlay.appendChild(favoriteButton);
      movieCard.appendChild(cardOverlay);
      results.appendChild(movieCard);
    });
  } else {
    results.textContent = "No se encontraron resultados";
  }
}


function addToFavorites(movie) {
  favoritos.push(movie);
  saveFavoritesToLocalStorage();
  console.log("Película agregada a favoritos:", movie);
}

function saveFavoritesToLocalStorage() {
  localStorage.setItem("favoritos", JSON.stringify(favoritos));
}

function showMovieDetails(imdbID) {
  // Aquí puedes implementar la lógica para mostrar los detalles de la película utilizando el imdbID
  console.log("Detalles de la película:", imdbID);
}

// Cargar favoritos desde el localStorage al iniciar la página
if (localStorage.getItem("favoritos")) {
  favoritos = JSON.parse(localStorage.getItem("favoritos"));
}

// Otro código y funciones relacionadas aquí...
