// Variables globales
const favoritesContainer = document.getElementById('favorites-container');

// Función para mostrar las películas favoritas
function updateFavorites() {
  favoritesContainer.innerHTML = '';

  if (favoriteMovies.length === 0) {
    favoritesContainer.innerHTML = 'No hay películas favoritas.';
  } else {
    favoriteMovies.forEach(movie => {
      const movieElement = createMovieElement(movie);
      favoritesContainer.appendChild(movieElement);
    });
  }
}

// Llama a la función updateFavorites para mostrar las películas favoritas al cargar la página
updateFavorites();
