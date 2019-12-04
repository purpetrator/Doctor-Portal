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
// var $exampleList = $("#example-list");

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
  }
};

// refreshExamples gets new examples from the db and repopulates the list
// var refreshPatients = function() {
//   API.getPatients().then(function(data) {
//     var $examples = data.map(function(example) {
//       var $a = $("<a>")
//         .text(example.text)
//         .attr("href", "/example/" + example.id);

//       var $li = $("<li>")
//         .attr({
//           class: "list-group-item",
//           "data-id": example.id
//         })
//         .append($a);

//       var $button = $("<button>")
//         .addClass("btn btn-danger float-right delete")
//         .text("ｘ");

//       $li.append($button);

//       return $li;
//     });

//   $exampleList.empty();
//   $exampleList.append($examples);
// });
// };

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

// Add event listeners to the submit and delete buttons
$submitBtn.on("click", handleFormSubmit);

$("#delete-btn").on("click", handleDeleteBtnClick);
