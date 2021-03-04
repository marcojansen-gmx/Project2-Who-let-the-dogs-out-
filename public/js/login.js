// Beau

$(document).ready(function(){

    // Grabbing elements
  var loginForm = $("TBD");
  var emailInput = $("TBD");
  var passowrdInput = $("TBD");

// listening for the submit event

  loginForm.on("submit", function(event){
      event.preventDefault();
      var userData = {
          email: emailInput.val().trim(),
      };

    //   if they are missing email or password when submitted, return the user
      if (!userData.email || !userData.passowrd){
          return;
      }

    //   if the email is valid, run the login function and clear the two inputs
      loginUser(userData.email, userData.passowrd);
      emailInput.val("");
      passowrdInput.val("");
  });

//   post the data via the login api and if valid, send the user to the main page for matches

  function loginUser(email, passowrd) {
      $.post("/api/login", {
          email: email,
          passowrd: passowrd
      })
      .then(function() {
          window.location.replace("/main")
      })
  }
})