if ('serviceWorker' in navigator) {

      navigator.serviceWorker.register('../serviceWorker.js')
        .then(reg => {
          console.log('Service Worker registrado:', reg);
        })
        .catch(err => {
          console.log('Error al registrar el Service Worker:', err);
        });
    ;
  }else{
    console.log('No soperta ServiceWorker')
  }