if (navigator.serviceWorker) {
  window.addEventListener('load', async () => {
    try {
      if (navigator.serviceWorker) {
        await navigator.serviceWorker.register('/service-worker.js');
        console.log('sw registered');
      }
      // await registration.unregister();
    } catch (e) {
      console.log(e);
    }
  });
}

document.querySelector('.reload').addEventListener('click', (e) => {
  e.preventDefault();
  location.reload();
});
