// Cargar favoritos desde el localStorage al cargar la página
window.addEventListener("DOMContentLoaded", function() {
    loadFavoritesFromLocalStorage();
  });
  
  function loadFavoritesFromLocalStorage() {
    var favoritesContainer = document.getElementById("favorites-container");
    favoritesContainer.innerHTML = "";
  
    if (localStorage.getItem("favoritos")) {
      var favorites = JSON.parse(localStorage.getItem("favoritos"));
  
      favorites.forEach(movie => {
        var title = movie.Title;
        var year = movie.Year;
        var poster = movie.Poster;
  
        var movieElement = document.createElement("div");
        movieElement.classList.add("card", "col-6", "col-md-4","col-lg-3");
  
        var moviePoster = document.createElement("img");
        moviePoster.classList.add("card-img-top");

        moviePoster.src = poster;
  
        var movieTitle = document.createElement("h2");
        movieTitle.textContent = title;
  
        var movieYear = document.createElement("p");
        movieYear.textContent = year;
  
        var removeButton = document.createElement("button");
        removeButton.classList.add("btn", "btn-primary", "btn-small");
        removeButton.textContent = "Eliminar de Favoritos";
        removeButton.addEventListener("click", function() {
          removeFavoriteFromLocalStorage(movie);
          movieElement.remove();
        });
  
        movieElement.appendChild(moviePoster);
        movieElement.appendChild(movieTitle);
        movieElement.appendChild(movieYear);
        movieElement.appendChild(removeButton);
  
        favoritesContainer.appendChild(movieElement);
      });
    } else {
      favoritesContainer.textContent = "No tienes películas favoritas guardadas.";
    }
  }
  
  function removeFavoriteFromLocalStorage(movie) {
    var favorites = JSON.parse(localStorage.getItem("favoritos"));
  
    var updatedFavorites = favorites.filter(function(favorite) {
      return favorite.imdbID !== movie.imdbID;
    });
  
    localStorage.setItem("favoritos", JSON.stringify(updatedFavorites));
  }
  