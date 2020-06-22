if ("serviceWorker" in navigator) {  
  console.log("Service worker file read!");         
  window.addEventListener("load", () => {       
    navigator.serviceWorker
    .register("/service-worker.js")
    .then(reg =>            
      console.log("Service Worker registration done!"))
      .catch(err => console.log(` Service Worker Error: ${err}`))   
}) 
}