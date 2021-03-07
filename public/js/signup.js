
$(document).ready(function () {
  // Getting references to our form and input
  const signUpForm = $("form.signup");
  const firstNameInput = $("input#firstNameInput");
  const lastNameInput = $("input#lastNameInput");
  const postCodeInput = $("input#postCode");
  const emailInput = $("input#exampleInputEmail1");
  const passwordInput = $("input#exampleInputPassword1");
  const dogNameInput = $("input#dogNameInput");
  const dogAgeInput = $("input#dogAgeInput");
  const dogBreedInput = $("#dogBreedInput");
  // const dogSexInput = $("input#dogSexInput");
  // const dogDesexedInput = $("input#dogDesexedInput");
  const dogAllergiesInput = $("input#dogAllergiesInput");
  // const dogChildFriendlyInput = $("input#childFriendlyInput");
  // const dogPhotoInput = $("input#dogPhotoInput");
  const dogDescriptionInput = $("#dogDescriptionInput")

  let file;

  // When the signup button is clicked, we validate the email and password are not blank

  $('input[type="file"]').change(function (e) {
    file = e.target.files[0];
  });

  signUpForm.on("submit", function (event) {
    event.preventDefault();
    const userData = {
      firstName: firstNameInput.val().trim(),
      lastName: lastNameInput.val().trim(),
      postcode: postCodeInput.val().trim(),
      email: emailInput.val().trim(),
      password: passwordInput.val().trim(),
      dogName: dogNameInput.val().trim(),
      age: dogAgeInput.val().trim(),
      breed: dogBreedInput.val().trim(),
      sex: $("input[name='sex']:checked").val(),
      desexed: $("input[name='desexed']:checked").val(),
      allergies: dogAllergiesInput.val().trim(),
      childFriendly: $("input[name='childFriendly']:checked").val(),
      // dogImage: dogPhotoInput.val().trim(),
      userText: dogDescriptionInput.val().trim(),
      // image: file
    };
    // debugger;
    // if (!userData.firstName || !userData.lastName || userData.postCode || !userData.email || !userData.password || !userData.dogName || !userData.age || !userData.breed || !userData.sex || !userData.desexed || !userData.allergies || !userData.childFriendly || !userData.dogImage || !userData.userText) {

    //   alert("All Fields Must be Entered to Sign Up!!!")

    //   return;
    // }

    $.post("/api/signup", userData).then(function (data) {
      window.location.replace("/html/login.html");
      // If there's an error, handle it by throwing up a bootstrap alert
    })
      .catch(handleLoginErr);
    // If we have an email and password, run the signUpUser function
    // signUpUser(userData.email, userData.password);
    // emailInput.val("");
    // passwordInput.val("");
  });

  // Does a post to the signup route. If successful, we are redirected to the members page


  function handleLoginErr(err) {
    $("#alert .msg").text(err.responseJSON);
    $("#alert").fadeIn(500);
  }
});
