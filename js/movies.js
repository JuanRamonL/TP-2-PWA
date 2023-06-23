const apiKey = '93469841'; 
let favoritos = [];


//Realiza la búsqueda de películas y muestra los resultados en la interfaz de usuario. 
function buscarPelicula() {
  var input = document.getElementById("searchInput").value;
  var url = "https://www.omdbapi.com/?apikey=" + apiKey + "&s=" + encodeURIComponent(input) + "&type=movie"; // Añadimos el parámetro "&type=movie" para buscar solo películas

  fetch(url)
    .then(response => response.json())
    .then(data => {
      mostrarPelicula(data.Search);
      saveLastSearch(input); // Guardar la última búsqueda
    })
    .catch(error => console.log(error));
}

// Muestra las películas encontradas en la interfaz de usuario.
function mostrarPelicula(movies) {
  var results = document.getElementById("results");
  results.innerHTML = "";

  if (movies) {
    movies.forEach(movie => {
      var title = movie.Title;
      var poster = movie.Poster;
      
      // Si la película no tiene imagen, no se renderiza
      if (poster === "N/A") {
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

// Agrega una película a la lista de favoritos y la guarda en el Local Storage.
function addToFavorites(movie) {
  favoritos.push(movie);
  saveFavoritesToLocalStorage();
  console.log("Película agregada a favoritos:", movie);
}

// Guarda la lista de películas favoritas en el Local Storage.
function saveFavoritesToLocalStorage() {
  localStorage.setItem("favoritos", JSON.stringify(favoritos));
}

// Muestra los detalles de una película utilizando el IMDb ID.
function showMovieDetails(imdbID) {
console.log("Detalles de la película:", imdbID);
}

// Guarda la última búsqueda realizada por el usuario en el Local Storage.

function saveLastSearch(input) {
  localStorage.setItem("lastSearch", input);
}

// Cargar favoritos desde el localStorage al iniciar la página
if (localStorage.getItem("favoritos")) {
  favoritos = JSON.parse(localStorage.getItem("favoritos"));
}

// Cargar la última búsqueda al iniciar la página
if (localStorage.getItem("lastSearch")) {
  var lastSearch = localStorage.getItem("lastSearch");
  document.getElementById("searchInput").value = lastSearch;
  buscarPelicula();
}
