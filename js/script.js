if ('serviceWorker' in navigator) {

      navigator.serviceWorker.register('../js/serviceWorker.js')
        .then(reg => {
          console.log('Service Worker registrado:', reg);
        })
        .catch(err => {
          console.log('Error al registrar el Service Worker:', err);
        });
    ;
  }