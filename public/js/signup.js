
$(document).ready(function () {
  // Getting references to our form and input
  const signUpForm = $('form.signup');
  const firstNameInput = $('input#firstNameInput');
  const lastNameInput = $('input#lastNameInput');
  const postCodeInput = $('input#postCode');
  const emailInput = $('input#exampleInputEmail1');
  const passwordInput = $('input#exampleInputPassword1');
  const dogNameInput = $('input#dogNameInput');
  const dogAgeInput = $('input#dogAgeInput');
  const dogBreedInput = $('#dogBreedInput');
  // const dogSexInput = $('input#dogSexInput');
  // const dogDesexedInput = $('input#dogDesexedInput');
  const dogAllergiesInput = $('input#dogAllergiesInput');
  // const dogChildFriendlyInput = $('input#childFriendlyInput');
  // const dogPhotoInput = $('input#dogPhotoInput');
  const dogDescriptionInput = $('#dogDescriptionInput')

  let file;

  // When the signup button is clicked, we validate the email and password are not blank

  $("input[type='file']").change(function (e) {
    file = e.target.files[0];
  });

  signUpForm.on('submit', function (event) {
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
      // childFriendly: $('input[name='childFriendly']:checked').val(),
      // dogImage: dogPhotoInput.val().trim(),
      userText: dogDescriptionInput.val().trim(),
      // image: file
    };

    const formData = new FormData();
    Object.keys(userData).map((key) => {
      formData.append(key, userData[key]);
    });

    formData.append('dogImage', file);

    $.ajax({
      url: '/api/signup',
      data: formData,
      
      cache: false,
      contentType: false,
      processData: false,
      method: 'POST',
      type: 'POST', // For jQuery < 1.9
      success: function (res) {
        // console.log({res});

        window.location.replace('/playdates');
      }
    });
  });

  // Does a post to the signup route. If successful, we are redirected to the members page


  function handleLoginErr(err) {
    $('#alert .msg').text(err.responseJSON);
    $('#alert').fadeIn(500);
  }
});
