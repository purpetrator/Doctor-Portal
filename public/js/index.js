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
  },
  getVisit: function(pid) {
    return $.ajax({
      url: "api/visits/" + pid,
      type: "GET"
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
    $("#patient-modal").modal("hide");
    alert("Successfully updated");
  });
};

var handleVisitBtnClick = function() {
  event.preventDefault();
  console.log("you clicked");
  console.log("-----------");

  var patientID = $("#patient-id").val();

  console.log("patientID: " + patientID);

  API.getVisit(patientID).then(function(dbVisit) {
    $("#patient-modal").modal("hide");
    $("#visit-body").empty();
    // console.log(dbVisit);
    for (var i = 0; i < dbVisit.length; i++) {
      // console.log(dbVisit[i]);

      var date = dbVisit[i].date;
      var rx = dbVisit[i].rx;
      var symptoms = dbVisit[i].symptoms;
      var type = dbVisit[i].type;

      var card = $("<div>");
      card.addClass("card border-info mb-3 form-rounded m-3 width");

      var cardHeader = $("<div>");
      cardHeader.addClass("card-header form-rounded");
      cardHeader.text(date);
      cardHeader.append(" <i class='fas fa-calendar'></i>");

      var cardBody = $("<div>");
      cardBody.addClass("card-body");
      cardBody.attr("id", "visit-card");

      var title = $("<h5>");
      title.text("Visit Type: " + type);
      title.addClass("visit-type");

      var paragraph1 = $("<p>");
      paragraph1.text("Symptoms: " + symptoms);
      paragraph1.addClass("card-text");

      var paragraph2 = $("<p>");
      paragraph2.text("Medications Prescribed: " + rx);
      paragraph2.addClass("card-text");

      cardBody.append(title);
      cardBody.append(paragraph1);
      cardBody.append(paragraph2);
      card.append(cardHeader);
      card.append(cardBody);

      $("#visit-body").append(card);
    }
  });

  // for loop over dbVisit and dynamically create card to display each item in array

  //   $("#patient-info").empty();
  //   $("#patient-info").append(
  //     "<span>" +
  //       "<strong>" +
  //       "Name: " +
  //       "</strong>" +
  //       feedback.selection.value.lastname +
  //       " " +
  //       feedback.selection.value.firstname +
  //       "</span>" +
  //       "<br>" +
  //       "<span>" +
  //       "<strong>" +
  //       "Date of Birth: " +
  //       "</strong>" +
  //       feedback.selection.value.dob +
  //       "</span>" +
  //       "<br>" +
  //       "<span>" +
  //       "<strong>" +
  //       "Address: " +
  //       "</strong>" +
  //       feedback.selection.value.street +
  //       ", " +
  //       feedback.selection.value.city +
  //       ", " +
  //       feedback.selection.value.state +
  //       ", " +
  //       feedback.selection.value.zip +
  //       "</span>" +
  //       "<br>" +
  //       "<span>" +
  //       "<strong>" +
  //       "Phone: " +
  //       "</strong>" +
  //       feedback.selection.value.phone +
  //       "</span>" +
  //       "<br>" +
  //       "<br>" +
  //       "<span>" +
  //       "<strong>" +
  //       "Height: " +
  //       "</strong>" +
  //       feedback.selection.value.height +
  //       " in." +
  //       "</span>" +
  //       " " +
  //       "<span>" +
  //       "<strong>" +
  //       "Weight: " +
  //       "</strong>" +
  //       feedback.selection.value.weight +
  //       " lbn." +
  //       "</span>" +
  //       "<br>"
  //   );
  //   $("#patient-info").append(
  //     "<input type='hidden' id='patient-id' value='" +
  //       feedback.selection.value.id +
  //       "'>"
  //   );
};

var closeVisit = function() {
  $("#patient-modal").modal("show");
};

// Add event listeners to the submit and delete buttons
$submitBtn.on("click", handleFormSubmit);

$(document).on("click", "#delete-btn", handleDeleteBtnClick);

$(document).on("click", "#update-btn", handleUpdateBtnClick);

$(document).on("click", "#visit-btn", handleVisitBtnClick);

$(document).on("click", "#visit-close", closeVisit);
