
$(document).ready(function () {
  // Getting references to our form and input
  var signUpForm = $("form.signup");
  var firstNameInput = $("input#firstNameInput");
  var lastNameInput = $("input#lastNameInput");
  var postCodeInput = $("input#examplePostcode");
  var emailInput = $("input#exampleInputEmail1");
  var passwordInput = $("input#exampleInputPassowrd1");
  var dogNameInput = $("input#dogNameInput");
  var dogAgeInput = $("input#dogAgeInput");
  var dogBreedInput = $("input#dogBreedInput");
  var dogSexInput = $("input#dogSexInput");
  var dogDesexedInput = $("input#dogDesexedInput");
  var dogAllergiesInput = $("input#dogAllergiesInput");
  var dogChildFriendlyInput = $("input#childFriendlyInput");
  var dogPhotoInput = $("input#dogPhotoInput");
  var dogDescriptionInput = $("input#dogDescriptionInput")

  // When the signup button is clicked, we validate the email and password are not blank

  signUpForm.on("submit", function (event) {
    event.preventDefault();
    var userData = {
      firstName: firstNameInput.val().trim(),
      lastName: lastNameInput.val().trim(),
      postcode: postCodeInput.val().trim(),
      email: emailInput.val().trim(),
      password: passwordInput.val().trim(),
      dogName: dogNameInput.val().trim(),
      age: dogAgeInput.val().trim(),
      breed: dogBreedInput.val().trim(),
      sex: dogSexInput.val().trim(),
      desexed: dogDesexedInput.val().trim(),
      allergies: dogAllergiesInput.val().trim(),
      childFriendly: dogChildFriendlyInput.val().trim(),
      dogImage: dogPhotoInput.val().trim(),
      userText: dogDescriptionInput.val().trim(),

    };

    if (!userData.firstName || !userData.lastName || userData.postCode || !userData.email || !userData.password || !userData.dogName || !userData.age || !userData.breed || !userData.sex || !userData.desexed || !userData.allergies || !userData.childFriendly || !userData.dogImage || !userData.userText) {

      alert("All Fields Must be Entered to Sign Up!!!")

      return;
    }
    // If we have an email and password, run the signUpUser function
    signUpUser(userData.email, userData.password);
    emailInput.val("");
    passwordInput.val("");
  });

  // Does a post to the signup route. If successful, we are redirected to the members page
  // Otherwise we log any errors
  function signUpUser(email, password) {
    $.post("/api/signup", {
      firstName: firstName,
      lastName: lastName,
      postcode: postcode,
      email: email,
      password: password,
      dogName: dogName,
      age: age,
      breed: breed,
      sex: sex,
      desexed: desexed,
      allergies: allergies,
      childFriendly: childfriendly,
      dogImage: dogImage,
      userText: userText
    }).then(function (data) {
      window.location.replace("/members");
      // If there's an error, handle it by throwing up a bootstrap alert
    })
      .catch(handleLoginErr);
  }

  function handleLoginErr(err) {
    $("#alert .msg").text(err.responseJSON);
    $("#alert").fadeIn(500);
  }
});
