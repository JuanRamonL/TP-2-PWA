// Variables globales
const trailerContainer = document.getElementById('trailer-container');

// Función para mostrar el trailer de una película
async function showTrailer(movieId) {
  trailerContainer.innerHTML = '';

  try {
    const response = await fetch(`https://www.omdbapi.com/?apikey=${apiKey}&i=${movieId}&plot=short`);
    const data = await response.json();

    if (data.Response === 'True') {
      const trailerLink = data.Trailer;

      if (trailerLink) {
        const iframeElement = document.createElement('iframe');
        iframeElement.src = trailerLink;
        iframeElement.allowFullscreen = true;
        trailerContainer.appendChild(iframeElement);
      } else {
        trailerContainer.innerHTML = 'No se encontró trailer para esta película.';
      }
    } else {
      trailerContainer.innerHTML = 'Error al cargar el trailer.';
    }
  } catch (error) {
    console.log('Error al cargar el trailer:', error);
    trailerContainer.innerHTML = 'Error al cargar el trailer.';
  }
}

// Llama a la función showTrailer con el ID de la película deseada (reemplaza 'ID_DE_LA_PELICULA' con el ID correspondiente)
showTrailer('ID_DE_LA_PELICULA');
