// Get references to page elements
var $firstName = $("#first-name");
var $lastName = $("#last-name");
var $dob = $("#pt-dob");
var $weight = $("#pt-weight");
var $height = $("#pt-height");
var $phone = $("#pt-phone");
var $email = $("#pt-email");
var $street = $("#pt-street");
var $city = $("#pt-city");
var $state = $("#pt-state");
var $zip = $("#pt-zip");
var $submitBtn = $("#submit");

// The API object contains methods for each kind of request we'll make
var API = {
  savePatient: function(patient) {
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: "api/patients",
      data: JSON.stringify(patient)
    });
  },
  getPatients: function() {
    return $.ajax({
      url: "api/patients",
      type: "GET"
    });
  },
  deletePatient: function(id) {
    return $.ajax({
      url: "api/patients/" + id,
      type: "DELETE"
    });
  },
  updatePatient: function(id, updatedPatient) {
    return $.ajax({
      url: "api/patients/" + id,
      type: "PUT",
      data: updatedPatient
    });
  }
};

// handleFormSubmit is called whenever we submit a new example
// Save the new example to the db and refresh the list
var handleFormSubmit = function(event) {
  event.preventDefault();

  var patient = {
    firstname: $firstName.val().trim(),
    lastname: $lastName.val().trim(),
    dob: $dob.val().trim(),
    weight: $weight.val().trim(),
    height: $height.val().trim(),
    email: $email.val().trim(),
    phone: $phone.val().trim(),
    street: $street.val().trim(),
    city: $city.val().trim(),
    state: $state.val().trim(),
    zip: $zip.val().trim()
  };

  console.log(patient);

  if (!(patient.firstname && patient.lastname)) {
    alert("You must enter a first and last name");
    return;
  }

  API.savePatient(patient).then(function() {
    // refreshPatients();
  });

  //Resets fields to blanks
  $firstName.val("");
  $lastName.val("");
  $dob.val("");
  $weight.val("");
  $height.val("");
  $street.val("");
  $city.val("");
  $state.val("");
  $zip.val("");
};
// handleDeleteBtnClick is called when an example's delete button is clicked
// Remove the example from the db and refresh the list
var handleDeleteBtnClick = function() {
  console.log("you clicked");
  console.log("-----------");

  var idToDelete = $("#patient-id").val();

  console.log("idToDelete: " + idToDelete);

  API.deletePatient(idToDelete).then(function() {
    alert("Successfully Deleted");
    $("#info-modal").modal("hide");
  });
};

var handleUpdateBtnClick = function() {
  event.preventDefault();
  console.log("you clicked");
  console.log("-----------");

  var idToUpdate = $("#patient-id").val();

  console.log("idToUpdate: " + idToUpdate);

  var $firstName = $("#first-name-e");
  var $lastName = $("#last-name-e");
  var $dob = $("#pt-dob-e");
  var $weight = $("#pt-weight-e");
  var $height = $("#pt-height-e");
  var $phone = $("#pt-phone-e");
  var $email = $("#pt-email-e");
  var $street = $("#pt-street-e");
  var $city = $("#pt-city-e");
  var $state = $("#pt-state-e");
  var $zip = $("#pt-zip-e");

  var updatedPatient = {
    firstname: $firstName.val().trim(),
    lastname: $lastName.val().trim(),
    dob: $dob.val().trim(),
    weight: $weight.val().trim(),
    height: $height.val().trim(),
    email: $email.val().trim(),
    phone: $phone.val().trim(),
    street: $street.val().trim(),
    city: $city.val().trim(),
    state: $state.val().trim(),
    zip: $zip.val().trim()
  };

  API.updatePatient(idToUpdate, updatedPatient).then(function() {
    $("#info-modal").modal("hide");
    alert("Successfully updated");
  });
};

// Add event listeners to the submit and delete buttons
$submitBtn.on("click", handleFormSubmit);

$("#delete-btn").on("click", handleDeleteBtnClick);

$("#update-btn").on("click", handleUpdateBtnClick);
