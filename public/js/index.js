$(document).ready(function() {
    console.log("Welcome");
    const params = new URLSearchParams(window.location.search);
    if (params.has('logout')){
      //Logout request, clean local session storage
      delete sessionStorage.user;
    }
});